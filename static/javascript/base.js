Ext.application({
	name: 'QELT',

	appFolder : '/static/javascript',

	controllers: ['Signin', 'Board', 'Question'],
	
	launch: function () {
		var app = this;
		app.getController('Signin').isUserSignedIn(function(username){
			var store = Ext.getStore('Question');
			console.log(store);
			app.getController('Board')
				.updateUserInfo(username)
				.view.show();
		});
	}
});