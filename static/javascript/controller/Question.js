Ext.define('QELT.controller.Question',{
	extend: 'Ext.app.Controller',
	models:['Question'],

	init: function(){
		var controller = this;
		var signinController = QELT.getApplication().getController('Signin');
		signinController.on('ready', function(){
			var store = Ext.create('Ext.data.Store', {
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
			console.log(store);
		});
	}

});