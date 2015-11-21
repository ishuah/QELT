Ext.application({
	name: 'QELT',

	appFolder: '/static/javascript',

	controllers: ['Signin', 'Board', 'Question'],
	requires: ['QELT.utils.CSRFHelper'],

	launch: function() {
		var app = this;
		app.getController('Signin').isUserSignedIn(function(userdata) {
			if (userdata.isStaff)
				window.location = '/admin';
			else
				app.getController('Board')
				.updateUserData(userdata)
				.view.show();
		});
	}
});