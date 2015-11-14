Ext.define('QELT.store.Question', {
	model: 'QELT.model.Question',
	proxy: {
		type: 'ajax',
		url: '/api/v1/question/',
		reader: {
			type: 'json',
			rootProperty: 'objects'
		}
	},
	autoLoad: true
});