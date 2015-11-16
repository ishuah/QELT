Ext.define('QELT.controller.Question',{
	extend: 'Ext.app.Controller',
	models: 'Question',

	init: function(){
		var controller = this;
		var signinController = QELT.getApplication().getController('Signin');
		signinController.on('ready', function(){
			
		});
	}

});