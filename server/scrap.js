import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../lib/calendar';
import moment from 'moment';
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';

Meteor.methods({
	'Data.getAllData'() {
        InstanceBrowser((result) => {
            Meteor.call('Data.ScrapingFalse');
            return result;
        });
    },
    'Data.ScrapingTrue'(){
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.Scraping': true,
            }
        });
    },
    'Data.ScrapingFalse'(){
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.Scraping': false,
            }
        });
    }
});

let page;
let browser;
let calendar;
let url;
const width = 1200;
const height = 850;
const ecampus = 'http://calendrier.montpellier.epsi.fr/';

async function InstanceBrowser(callback) {
	try {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			args: [`--window-size=${width},${height}`, '--no-sandbox']
		});
		page = await browser.newPage();
		await page.setViewport({ width, height });
        await page.goto(ecampus);
        console.log('Start Scraping Calendar Ecampus');
	} catch (e) {
		console.log('Error Creation Chromium', e);
    }
    console.log('Your credential ' + Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile.login, Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile.password);
    await page.type('[name="login"]', Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile.login);
    await page.type('[name="pass"]', Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile.password);
    await page.waitFor(200);
    await page.click('#submitIndex');
    await page.waitFor(200);
    await page.waitForSelector('#envoyerPortail');
    await page.click('#envoyerPortail');
    await page.waitFor('#contentCalendar div', { visible: true, timeout: 60000 });

    let cron = await page.$eval('body div div:nth-of-type(0n+3)', el => el.innerHTML);
    if(cron === 'Le cron est actuellement desactive'){
        console.log('We starting your Ecampus Cron, wait a moment please!');
        await page.click('[name="tacheScheduled"]');
        await page.waitFor(10000);
    }
    url = await page.$eval('h3 b', el => el.innerHTML); 
    console.log('The URL of your Calendar is :'+url);
    await HTTP.call('GET', url, Meteor.bindEnvironment((error, result) => {
        if (!error) {
            calendar = result.content;
            let CurrentCalendar = Calendar.find({ owner: Meteor.userId() }).count();
            if(CurrentCalendar === 0 && calendar != CurrentCalendar){
                Meteor.call('Calendar.RemoveAll');
                Meteor.call('Courses.RemoveAll');
                Calendar.insert({
                    owner: Meteor.userId(),
                    calendar
                })
                console.log('We parse your data please wait a moment');
                let courses = parseCalendar(Calendar.find({ owner: Meteor.userId() }).fetch()[0].calendar);
                callback(courses);
             } else {
                 console.log('Your calendar is already up to date ! Gave up Scraping');
                 callback(null);
             }
        }
    }));
    console.log('Finish !');
    try {
        await page.waitFor(200);
        await browser.close();

    } catch (e) {
        console.log('Error when Closing Chromium', e);
    }
};
