Ext.define('QELT.view.Board', {
	extend: 'Ext.grid.Panel',
	fullscreen: true,
	renderTo: Ext.getBody(),

	store: Ext.data.StoreManager.lookup('Question'),
	autoLoad: true,

	id: "container",
	title: "QELT",

	header: {
		items: [
			{ itemId: 'usernameLabel', xtype: 'label', tpl: '{username}', style: 'color:white; margin:1em;', },
			{ xtype: 'button', text: 'Logout', itemId: 'logoutButton' }
		]
	},

	columns: [
		{
			text: 'Question',
			dataIndex: 'text'
		}
	]

});