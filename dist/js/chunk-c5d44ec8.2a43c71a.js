(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5d44ec8"],{"1a06":function(s,e,t){"use strict";t.r(e);var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"destinationDetail"},[t("div",{staticClass:"topTitle"},[t("div",{staticClass:"center"},[t("div",{staticClass:"leftPart"},[t("span",{staticClass:"title"},[s._v(s._s(s.address))]),t("span",{staticClass:"phonetic"},[s._v(s._s(s.describe.ename))])]),t("div",{staticClass:"rightPart"},[t("span",{class:{icon:!0,gone:s.hasgone},on:{click:s.routeAdd}},[t("span",{staticClass:"iconfont icon-qizi"})]),t("span",{staticClass:"word"},[s._v("去过")])])])]),t("div",{class:{navicate:!0,navfixed:s.showCatalog}},[s._m(0)]),t("div",{staticClass:"describe",attrs:{id:"describe"}},[t("div",{staticClass:"center"},[s._m(1),t("p",[s._v(s._s(s.describe.cityDes))])])]),t("div",{staticClass:"scenicRecom",attrs:{id:"scenicRecom"}},[t("div",{staticClass:"center"},[s._m(2),s._l(s.scenicRecomd,(function(e,a){return t("div",{key:a,staticClass:"item"},[t("div",{staticClass:"leftPart"},[t("h4",[t("span",{staticClass:"serial"},[s._v(s._s(a+1))]),s._v(s._s(e.name))]),t("p",{staticClass:"mainDes"},[s._v(s._s(e.desc))]),t("p",{directives:[{name:"show",rawName:"v-show",value:e.scenic,expression:"item.scenic"}],staticClass:"scenic"},[t("span",{staticClass:"start"},[s._v("这里还包含景点：")]),s._v(s._s(e.scenic))])]),t("div",{staticClass:"rightPart"},[t("img",{attrs:{src:e.pic,alt:""}})])])}))],2)]),t("div",{staticClass:"routes",attrs:{id:"routes"}},[s._m(3),s._l(s.routesRecomd,(function(e,a){return t("div",{key:a,class:{itemCount:!0,routeBack:a%2==1}},[t("div",{staticClass:"box"},[t("h2",[s._v(s._s(e.title))]),t("div",{staticClass:"duration"},[t("span",{staticClass:"iconfont icon-calendar"}),t("span",[s._v("游玩时间："),t("span",{staticClass:"num"},[s._v(s._s(e.duration))])])]),s._v("| "),t("div",{staticClass:"date"},[t("span",{staticClass:"iconfont icon-home-sun"}),t("span",[s._v("最佳季节："),t("span",{staticClass:"num"},[s._v(s._s(e.date))])])]),t("br"),t("span",[t("span",{staticClass:"proportion"},[s._v(s._s(e.proportion))]),s._v("人会选择这条线路")]),t("div",{staticClass:"arrange"},s._l(e.arrange,(function(e,a){return t("div",{directives:[{name:"show",rawName:"v-show",value:e,expression:"arg"}],key:a},[s._v("D"+s._s(a+1)+" ："+s._s(e))])})),0),t("div",{staticClass:"light"},[t("h3",[s._v("路线亮点")]),s._l(e.light,(function(e,a){return t("div",{key:a,staticClass:"pic"},[t("img",{attrs:{src:e.pic,alt:""}}),t("div",{staticClass:"mask"}),t("span",[s._v("第"+s._s(a+1)+"天"),t("br"),s._v(s._s(e.des))])])}))],2)])])}))],2),t("travelFoot")],1)},i=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"center"},[t("div",{staticClass:"item"},[t("span",{staticClass:"iconfont icon-free-japan"}),t("a",{attrs:{href:"#describe"}},[s._v("城市概况")])]),t("div",{staticClass:"item"},[t("span",{staticClass:"iconfont icon-free-china"}),t("a",{attrs:{href:"#scenicRecom"}},[s._v("景点推荐")])]),t("div",{staticClass:"item"},[t("span",{staticClass:"iconfont icon-free-route"}),t("a",{attrs:{href:"#routes"}},[s._v("路线推荐")])])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("h2",[t("span",{staticClass:"iconfont icon-free-japan"}),s._v("城市概况")])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("h3",[t("span",{staticClass:"iconfont icon-free-scenery"}),s._v("必游景点TOP5")])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"center"},[t("h2",{staticClass:"title"},[t("span",{staticClass:"iconfont icon-free-route"}),s._v("行程线路推荐")])])}],c=(t("b0c0"),t("9ded")),n={name:"destination-detail",components:{travelFoot:c["a"]},data:function(){return{address:"",token:"",hasgone:!1,describe:{},routesRecomd:[],scenicRecomd:[],showCatalog:!1}},methods:{handleScroll:function(){document.documentElement.scrollTop>300?this.showCatalog=!0:this.showCatalog=!1},updataPage:function(){var s=this;this.$https.post("/destination/getMsg",{name:this.address}).then((function(e){if(e.body.success){var t=e.body.des;if(s.describe={name:t.name,ename:t.ename,cityDes:t.cityDes},s.scenicRecomd=[{name:t.scenicName1,pic:t.pic1,desc:t.scenicDes1,scenic:t.moreScenic1},{name:t.scenicName2,pic:t.pic2,desc:t.scenicDes2,scenic:t.moreScenic2},{name:t.scenicName3,pic:t.pic3,desc:t.scenicDes3,scenic:t.moreScenic3},{name:t.scenicName4,pic:t.pic4,desc:t.scenicDes4,scenic:t.moreScenic4},{name:t.scenicName5,pic:t.pic5,desc:t.scenicDes4,scenic:t.moreScenic5}],t.routeName1){var a={title:t.routeName1,duration:t.playtime1,date:t.season1,proportion:t.percent1,arrange:[t.dayRoute11,t.dayRoute12],light:[{pic:t.pic1,des:t.scenicName1},{pic:t.pic2,des:t.scenicName1}]};s.routesRecomd.push(a)}if(t.routeName2){var i={title:t.routeName2,duration:t.playtime2,date:t.season2,proportion:t.percent2,arrange:[t.dayRoute21,t.dayRoute22],light:[{pic:t.pic3,des:t.scenicName3},{pic:t.pic4,des:t.scenicName4}]};s.routesRecomd.push(i)}if(t.routeName3){var c={title:t.routeName3,duration:t.playtime3,date:t.season3,proportion:t.percent3,arrange:[t.dayRoute31,t.dayRoute32],light:[{pic:t.pic5,des:t.scenicName5}]};s.routesRecomd.push(c)}}else{var n=s;s.$info({title:e.body.rspDesc,onOk:function(){n.$router.go(-1)}})}}))},routeAdd:function(){this.token?this.hasgone=!0:this.$message.error("请先登录")}},created:function(){this.token=this.$store.state.token,this.address=this.$route.query.address,this.updataPage()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},o=n,r=(t("7007"),t("2877")),d=Object(r["a"])(o,a,i,!1,null,"77ec6a8c",null);e["default"]=d.exports},7007:function(s,e,t){"use strict";var a=t("7017"),i=t.n(a);i.a},7017:function(s,e,t){},b0c0:function(s,e,t){var a=t("83ab"),i=t("9bf2").f,c=Function.prototype,n=c.toString,o=/^\s*function ([^ (]*)/,r="name";!a||r in c||i(c,r,{configurable:!0,get:function(){try{return n.call(this).match(o)[1]}catch(s){return""}}})}}]);
//# sourceMappingURL=chunk-c5d44ec8.2a43c71a.js.map