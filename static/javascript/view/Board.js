Ext.define('QELT.view.Board', {
	extend: 'Ext.Panel',
	fullscreen: true,
	renderTo: Ext.getBody(),

	
	id: "container",
	title: "QELT",

	header: {
		items: [
			{ itemId: 'usernameLabel', xtype: 'label', tpl: '{username}', style: 'color:white; margin:1em;', },
			{ xtype: 'button', text: 'Logout', itemId: 'logoutButton' }
		]
	}
});