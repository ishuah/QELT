Ext.define('QELT.controller.Navigation', {
	extend: 'Ext.app.Controller',
	views: ['Navigation'],

	refs: [
		{ 'ref': 'loginMessage', selector: '#loginMessage' },
		{ 'ref': 'navTree', selector: '#navTree' },
		{ 'ref': 'contentPanel', selector: '#contentPanel' }
	],

	init: function(){
		var controller = this;

		this.view = this.getView('Navigation').create().hide();

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
			},

			'#navTree': {
				itemclick: function(tree, node){
					if (!node.data.leaf) return;
					this.getContentPanel().setActiveItem(node.data.itemId);
				}
			},
		});
	},

	updateUserInfo: function(userinfo){
		this.getLoginMessage().setData(userinfo);
		return this;
	},

	registerNavigationItem: function(group, item, view){
		view.itemid = group+'.'+item;
		this.getContentPanel().add(view);
		var root = this.getNavTree().store.getRootNode();
		var groupNode = root.findChild('itemId', group);
		if (!groupNode){
			groupNode = root.appendChild(root.createNode({
				leaf: false,
				expanded: true,
				text: group,
				itemId: group
			}));
		}

		groupNode.appendChild(root.createNode({
			leaf:true,
			text: item,
			itemId: view.itemId
		}))
	}
});