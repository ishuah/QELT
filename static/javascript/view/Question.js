Ext.define("QELT.view.Question", {
	extend: "Ext.form.Panel",
	method: "PATCH",
	id: "questionView",
	bodyStyle: 'padding: 2em;',
	fullscreen: true,
	autoScroll: true,
	jsonSubmit: true,
	tbar: [{
		text: '< Back',
		tooltip: 'Back to dashboard',
		itemId: 'backButton'
	}],

	width: '100%',
	height: '100%',
	defaults: {
		xtype: 'textfield',
		labelAlign: 'left',
	},
	layout: {
		align: 'stretch',
		type: 'vbox',
	},
	items: [{
		xtype: 'displayfield',
		itemId: 'questionField',
		style: {
			'font-size': '20px;'
		}
	}, {
		xtype: 'displayfield',
		value: "If x has more than one value, comma separate the values. example: 4,9. If x has no real value, leave the form blank.",
	},
	 {
		fieldLabel: 'The value of x is:',
		name: 'student_answer',
		regex: /^\[?\-?\d*\.?\d*\,?\-?\d*\.?\d*\]?$/
	}],
	buttons: [{
		text: 'Submit answer',
		formBind: true,
		itemId: 'submitAnswer'
	}],
	listeners: {
		beforeaction: function(form, action, options) {
			values = form.getValues();
			values.student_answer = "[" + values.student_answer + "]";
			form.setValues(values);
		}
	}
});