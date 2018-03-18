if (Meteor.isServer) {
    Meteor.publish('CurrentUser', function () {
        return Meteor.users.find({ _id: Meteor.userId() });
    });
}

Meteor.methods({
    'user.setCredential' (login, password) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.login': login,
                'profile.password': password,
            }
        });
    },
    'user.CrendentialRemove' () {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.login': null,
                'profile.password': null,
            }
        });
    },

});