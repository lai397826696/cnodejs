webpackJsonp([9],{454:function(n,t,e){function o(n){e(500)}var a=e(53)(e(478),e(513),o,"data-v-2e0b5654",null);n.exports=a.exports},478:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(120),a=e.n(o),i=e(63);t.default={name:"login",data:function(){return{token:"595447be-4e58-4ebb-9fc2-8057979109d4"}},methods:a()({},e.i(i.d)(["loginfn"]),{signfn:function(){this.token?this.tokenHttp():this.$alert("token值不能为空")},tokenHttp:function(){var n=this,t=this;this.$http.post("/accesstoken",{accesstoken:t.token}).then(function(n){n.data.success&&(n.data.token=t.token,t.loginfn(n.data),t.goback(),t.token="")}).catch(function(t){n.$alert("错误的token值")})},goback:function(){this.$router.go(-1)}})}},488:function(n,t,e){t=n.exports=e(448)(!1),t.push([n.i,".loginPage[data-v-2e0b5654] {\n  background-color: #fff;\n  font-size: .186667rem;\n}\n\n.loginPage .loginbox label[data-v-2e0b5654] {\n  font-size: .213333rem;\n}\n\n.loginPage .loginbox .text[data-v-2e0b5654] {\n  display: block;\n  width: 100%;\n  height: .48rem;\n  line-height: .48rem;\n  font-size: .186667rem;\n}\n\n.loginPage .btn-sign[data-v-2e0b5654] {\n  display: block;\n  margin-top: .266667rem;\n  width: 100%;\n  height: .533333rem;\n  line-height: .533333rem;\n  font-size: .213333rem;\n  color: #fff;\n  background-color: #2196f3;\n  -webkit-appearance: none;\n  border-radius: 0.026667rem;\n}",""])},500:function(n,t,e){var o=e(488);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e(449)("611ebb16",o,!0,{})},513:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"pd10 pds10 loginPage"},[e("div",{staticClass:"loginbox"},[e("label",[n._v("请输入你的Token")]),n._v(" "),e("div",{staticClass:"pd10 mgs10 line-b textbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.token,expression:"token"}],staticClass:"text",attrs:{type:"text",name:"text",placeholder:"Token"},domProps:{value:n.token},on:{input:function(t){t.target.composing||(n.token=t.target.value)}}})])]),n._v(" "),e("p",{staticClass:"mgt10"},[n._v("请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录")]),n._v(" "),e("button",{staticClass:"btn-sign",attrs:{type:"button"},on:{click:n.signfn}},[n._v("登录")])])},staticRenderFns:[]}}});