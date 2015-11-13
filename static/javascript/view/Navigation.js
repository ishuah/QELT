Ext.define('QELT.view.Navigation', {
	layout: 'border',
	extend: 'Ext.container.Container',
	renderTo: Ext.getBody(),
	id: "navContainer",

	width: '100%',
	height: '100%',

	items: [{
		region: 'west',
		xtype: 'treepanel',
		itemId: 'navTree',

		width: 200,
		split: true,

		rootVisible: false,

		title: 'Navigation',
		tbar: [
			{ tpl: '{username}', xtype: 'label', itemId: 'loginMessage'},
			'->',
			{ text: 'Logout', itemId: 'logoutButton'}
		]
	},{
		region: 'center',
		xtype: 'container',
		itemId: 'contentPanel',
		layout: {
			type: 'card',
			defferedRender: true
		},
		items: [
			{ title: 'QELT', html: 'Start'}
		]
	}]
});