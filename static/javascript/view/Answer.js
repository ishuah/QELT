Ext.define('QELT.view.Answer', {
	extend:'Ext.Panel',
	bodyStyle: 'padding: 5em;',
	bufferedRender: false,
	fullScreen: true,
	layout:'fit',

	question:null,

	defaults: {
		padding: 10
	},
	tbar:[{
		text:'< Back',
		tooltip:'Back to dashboard',
		itemId:'backButton'
	}]
});