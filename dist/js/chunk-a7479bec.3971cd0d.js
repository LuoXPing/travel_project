(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a7479bec"],{16091:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"main"},[a("div",{staticClass:"centerContent"},[a("div",{staticClass:"TopNav"},[a("div",{staticClass:"navMenu",on:{mouseleave:function(s){t.nowIndex=-1}}},[a("h4",[t._v("旅游攻略导航")]),a("ul",{staticClass:"menuBox"},[a("li",{on:{mouseenter:function(s){t.nowIndex=0}}},[t._v("国内精选 "),a("a-icon",{staticClass:"icon",attrs:{type:"right"}})],1),a("li",{on:{mouseenter:function(s){t.nowIndex=1}}},[t._v("国外精选 "),a("a-icon",{staticClass:"icon",attrs:{type:"right"}})],1),a("li",{on:{mouseenter:function(s){t.nowIndex=2}}},[t._v("奔向海岛 "),a("a-icon",{staticClass:"icon",attrs:{type:"right"}})],1),a("li",{on:{mouseenter:function(s){t.nowIndex=3}}},[t._v("主题推荐 "),a("a-icon",{staticClass:"icon",attrs:{type:"right"}})],1)]),a("ol",{directives:[{name:"show",rawName:"v-show",value:-1!=t.nowIndex&&t.nowIndex<3,expression:"nowIndex!=-1&&nowIndex<3"}],staticClass:"menuContent"},t._l(t.addressData[t.nowIndex],(function(s,e){return a("li",{key:e},[a("em",[t._v(t._s(e))]),a("span",{staticClass:"address",on:{click:function(e){t.address=s.address}}},[t._v(t._s(s.address))]),a("span",{staticClass:"desc"},[t._v(t._s(s.describe))])])})),0),a("ul",{directives:[{name:"show",rawName:"v-show",value:3==t.nowIndex,expression:"nowIndex==3"}],staticClass:"menuContent1"},t._l(t.addressData[3],(function(s,e){return a("li",{key:e},[a("div",{staticClass:"topic"},[t._v(t._s(s.topic))]),a("div",{staticClass:"country"},t._l(s.country,(function(s,e){return a("span",{key:e,on:{click:function(e){t.address=s}}},[t._v(t._s(s))])})),0)])})),0),a("div",{staticClass:"search"},[a("a-icon",{staticClass:"searchIcon",attrs:{type:"search"},on:{click:t.searchMore}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],attrs:{type:"text",placeholder:"输入想去的地点"},domProps:{value:t.address},on:{input:function(s){s.target.composing||(t.address=s.target.value)}}})],1)]),a("div",{staticClass:"rightPart"},[[a("a-carousel",{attrs:{arrows:"",autoplay:""}},[a("div",{staticClass:"custom-slick-arrow",staticStyle:{left:"10px",zIndex:"1"},attrs:{slot:"prevArrow"},slot:"prevArrow"},[a("a-icon",{attrs:{type:"left-circle"}})],1),a("div",{staticClass:"custom-slick-arrow",staticStyle:{right:"10px"},attrs:{slot:"nextArrow"},slot:"nextArrow"},[a("a-icon",{attrs:{type:"right-circle"}})],1),a("div",[a("img",{attrs:{src:e("cb33"),alt:""}})]),a("div",[a("img",{attrs:{src:e("5ef1"),alt:""}})]),a("div",[a("img",{attrs:{src:e("6ffc"),alt:""}})]),a("div",[a("img",{attrs:{src:e("da54"),alt:""}})])])]],2)]),a("div",{staticClass:"btn"},[a("span",{staticClass:"person",on:{click:function(s){return t.gotoPerson("/person",2)}}},[a("a-icon",{staticClass:"icon",attrs:{type:"read"}}),a("span",[t._v("我的游记")])],1),a("span",{staticClass:"write",on:{click:function(s){return t.gotoPerson("/writeStrategy",2)}}},[a("a-icon",{staticClass:"icon",attrs:{type:"edit"}}),a("span",[t._v("书写游记")])],1)]),a("div",{staticClass:"recomendStrategy"},[a("div",{staticClass:"ranking"},[a("h3",[t._v("热门排行")]),a("ul",{staticClass:"rankCont"},t._l(t.rankData,(function(s,e){return a("li",{key:e},[a("span",{staticClass:"number"},[t._v(t._s(e+1))]),a("span",{on:{click:function(e){t.address=s}}},[t._v(t._s(s))])])})),0)]),a("div",{staticClass:"strategy"},[a("h3",[t._v("推荐攻略")]),a("ul",{staticClass:"mainCont"},t._l(t.strategyDate,(function(s,e){return a("li",{key:e,on:{click:function(e){return t.goteDetail(s.id)}}},[a("div",{staticClass:"item"},[a("span",{staticClass:"title"},[t._v(t._s(s.mainTitle))]),a("div",{staticClass:"detail"},[a("div",{staticClass:"picture"},[s.picture1?a("img",{attrs:{src:s.picture1,alt:""}}):a("img",{attrs:{src:"http://localhost:8081/strategy/default.jpg",alt:""}})]),a("div",{staticClass:"desc"},[t._v(t._s(s.article1))])]),a("div",{staticClass:"information"},[a("img",{staticClass:"head",attrs:{src:s.headPic}}),a("span",[t._v("来自于")]),a("span",{staticClass:"name"},[t._v(t._s(s.nickName))])]),a("div",{staticClass:"support"},[a("span",{staticStyle:{color:"#ff9d00"}},[t._v(t._s(s.supportNum))]),t._v(" 个人点赞过 "),a("a-icon",{staticStyle:{color:"#ff9d00"},attrs:{type:"like",theme:"filled"}})],1)])])})),0),a("a-pagination",{staticStyle:{float:"right"},attrs:{current:t.current,total:t.totalNum,defaultCurrent:1,hideOnSinglePage:!0},on:{change:t.gotoNextpage}})],1)])]),a("travelFoot")],1)},r=[],i=e("9ded"),n={name:"strategy",components:{travelFoot:i["a"]},data:function(){return{rankData:["成都","香港","台湾","东京","广州","北海道","曼谷","新加坡","重庆","厦门"],nowIndex:-1,addressData:[[{address:"北海道",describe:"在皑皑白雪中泡温泉"},{address:"冰岛",describe:"亲近极北之地的莫测极光"},{address:"澳大利亚",describe:"在南半球过个暖洋洋的圣诞"},{address:"洛杉矶",describe:"阳光加州，避寒圣地"},{address:"斯里兰卡",describe:"便利签证，异域风情"},{address:"菲律宾",describe:"徜徉海岛间，潜入深海中"},{address:"迪拜",describe:"沙漠中的奇迹之城"}],[{address:"黄山",describe:"银装素裹秒杀菲林季"},{address:"西岭雪山",describe:"成都周边最大滑雪场"},{address:"西双版纳",describe:"聆听欣赏原生态歌舞"},{address:"霞浦",describe:"红枫白荻的交相辉映"},{address:"广州",describe:"相约一起喝粤式早茶"},{address:"高雄",describe:"暖冬初阳遇最美台湾"},{address:"三亚",describe:"去热带海滩逃离寒冬"}],[{address:"象岛",describe:"腻了普吉，来象岛玩个深度季"},{address:"巴厘岛",describe:"巴厘岛免签啦"},{address:"毛里求斯",describe:"印度洋上的海上明珠"},{address:"塞班岛",describe:"成都周边最大滑雪场"},{address:"西双版纳",describe:"错“季”出行，也有惊喜"},{address:"长滩岛",describe:"潜水与蜜月的天堂"},{address:"圣托里尼",describe:"蓝白之城映衬着海风吹拂 "}],[{topic:"骑行",country:["海南","青海湖","台湾","厦门","太湖","大理","成都","杭州","北京"]},{topic:"潜水",country:["夏威夷","巴厘岛","三亚","泰国","三亚","马尔代夫"]},{topic:"徒步",country:["尼泊尔","三峡","阳朔","西双版纳"]},{topic:"登山",country:["珠穆朗玛峰","五台山","牛背山","黄山","泰山","太白山"]}]],strategyDate:[],totalNum:0,current:1,address:""}},computed:{token:function(){return this.$store.state.token}},methods:{goteDetail:function(t){this.$router.push({path:"/strategyDetail",query:{id:t}})},gotoPerson:function(t,s){this.token?this.$router.push({path:t,query:{navIndex:s}}):this.$message.warning("请先进行登录")},searchMore:function(){this.address&&(this.updateStrategy(),document.documentElement.scrollTop=380)},gotoNextpage:function(t){this.current=t,document.documentElement.scrollTop=380,this.updateStrategy()},updateStrategy:function(){var t=this,s=this.current-1,e={};e=this.address?{address:this.address,pageNum:s}:{pageNum:s},this.$https.post("/strategy/getByAdd",e).then((function(s){s.body.success?(t.totalNum=s.body.number,t.strategyDate=s.body.strategyList):t.$message.error(s.body.rspDesc)}))}},created:function(){this.updateStrategy()}},c=n,o=(e("7da7"),e("2877")),d=Object(o["a"])(c,a,r,!1,null,"276b1f02",null);s["default"]=d.exports},"5ef1":function(t,s,e){t.exports=e.p+"img/strategy-cal2.ed335e01.jpeg"},"6ffc":function(t,s,e){t.exports=e.p+"img/strategy-cal3.14f8cdeb.jpeg"},"7da7":function(t,s,e){"use strict";var a=e("f10c"),r=e.n(a);r.a},cb33:function(t,s,e){t.exports=e.p+"img/strategy-cal1.b91f1603.jpeg"},da54:function(t,s,e){t.exports=e.p+"img/strategy-cal4.299789f0.jpeg"},f10c:function(t,s,e){}}]);
//# sourceMappingURL=chunk-a7479bec.3971cd0d.js.map