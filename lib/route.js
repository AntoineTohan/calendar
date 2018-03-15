Router.configure({
  loadingTemplate: 'Loading',
  layoutTemplate: 'Index',
});

Router.route('/', function () {
    this.render('Index');
});

Router.plugin('ensureSignedIn', {
  except: ['Loading', 'Index', 'atSignIn', 'atSignUp', 'atForgotPwd', 'atVerifyEmail', 'atChangePwd', 'atEnrollAccount', 'atResetPwd', 'atresendVerificationEmail']
});
