var Vue = require('vue')
//Vue.config.debug = true;

var mockData = [
					{
						title: 'test1',
						value: '1'
					},
					{
						title: 'test2',
						value: '2'
					},
					{
						title: 'test3',
						value: '3'
					},
					{
						title: 'test4',
						value: '4'
					},
					{
						title: 'test5',
						value: '5'
					},
					{
						title: 'test6',
						value: '6'
					},
					{
						title: 'test7',
						value: '7'
					},
					{
						title: 'test8',
						value: '8'
					},
					{
						title: 'test9',
						value: '9'
					},
					{
						title: 'test10',
						value: '10'
					},
					{
						title: 'test11',
						value: '11'
					},
					{
						title: 'test121',
						value: '121'
					},
					{
						title: 'test1211',
						value: '1211'
					},
					{
						title: 'test1221',
						value: '121'
					}
				];

var app = new Vue({
  el: '#app',
  data: {
    views: 'my-input',
    mockData: mockData
  },
  components: {
    'my-input': require('./components/input.vue'),
    'my-select': require('./components/selectArea.vue'),
    'select-search': require('./components/selectSearch.vue')
  },
  methods:{
  	showData: function(){
  		console.log(this.mockData)
  	}
  }
})