Ext.define('QELT.controller.Board', {
	extend: 'Ext.app.Controller',
	views: ['Board'],

	refs: [
		{ 'ref': 'board', selector: '#board' },
		{ 'ref': 'usernameLabel', selector: '#usernameLabel'}
	],

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

	updateUserInfo: function(userinfo){
		this.getUsernameLabel().setData(userinfo);
		return this;
	}
});