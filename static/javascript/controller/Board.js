Ext.define('QELT.controller.Board', {
	extend: 'Ext.app.Controller',
	views: ['Board', 'Question', 'Answer'],

	refs: [
		{ 'ref': 'board', selector: '#board' },
		{ 'ref': 'usernameLabel', selector: '#usernameLabel'},
		{ 'ref': 'contentPanel', selector: '#contentPanel'}
	],

	userdata: null,
	store: null,
	questionView: null,
	answerTpl: new Ext.XTemplate(
			'<p style="font-size:24px;">{text}</p>',
			'<tpl if="x == \'[]\'">',
				'<p style="font-size:16px;">Answer: x has no real value.</p>',
			'<tpl else>',
				'<p style="font-size:16px;">Answer: The value of x is {x}</p>',
			'</tpl>',
			'<p style="font-size:16px;">You answered {student_answer}, which is <tpl if="isCorrect"> correct. <tpl else> wrong </tpl></p>'
			),

	init: function(){
		var controller = this;
		this.view = this.getView('Board').create().hide();
		this.questionView = this.getView('Question').create().hide();
		this.getContentPanel().add(this.questionView);
		this.answerView = this.getView('Answer').create().hide();
		this.getContentPanel().add(this.answerView);

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
			'#backButton': {
				click: function(){
					controller.store.reload();
					controller.getContentPanel().setActiveItem(2);
				}
			},
			'#submitAnswer':{
				click: function(){
					var form = this.questionView.getForm();
					form.submit({
						success: function(form, action) {
							controller.answerView.items.get('answerBox').update(controller.answerTpl.apply(action.result));
							//controller.answerTpl.overwrite(controller.answerView.items.get('answerBox'), action.result);
							controller.drawChart(action.result);
							controller.getContentPanel().setActiveItem(1);
						},
						failure: function(form, action) {
							Ext.Msg.alert('Failed', 'Something seems to have gone wrong.\nPlease retry submitting answer.');
						}
					});
				}
			}
		});
	},

	updateUserData: function(userdata){
		this.userdata = userdata;
		this.store = this.createStore(userdata.id);
		this.createDataView();
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
			autoSync: true,
			pageSize:50
		});
	},

	createDataView: function(){
		var controller = this;
		var dataView = Ext.create('Ext.grid.Panel', {
			bufferedRenderer: false,
			autoScroll : true,
			store: this.store,
			id: "dataView",

			tbar:[{
				text:'New question',
				tooltip:'Try solving a new question',
				handler: function(){
					Ext.Ajax.request({
						url: '/api/v1/question/',
						method: 'POST',
						jsonData: {
							"student":"/api/v1/user/"+controller.userdata.id+"/"
						},

						success: function(response){
							var question = JSON.parse(response.responseText);
							controller.questionView.items.get("questionField").update(question.text);
							controller.questionView.form.url = question.resource_uri;
							controller.questionView.form.setValues({ student_answer: ''});
							controller.getContentPanel().setActiveItem(0);
						},
						failure: function(response){
							Ext.Msg.show({title: "Error", message: response.responseText });
						}
					});
					
				}
			}],

			columns: [
				{text: "Question", flex: 2, dataIndex: 'text', sortable: false},
				{text: "Your answer", flex: 1, dataIndex: 'student_answer', sortable: false},
				{text: "Correct answer", flex: 1, dataIndex: 'x', sortable: false},
				{text: "Correct?", flex: 1, dataIndex: 'isCorrect', sortable: false}
			],
			forceFit: true,
			split: true,
			region: 'north',
			viewConfig: {
				preserveScrollOnRefresh: true,
				deferEmptyText: true,
				emptyText: 'You have not answered any questions yet.'
				}
		});
		this.getContentPanel().add(dataView);
		controller.getContentPanel().setActiveItem(2);
	},
	drawChart: function(question){
		new Highcharts.Chart({
					chart: {
						renderTo:'mychart',
						events: {
							load: function(){
								this.myTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
							}
						}
					},
					title: {
						text: 'Quadratic Equation Chart'
					},
					xAxis: {
						title: {
							text: 'x'
						},
						plotLines:[{
							color: 'black',
							dashStyle: 'solid',
							value: 0,
							width: 2
						}]
					},
					yAxis:{
						title:{
							text: 'y'
						},
						gridLineWidth:0,
						tickColor:'black',
						tickLength:5,
						tickWidth:1,
						tickPosition: 'outside',
						plotLines:[{
							color:'black',
							dashStyle:'solid',
							value:0,
							width:2
						}]
					},
					plotOptions:{
						line:{
							marker:{
								enabled:false
							}
						}
					},
					series:[{
						stickTracking:false,
						events:{
							click: function(e){
								this.chart.myTooltip.refresh(e.point, e);
							},
							mouseOut: function(){
								this.chart.myTooltip.hide();
							}
						},
						type: 'line',
						color: 'blue',
						data: (function(){
							var data = [];
							var coefficients = JSON.parse(question.coefficients);
							var roots = JSON.parse(question.x);
							var min = -10;
							var max = 10;
							
							if (roots.length == 2){
								min = Math.min.apply(Math, roots) - 10;
								max = Math.max.apply(Math, roots) + 10;
							} else {
								min = roots[0] - 10;
								max = roots[0] + 10;
							}

							for(var i = min; i<=max; i++){
								point = {x:i, y:((coefficients[0]*i*i)+(coefficients[1]*i) + coefficients[2])};
								//exclude roots, add later
								if (point.y != 0)
									data.push(point);
							}

							//add roots
							if (roots.length == 2){
								point = {x:Math.min.apply(Math, roots), y:0, marker: {enabled: true}};
								data.splice(10, 0, point);
								point = {x:Math.max.apply(Math, roots), y:0, marker: {enabled: true}};
								data.splice(-10, 0, point);
							}else if(roots.length == 1){
								point = {x:roots[0], y:0, marker: {enabled: true}};
								data.splice(10, 0, point);
							}
							return data;
						})()
					}],
					tooltip:{
						enabled:false,
						formatter: function(){
							return "(x: "+this.x+" y:"+this.y+")"
						}
					}
				});
	}
});