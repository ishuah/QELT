Ext.define('QELT.utils.CSRFHelper', {
	singleton: true,

	constructor: function(){
		Ext.Ajax.on('beforerequest', function(conn, options){
			if(typeof(options.headers) == "undefined"){
				options.headers = { 
					'X-CSRFToken': Ext.util.Cookies.get('csrftoken'),
					'Content-Type' : 'application/json' 
				}
			}
			else{
				options.headers['X-CSRFToken'] = Ext.util.Cookies.get('csrftoken');
				options.headers['Content-Type'] = 'application/json';
			}
		}, this);
	}
});