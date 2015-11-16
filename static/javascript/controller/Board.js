Ext.define('QELT.controller.Board', {
	extend: 'Ext.app.Controller',
	views: ['Board'],

	refs: [
		{ 'ref': 'board', selector: '#board' },
		{ 'ref': 'usernameLabel', selector: '#usernameLabel'}
	],

	userdata: null,
	store: null,
	dataView: null,

	init: function(){
		var controller = this;

		this.view = this.getView('Board').create().hide();

		this.control({
			'#logoutButton': {
				click: function(){
					this.view.mask('Signing out...');
					QELT.getApplication().getController('Signin').signout(function(success){
						if (!success)
							return Ext.Msg.alert('Sign out failed', 'Refresh the page');
						controller.view.unmask();
						controller.view.hide();

						QELT.getApplication().launch();
					});
				}
			}
		});
	},

	updateUserData: function(userdata){
		this.userdata = userdata;
		this.store = this.createStore(userdata.id);
		this.dataView = this.createDataView();
		this.view.add(this.dataView);
		console.log(this.dataView);
		
		this.getUsernameLabel().setData(userdata.username);
		return this;
	},

	createStore: function(userId){
		return Ext.create('Ext.data.Store', {
			model: 'QELT.model.Question',
			proxy: {
				type: 'ajax',
				url: '/api/v1/question/?student='+userId,
				reader: {
					type: 'json',
					rootProperty: 'objects'
				}
			},
			autoLoad: true,
			remoteSort: true,
			remoteFilter: true,
			autoSync: true
		});
	},

	createDataView: function(){
		return Ext.create('Ext.grid.Panel', {
			bufferedRenderer: false,
			store: this.store,
			columns: [
				{text: "Question", flex: 2, dataIndex: 'text', sortable: false},
				{text: "Your answer", flex: 1, dataIndex: 'student_answer', sortable: false},
				{text: "Correct answer", flex: 1, dataIndex: 'x', sortable: false},
				{text: "Correct?", flex: 1, dataIndex: 'isCorrect', sortable: false}
			],
			forceFit: true,
			split: true,
			region: 'north'
		});
	}
});