<style lang="sass">
	body{
	 -webkit-overflow-scrolling: touch; // 解决局部滚动滞涩
	}

	.my-select{
		color:#333;
		span{
			color:#ccc;
		}
		.hide{
			display: block;
		}
	}
	.expand-transition{
		transition: opacity .3s;
	}
	.expand-enter,
	.expand-leave{
		opacity:0;
	}

	

	.area-cover{
		position:fixed;
		left: 0;
		top: 0;
		width:100%;
		height:100%;
		background: rgba(0,0,0,.6);
		z-index: 999;
		.show-pop-transition{
			transition: all .5s;
			transform: translateY(0);
		}
		.show-pop-enter,.show-pop-leave{
			transform: translateY(100%);
		}
		

		.pop{
			position: absolute;
			left:0;
			bottom:0;
			width:100%;
			height:50%;
			background: #fff;
			.title{
				height:40px;
				background: #eee;
				text-align: center;
				line-height:40px;
				font-size:20px;
				a{
					position: absolute;
					right:10px;
					text-decoration: none;
					font-size: 16px;
				} 
			}
			ul{
				height: calc(100% - 40px);
				overflow: auto;
				li{
					line-height: 40px;
					text-align: center;
					list-style-type: none;
					border-top:1px solid #eee;
				}
			}
		}
	}
</style>

<template>
	<div class="my-select" v-on:click="showPop" v-on:touchStart="showPop" >
		位置：
		<span>{{province}}</span>
		&gt;
		<span>{{city}}</span>
		&gt;
		<span>{{district}}</span>
	</div>
	<div class="area-cover" v-if="show" transition="expand" v-on:click="closePop" >
		<div class="pop" v-if="show" transition="show-pop" v-on:click.stop  >
			<div class="title">
				选择地区
				<a href="javascript:;" v-on:click="closePop" v-on:touchStart="closePop" >关闭</a>
			</div>
			<ul v-el:scroll>
				<li v-for="(index, item) in area" v-on:click="mySelect"  data-index="{{index}}" >{{item}}</li>
			</ul>
		</div>
	</div>
</template>


<script>
	var area = require('./area.js')
	module.exports = {
		data: function(){
			return {
				area : area.province,
				province: "请选择省份",
				pStatus:"", // 标志省份是否选择
				city: "请选择城市",
				cStatus:"", // 标志城市是否选择
				district: "请选择区县",
				dStatus:"", // 标志区县是否选择
				current: 0,
				show: false
			}
		},
		methods:{
			showPop: function(){
				this.pStatus = "";
				this.cStatus = "";
				this.dStatus = "";
				this.area = area.province;
				this.show = true;
			},
			closePop: function(){
				this.show = false;
			},
			mySelect: function(e){
				var a = e.target.innerHTML,
					index = e.target.getAttribute('data-index');
				if(!this.pStatus){
					this.province = a;
					this.city = "请选择城市";
					this.district = "请选择区县";
					this.pStatus = true;
					this.area = area.city[index]; // 选中后修改list数据源
					this.current = index;
					this.$els.scroll.scrollTop = 0; // 选择后弹窗滚动条自动回到顶部
					return false;
				}
				if(!this.cStatus){
					this.city = a;
					this.cStatus = true;
					this.area = area.district[this.current][index]; // 选中后修改list数据源
					this.$els.scroll.scrollTop = 0; // 选择后弹窗滚动条自动回到顶部
					return false;
				}
				if(!this.dStatus){
					this.district = a;
					this.dStatus = true;
					this.show = false;
					return false;
				}
				
			}
		}
		

	}
</script>