import './password.js';
import moment from 'moment';
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';

let page;
let browser;
const width = 1200;
const height = 850;
const ecampus = 'http://ecampusmontpellier.epsi.fr/';
let result;
let date = moment().format('MM/DD/YY');

function checkErrorServer() {
    if (page.$('.documentFirstHeading') == null){
        console.log('Error found');  
    } 
    else{
        console.log('Error not found');  
    }
}
async function InstanceBrowser() {
	try {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 5,
			args: [`--window-size=${width},${height}`, '--no-sandbox']
		});
		page = await browser.newPage();
		await page.setViewport({ width, height });
        await page.goto(ecampus);
	} catch (e) {
		console.log('Error Creation Chromium', e);
    }

    await checkErrorServer();

    await page.type('#__ac_name', login);
    await page.type('#__ac_password', pass);
    await page.click('.context');
    
    await page.waitForSelector('#I_Oi_DivBodyCal');
    await page.waitFor(500);    
    await page.goto(ecampus+'emploi_du_temps?date='+date+'');
    
    await checkErrorServer();

    console.log(await page.$$('.Case .TCase', cours => cours.textContent));

    try {
        await page.waitFor(200000);
        await browser.close();
    } catch (e) {
        console.log('Error when Closing Chromium', e);
    }  
};
InstanceBrowser();