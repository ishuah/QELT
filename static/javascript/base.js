Ext.application({
	name: 'QELT',

	appFolder : '/static/javascript',

	controllers: ['Signin', 'Navigation', 'Question'],

	launch: function () {
		var app = this;
		app.getController('Signin').isUserSignedIn(function(username){
			app.getController('Navigation')
				.updateUserInfo(username)
				.view.show();
		});
	}
});