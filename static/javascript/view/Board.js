Ext.define('QELT.view.Board', {
	extend: 'Ext.Panel',
	fullscreen: true,
	layout: 'border',
	renderTo: Ext.getBody(),
	width: '100%',
	height: '100%',

	
	id: "container",
	title: "QELT",

	header: {
		items: [
			{ itemId: 'usernameLabel', xtype: 'label', tpl: '{username}', style: 'color:white; margin:1em;', },
			{ xtype: 'button', text: 'Logout', itemId: 'logoutButton' }
		]
	},
	items: [{
		region: 'center',
		xtype: 'container',
		itemId: 'contentPanel',
		layout: {
			type: 'card',
			fullscreen: true,
			defferedRender: true
		}
	}]
});