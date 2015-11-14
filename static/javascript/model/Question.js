Ext.define('QELT.model.Question', {
	extend: 'Ext.data.Model',

	idProperty: 'id',

	fields: ['coefficients', 'isCorrect', 'student_answer', 'text']
});