<style lang="sass">
	.select{
		position: relative;
		display: inline-block;
		input[type="text"]{
			border-radius: 6px;
		    border: 1px solid #ccc;
		    background: #fff;
		    line-height: 40px;
		    height:40px;
		    font-size: 16px;
		    text-indent: 12px;
		}
		
	    &:after{
	    	content: " ";
	    	position:absolute;
	    	right:10px;
	    	top:16px;
	    	border:10px solid #ccc;
	    	border-left:10px solid transparent;
	    	border-right:10px solid transparent;
	    	border-bottom:10px solid transparent;
	    }
	    .showList-transition{
	    	transition: opacity .3s;
	    	opacity:1;
	    }
	    .showList-leave,.showList-enter{
	    	opacity:0;
	    }
	    ul{
	    	box-sizing: border-box;
	    	position: absolute;
	    	width:100%;
	    	max-height: 150px;
	    	background:#fff;
	    	overflow: auto;
	    	border:1px solid #ccc;
	    	border-radius: 6px;
	    	z-index:999;
	    	li{
	    		line-height: 30px;
				padding:0 10px;
				&:hover{
					background:#f0f0f0;
				}
	    	}
	    	.active{
	    		background:#ccc;
	    	}
	    }
	}
</style>

<template>
	<div class="select">
		<input type="text" placeholder="请选择..." v-on:focus="showList" v-on:blur="hideList" v-el:input v-on:input="search" v-on:keydown.prevent.down="nextSelect" v-on:keydown.prevent.up="preSelect" v-on:keydown.prevent.enter="chooseSelect" >
		<input type="hidden" v-el:hidden>
		<ul v-show="show" v-el:list transition="showList" >
			<li v-for="(index,val) in listData" v-bind:class="[index == classIndex ? 'active' : '']" v-el:list data-value="{{val.value}}" v-on:mousedown="chooseList" data-index="{{index}}" >{{val.title}}</li>
		</ul>
	</div>
	
</template>

<script>
	module.exports = {
		props: {
			mockData: {
				type: Array
			}
		},
		data: function(){
			return {
				show: false,  // 显示/隐藏 list 
				listData: this.mockData, // 数据源
				scrollTop: 0,	// 用于记录list的scrollTop位置
				isInput: false, // 判断是否触发input事件，用于去除选中样式
				isChoose: false, // 判断是否已选中，用于清空 input 控件
				classIndex: -1, // 标记选中index
				listLen: 0, // 记录list 条数
				liHeight: 30, // li 高度
				rows: 5 // list显示li条数,用于模拟滚动条拖动
			}
		},
		methods:{
			showList:function(){ // 显示list列表
				this.show = true;
				setTimeout(function(){
					this.$els.list.scrollTop = this.scrollTop;
				}.bind(this),0)	
				this.listLen = this.listData.length;
			},
			hideList: function(){ // 隐藏list 列表
				this.show = false;
				this.isInput = false;
				if(!this.isChoose){
					this.$els.input.value = "";
				}
			},
			chooseList: function(e){ // 鼠标选中事件
				var text = e.target.innerHTML;
				var value = e.target.getAttribute("data-value");
				this.$els.input.value = text;
				this.$els.hidden.value = value;	
				this.scrollTop = this.$els.list.scrollTop;
				this.isChoose = true;
				this.classIndex = e.target.getAttribute("data-index");
				console.log(this.classIndex)
			},
			search: function(e){ // 触发input事件 将匹配的list内容放到顶部
				var text = e.target.value;
				this.scrollTop = 0;
				this.$els.list.scrollTop = 0;
				this.mockData.sort(function(pre,next){
					if(!!~pre.title.indexOf(text)){
						return -1
					}
					if(!!~next.title.indexOf(text)){
						return 1
					}
				})
				if(!this.isInput){
					this.classIndex = -1;
				}
				this.isInput = true;
				this.isChoose = false;
			},
			nextSelect: function(e){ // 键盘向下按钮触发事件
				if(this.classIndex < this.listLen - 1){
					this.classIndex = parseInt(this.classIndex) + 1; 
				}else{
					this.classIndex = 0; 
				}
				this.$els.list.scrollTop = (this.classIndex - this.rows + 1)* this.liHeight;
				this.choosed(e)
			},
			preSelect: function(e){ // 键盘向上按钮触发事件
				if(this.classIndex > 0){
					this.classIndex -= 1;
				}else{
					this.classIndex = this.listLen - 1;
				}
				this.$els.list.scrollTop = (this.classIndex - this.rows + 1) * this.liHeight;
				this.choosed(e)
			},
			chooseSelect: function(e){ // 键盘enter 选中
				e.target.blur()
			},
			choosed: function(e){
				e.target.value = this.listData[this.classIndex].title;
				this.$els.hidden.value = this.listData[this.classIndex].value;
				this.isChoose = true;
				this.scrollTop = this.$els.list.scrollTop;
			}
		}
	}
</script>