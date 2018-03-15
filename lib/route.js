Router.configure({
  loadingTemplate: 'Loading',
  layoutTemplate: 'Index',
});

Router.route('/', function () {
    this.render('Index');
});
