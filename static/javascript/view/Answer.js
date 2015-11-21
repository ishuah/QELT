Ext.define('QELT.view.Answer', {
	extend: 'Ext.panel.Panel',
	bufferedRender: false,
	fullScreen: true,
	autoScroll: true,
	width: '100%',
	height: '100%',
	layout: {
		align: 'stretch',
		type: 'vbox'
	},

	question: null,

	tbar: [{
		text: '< Back',
		tooltip: 'Back to dashboard',
		itemId: 'backButton'
	}],

	items: [{
		html: '<div id="mychart" style="width: 350px; height: 350px; margin: 0;"></div>',
		border: false,
	}, {
		itemId: 'answerBox',
		margin: '0 50',
		border: false,
		minHeight: 100,

	}]
});