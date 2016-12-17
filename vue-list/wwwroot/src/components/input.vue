<template>
	<span>名称：</span>
	<input type="text" class="input" v-on:input="check" v-model="msg" placeholder="请输入..." >
	<span class="input-msg">{{notice}}</span>
	<p>{{msg}}</p>
	<slot></slot>
	<slot name="a"></slot>
</template>

<script>
	module.exports = {
		props: {
			rules:{
				type: String // 制定传递参数类型
			}
		},
		data: function data() {
	        return {
	            notice: "",
	            msg: "",
	            test: {
	            	digital: [/^[\d\.]+$/, '请输入纯数字']
	            }
	        };
	    },
	    methods:{
	    	check: function(e){
	    		var text = e.target.value,
	    			textLength = text.length;
	    		var rules = this.rules.split(";")
	    		rules.every(function(val,index){
	    			if(!!~val.indexOf(":")){
	    				var rule = val.split(":");
	    				if(rule[0] == 'min'){
	    					if(textLength < rule[1]){
	    						this.notice = '字数不得少于'+rule[1]+'个字！';
	    						return false
	    					}
	    				}else if(rule[0] == 'max'){
	    					if(textLength > rule[1]){
	    						this.notice = '字数不得超过'+rule[1]+'个字！';
	    						return false
	    					}
	    				}
	    			}else{
	    				if(this.test[val] != undefined){
	    					if(!this.test[val][0].test(text)){
	    						this.notice = this.test[val][1]
	    						return false
	    					}
	    				}else{
	    					throw "input组件没有该规则 "+val
	    					return false
	    				}
	    			}
	    			this.notice = "√"
	    			return true
	    		}.bind(this))
	    	}
	    }
	}
</script>

<style>
	.input{
		border-radius: 6px;
		border:1px solid #eee;
		background:#fff;
		line-height: 40px;
		font-size:16px;
		text-indent: 12px;
	}
	.input-msg{
		color:red;
		font-size:14px;
		line-height: 40px;
	}
</style>