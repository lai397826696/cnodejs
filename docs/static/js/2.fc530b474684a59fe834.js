webpackJsonp([2],{456:function(t,n,e){function o(t){e(497)}var s=e(53)(e(480),e(510),o,"data-v-021df472",null);t.exports=s.exports},465:function(t,n,e){function o(t){e(470)}var s=e(53)(e(467),e(472),o,"data-v-0fba569b",null);t.exports=s.exports},467:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"scrollBox",props:{offset:{type:Number,default:50},onRefresh:{type:Function,default:void 0},onInfinite:{type:Function,default:void 0}},data:function(){return{offsets:this.offset,scrollTop:0,touching:!1,startY:0,top:0,refactive:!1,infin:!1,scrollStop:!0}},computed:{tops:function(){return this.rem2px(this.top-this.offset)}},methods:{scrollfn:function(t){this.scrollTop=this.$el.scrollTop;var n=this.$el.offsetHeight,e=this.$refs.onlyChild.scrollHeight;this.$emit("top",this.$el.scrollTop),this.infin||(this.infin=!0),this.$el.scrollTop+10>=e-n-this.offsets&&this.scrollStop&&(this.scrollStop=!1,this.infinite())},touchstart:function(t){if(this.top==this.offsets)return!1;this.touching=!0,this.startY=this.pageY(t)},touchmove:function(t){if(this.top==this.offsets)return!1;if(this.$el.scrollTop>0||!this.touching)return!1;var n=this.pageY(t)-this.startY;n>0&&t.preventDefault(),this.top=Math.pow(n,.8)},touchend:function(t){this.touching=!1,this.top>=this.offsets?(this.top=this.offsets,this.refactive=!0,this.refresh()):(this.top=0,this.startY=0)},pageY:function(t){return t.changedTouches?t.changedTouches[0].pageY:t.pageY},refresh:function(){this.onRefresh(this.refsuccess)},refsuccess:function(){this.top=0,this.refactive=!1},infinite:function(){this.onInfinite(this.infinsuccess)},infinsuccess:function(){this.infin=!1,this.scrollStop=!0},rem2px:function(t){return t/75}}}},468:function(t,n,e){n=t.exports=e(448)(!1),n.push([t.i,".scrollBox[data-v-0fba569b] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  font-size: .213333rem;\n  overflow-y: auto;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-overflow-scrolling: touch;\n}\n\n.scrollBox .scrollBody[data-v-0fba569b] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 0;\n  -webkit-overflow-scrolling: touch;\n  -webkit-transition-duration: .3s;\n          transition-duration: .3s;\n}\n\n.scrollBox .scrollBody .Loading[data-v-0fba569b] {\n  position: relative;\n  width: 100%;\n  height: 0.506667rem;\n  padding: 0.08rem 0;\n}\n\n.scrollBox .scrollBody .Loading .star[data-v-0fba569b] {\n  margin: 0.08rem auto;\n  width: 0.24rem;\n  height: 0.24rem;\n  border-radius: 50%;\n  border: 0.053333rem solid #ccc;\n  border-right-color: transparent;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n\n.scrollBox .scrollBody .Loading .refactive[data-v-0fba569b] {\n  -webkit-animation: rotatefn-data-v-0fba569b .7s linear infinite;\n          animation: rotatefn-data-v-0fba569b .7s linear infinite;\n}\n\n.scrollBox.touchs .scrollBody[data-v-0fba569b] {\n  -webkit-transition-duration: 0ms;\n          transition-duration: 0ms;\n}\n\n@-webkit-keyframes rotatefn {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes rotatefn-data-v-0fba569b {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}",""])},470:function(t,n,e){var o=e(468);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(449)("640ea62e",o,!0,{})},472:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"scrollBox",class:{touchs:t.touching},on:{scroll:function(n){t.onInfinite&&t.scrollfn(n)},touchstart:function(n){t.onRefresh&&t.touchstart(n)},touchmove:function(n){t.onRefresh&&t.touchmove(n)},touchend:function(n){t.onRefresh&&t.touchend(n)},mousedown:function(n){t.onRefresh&&t.touchstart(n)},mousemove:function(n){t.onRefresh&&t.touchmove(n)},mouseup:function(n){t.onRefresh&&t.touchend(n)}}},[e("div",{ref:"onlyChild",staticClass:"scrollBody",style:{transform:"translate3d(0px,"+t.tops+"rem,0px)"}},[t.onRefresh?e("div",{ref:"loading",staticClass:"Loading"},[e("div",{staticClass:"star",class:{refactive:t.refactive},style:{transform:"rotate("+3*t.top+"deg)"}})]):t._e(),t._v(" "),t._t("default"),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!!t.infin,expression:"!!infin"}],staticClass:"Loading"},[e("div",{staticClass:"star refactive"})])],2)])},staticRenderFns:[]}},480:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=(e(63),e(465)),s=e.n(o);n.default={name:"scroll",data:function(){return{refredata:[]}},created:function(){for(var t=0;t<30;t++)this.refredata.push("我是滚动条，我要增加滚动")},components:{Scroll:s.a},methods:{onRefresh:function(t){setTimeout(function(){t()},2e3)},onInfinite:function(t){var n=this;setTimeout(function(){for(var e=0;e<15;e++)n.refredata.push("我是滚动条，我要增加滚动");t()},2e3)}}}},485:function(t,n,e){n=t.exports=e(448)(!1),n.push([t.i,".scrollPage[data-v-021df472] {\n  overflow: hidden;\n}\n\n.scrollPage p[data-v-021df472] {\n  margin: .133333rem 0;\n  padding: .133333rem;\n}",""])},497:function(t,n,e){var o=e(485);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(449)("424a60fe",o,!0,{})},510:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Scroll",{staticClass:"scrollPage",attrs:{onRefresh:t.onRefresh,onInfinite:t.onInfinite}},t._l(t.refredata,function(n,o){return e("p",{key:o},[t._v(t._s(n+(o+1)))])}),0)},staticRenderFns:[]}}});