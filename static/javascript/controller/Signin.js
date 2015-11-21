Ext.define('QELT.controller.Signin', {
	extend: 'Ext.app.Controller',
	mixins: ['Ext.mixin.Observable'],
	views: ['Signin'],

	refs: [
		{ 'ref': 'usernameField', selector: '#username' },
		{ 'ref': 'passwordField', selector: '#password' },
		{ 'ref': 'submitButton', selector: '#submit' }
	],

	user: null,

	init: function() {
		var controller = this;
		var windowX = controller.loginWindow = controller.getView('Signin').create();
		
		this.control({
			'#submit': {
				click: function(){
					var username = this.getUsernameField().getValue();
					var password = this.getPasswordField().getValue();

					windowX.mask('Signing in...');

					controller.signin(username, password, function(response){
						if (response.hasOwnProperty("success") && response.success == true){
							
							windowX.hide();
							controller.user = response;
							controller.fireEvent('login', controller.user);
							controller.fireEvent('ready', controller.user);
						}else{
							windowX.unmask();
							controller.clearPassword().setPasswordError(response.reason);
						}
					});

				}
			}
		});

		this.nav = new Ext.KeyNav(windowX.getEl(), {
			enter: function(){
				controller.getSubmitButton().fireEvent('click');
			}
		});
	},

	isUserSignedIn: function(callback) {
		var controller = this;

		Ext.Ajax.request({
			url: '/api/v1/signedin/',
			success: function(response){
				controller.user = JSON.parse(response.responseText);
				controller.fireEvent('ready', controller.user);
				return callback(controller.user);
			},
			failure: function(){
				controller.on('login', callback, {single: true});
				controller.loginWindow.show();
				controller.clearForm();
			}
		});
	},

	signin: function(username, password, callback){
		Ext.Ajax.request({
			url:'/api/v1/user/signin/',
			method: 'POST',
			headers: { 
				'Content-Type' : 'application/json' 
			},
			jsonData: {
				'username': username,
				'password': password
			},
			success: function(response){
				callback(JSON.parse(response.responseText));
			},
			failure: function(response){
				callback(JSON.parse(response.responseText));
			}
		})
	},

	signout: function(callback){
		Ext.Ajax.request({
			url:'/api/v1/user/signout/',
			method: 'POST',
			success: function(){
				callback(true);
			},
			failure: function(){
				callback(false);
			}
		})
	},

	clearForm: function() {
		this.loginWindow.unmask();
		this.getPasswordField().setValue('').unsetActiveError();
		this.getUsernameField().setValue('').unsetActiveError();
		this.getUsernameField().focus();
		return this;
	},

	clearPassword: function(){
		this.getPasswordField().setValue('').focus();
		return this;
	},
	setPasswordError: function(msg) {
		this.getPasswordField().setActiveErrors([msg]);
		return this;
	}
});