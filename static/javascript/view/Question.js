Ext.define("QELT.view.Question", {
	extend:"Ext.form.Panel",
	method: "PATCH",
	id: "questionView",
	fullscreen: true,
	bodyStyle: 'padding: 5em;',
	jsonSubmit: true,
	tbar:[{
		text:'< Back',
		tooltip:'Back to dashboard',
		itemId:'backButton'
	}],
	
	width: 585,
	defaults: {
		xtype: 'textfield',
		labelAlign: 'left',
		padding: 10
	},
	layout: 'vbox',
	items: [
		{
			xtype: 'displayfield',
			itemId: 'questionField',
			style:{
				'font-size':'32px;'
			}
		},
		{
			xtype: 'displayfield',
			value: "If x has more than one value, comma separate the values. example: 4,9 .\n If x has no real value, leave the form blank.",
		},
		{
			fieldLabel: 'The value of x is:',
			name: 'student_answer',
			regex: /^\[?\-?\d*\.?\d*\,?\-?\d*\.?\d*\]?$/
		}
	],
	buttons: [{
		text: 'Submit answer',
		formBind: true,
		itemId:'submitAnswer'
	}],
	listeners: {
		beforeaction: function(form, action, options) {
			values = form.getValues();
			values.student_answer = "["+values.student_answer+"]";
			form.setValues(values);
		}
	}
});