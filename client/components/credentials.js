Template.Credentials.helpers({
    hasCredential(){
        return Meteor.users.find().fetch()[0].profile;
    }
});

Template.Credentials.events({
    'submit #add-credentials'(event, instance) {
        event.preventDefault();
        if (!!event.target[0].value && !!event.target[1].value) {
            const login = event.target[0].value;
            const password = event.target[1].value;
            Meteor.call('user.setCredential', login, password);
            Modal.hide();
        }
    },
    'click .remove-api'(event, instance) {
        Meteor.call('api.remove', this._id);
    }
});