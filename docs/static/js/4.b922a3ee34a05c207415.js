webpackJsonp([4],{483:function(t,e,n){function i(t){n(530)}var a=n(54)(n(507),n(543),i,"data-v-6508396e",null);t.exports=a.exports},490:function(t,e,n){function i(t){n(497)}var a=n(54)(n(492),n(499),i,"data-v-69f6c422",null);t.exports=a.exports},492:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"header",props:{leftShow:{type:Boolean,default:!0},title:{type:String,default:"默认头部信息"},rightShow:{type:Boolean,default:!1}},data:function(){return{}},created:function(){console.log(this.$root.Bus)},methods:{goBack:function(){this.$router.go(-1)}}}},495:function(t,e,n){e=t.exports=n(474)(!1),e.push([t.i,".appHeader[data-v-69f6c422] {\n  background-color: #474a4f;\n  color: #fff;\n}\n\n.detailsTab[data-v-69f6c422] {\n  position: relative;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.detailsTab .leftBox[data-v-69f6c422] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 0;\n}\n\n.detailsTab .rightBox[data-v-69f6c422] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 0;\n  line-height: 0.666667rem;\n}\n\n.detailsTab .centerBox[data-v-69f6c422] {\n  margin: 0 auto;\n  width: 55%;\n  height: 0.666667rem;\n  line-height: 0.666667rem;\n  text-align: center;\n}\n\n.detailsTab .returnBtn[data-v-69f6c422] {\n  float: left;\n  width: 0.666667rem;\n  height: 0.666667rem;\n  line-height: 0.666667rem;\n  font-size: 0.266667rem;\n  text-align: center;\n  cursor: pointer;\n}\n\n.detailsTab .title[data-v-69f6c422] {\n  display: inline;\n  font-size: 0.24rem;\n  text-align: center;\n}",""])},497:function(t,e,n){var i=n(495);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(475)("c3984214",i,!0,{})},499:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"appHeader"},[n("nav",{staticClass:"detailsTab"},[t.leftShow?n("div",{staticClass:"leftBox"},[n("a",{staticClass:"returnBtn",attrs:{href:"javascript:;"},on:{click:t.goBack}},[n("i",{staticClass:"font-icon icon-left-big"})])]):t._e(),t._v(" "),n("div",{staticClass:"centerBox"},[n("h3",{staticClass:"title"},[t._v(t._s(t.title))])]),t._v(" "),t.rightShow?n("div",{staticClass:"rightBox"},[t._t("right")],2):t._e()])])},staticRenderFns:[]}},507:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(121),a=n.n(i),o=n(490),r=n.n(o),s=n(64);e.default={name:"dev",data:function(){return{topic_id:"",title:"",tab:"请选择",content:""}},beforeRouteEnter:function(t,e,n){n(function(e){t.query.id&&(e.topic_id=t.query.id,e.tab=t.query.tab,e.content=t.query.content,e.title=t.query.title)})},components:{Heads:r.a},computed:a()({},n.i(s.b)(["userToken"])),methods:{topicfn:function(){if(this.title.length>=10&&"请选择"!=this.tab){var t={},e="/topics";this.topic_id?(e+="/update",t={accesstoken:this.userToken,topic_id:this.topic_id,title:this.title,tab:this.tab,content:this.content}):t={accesstoken:this.userToken,title:this.title,tab:this.tab,content:this.content},this.$http({method:"post",url:e,data:t}).then(function(t){console.log(t.data.success)})}else console.log("请正确填写内容")}}}},518:function(t,e,n){e=t.exports=n(474)(!1),e.push([t.i,".devPage[data-v-6508396e] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 0;\n  background-color: #eff2f7;\n}\n\n.devPage .dev-item[data-v-6508396e] {\n  margin: 0.066667rem 0;\n  padding: 0.066667rem 0.133333rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.devPage .dev-item label[data-v-6508396e] {\n  font-size: 0.213333rem;\n}\n\n.devPage .dev-item .dev-text[data-v-6508396e] {\n  display: block;\n  margin-top: 0.066667rem;\n  padding: 0 0.093333rem;\n  width: 100%;\n  height: 0.4rem;\n  line-height: 0.4rem;\n  font-size: 0.186667rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.devPage .dev-item .areaBox[data-v-6508396e] {\n  margin-top: 0.093333rem;\n  padding: 0.093333rem 0;\n  background-color: #fff;\n}\n\n.devPage .dev-item .dev-area[data-v-6508396e] {\n  display: block;\n  margin: 0;\n  width: 100%;\n  min-height: 2.5rem;\n  height: auto;\n  line-height: 1.6;\n}\n\n.devPage .dev-item .btn-topic[data-v-6508396e] {\n  display: block;\n  width: 100%;\n  height: 0.533333rem;\n  line-height: 0.533333rem;\n  font-size: 0.213333rem;\n  color: #fff;\n  background-color: #2196f3;\n  border-radius: 0.026667rem;\n}",""])},530:function(t,e,n){var i=n(518);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(475)("aad01180",i,!0,{})},543:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"devPage"},[n("div",{staticClass:"dev-item"},[n("label",[t._v("标题：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.title,expression:"title",modifiers:{trim:!0}}],staticClass:"dev-text",attrs:{type:"text",placeholder:"标题10个字符以上"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"dev-item"},[n("label",[t._v("标签：")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.tab,expression:"tab"}],staticClass:"dev-text dev-select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.tab=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"请选择"}},[t._v("请选择")]),t._v(" "),n("option",{attrs:{value:"good"}},[t._v("精华")]),t._v(" "),n("option",{attrs:{value:"share"}},[t._v("分享")]),t._v(" "),n("option",{attrs:{value:"ask"}},[t._v("问答")]),t._v(" "),n("option",{attrs:{value:"job"}},[t._v("招聘")]),t._v(" "),n("option",{attrs:{value:"dev"}},[t._v("客户端")])])]),t._v(" "),n("div",{staticClass:"dev-item"},[n("label",[t._v("内容：")]),t._v(" "),n("div",{staticClass:"areaBox"},[n("textarea",{staticClass:"dev-text dev-area",domProps:{innerHTML:t._s(t.content)}})])]),t._v(" "),n("div",{staticClass:"dev-item"},[n("button",{staticClass:"btn-topic",attrs:{type:"button"},on:{click:t.topicfn}},[t._v("发布")])])])},staticRenderFns:[]}}});