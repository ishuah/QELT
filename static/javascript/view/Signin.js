Ext.define('QELT.view.Signin', {
	extend: 'Ext.window.Window',
	renderTo: Ext.getBody(),
	id: "loginBox",

	title: 'Sign In',
	layout: 'form',
	bodyPadding: 5,

	closable: false,
	resizable: false,
	draggable: false,

	defaultFocus: 'username',

	defaultType: 'textfield',
	items: [{
		itemId: 'username',
		fieldLabel: 'Username',
		allowBlank: false
	}, {
		inputType: 'password',
		fieldLabel: 'Password',
		itemId: 'password',
		allowBlank: false
	}],

	buttons: [{
		text: 'Sign In',
		itemId: 'submit'
	}]
});