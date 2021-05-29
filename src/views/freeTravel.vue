<template>
    <div class="free">
        <bannerMenu nowActive='0'></bannerMenu>
        <div class="centerContent">
            <!--搜索框-->
            <searchBox :arrive="arriveDes" title="自由行"></searchBox>
            <!--目的地和广告-->
            <div class="places" @mouseleave="menuIndex=-1">
                <ul class="recom">
                    <li class="item" v-for="(item,index) in recomMenu" :key="index" @mouseenter="menuIndex=index">
                        <div class="picture"><span :class="['iconfont',item.icon]"></span></div>
                        <div class="place-country">
                            <h3><span v-for="(cont1,i) in item.title" :key="i">{{cont1}}</span></h3>
                            <div class="provice">
                                <span v-for="(cont2,j) in item.example" :key="j">{{cont2}}</span>
                            </div>
                        </div>
                        <div class="more"><a-icon type="right" /></div>
                    </li>
                </ul>
                <div class="advertise">
                    <img src="../assets/free-adv.png" alt="">
                    <span class="word">广告</span>
                    <ul class="promise">
                        <li>
                            <div><span class="iconfont icon-free-price"></span></div>
                            <div class="desc">
                                <span>透明低价</span><br/>
                                超值低价、每日更新
                            </div>
                        </li>
                        <li>
                            <div><span class="iconfont icon-free-route"></span></div>
                            <div class="desc">
                                <span>海量路线</span><br/>
                                全球线路、自由选择
                            </div>
                        </li>
                        <li>
                            <div><span class="iconfont icon-free-service"></span></div>
                            <div class="desc">
                                <span>客服保障</span><br/>
                                专业客服、实时在线
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recomContent" v-show="menuIndex>-1">
                    <div class="item" v-for="(item,index) in hotDestination[menuIndex]" :key="index">
                        <div class="title">{{item.mainPro}}</div>
                        <div class="content">
                                <span v-for="(cont,i) in item.Scenic" :key="i" @click="chooseArrive(cont)">
                                    {{cont}}<span class="interval">|</span>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
            <!--热销榜-->
            <div v-for="(item,index) in recomend" :key="index"
                 class="hot">
                <h2>{{item.title}}</h2>
                <ul>
                    <li class="item" v-for="(cont,i) in item.content"
                        :key="i" @click="gotoDeatil(cont.id)">
                        <div class="picture">
                            <img :src="cont.desPic1">
                        </div>
                        <div class="box">
                            <div class="describe">{{cont.mainTitle}}</div>
                            <div class="price"><b>￥{{cont.price}}</b>起</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <travelFoot></travelFoot>
    </div>
</template>

<script>
    import bannerMenu from '../components/bannerMenu';
    import travelFoot from '../components/travelFoot';
    import searchBox from '../components/searchBox';

    export default {
        name: "freeTravel",
        components: {
            bannerMenu,
            travelFoot,
            searchBox
        },
        data(){
            return{
                arriveDes:'',/*到达地*/
                /*推荐去向菜单---1*/
                recomMenu:[
                    {icon:'icon-free-china',title:['国内旅游'],example:['厦门','成都','深圳','大理','西安']},
                    {icon:'icon-free-japan',title:['日本'],example:['东京','大阪','冲绳','北海道','镰仓']},
                    {icon:'icon-free-south',title:['东南亚','南亚','泰国'],example:['巴厘岛','尼泊尔','清迈','普吉岛']},
                    {icon:'icon-free-macao',title:['香港','澳门','台湾'],example:['台北','垦丁','高雄','香港']},
                    {icon:'icon-free-america',title:['欧洲','美洲'],example:['美国','洛杉矶','旧金山','法国']},
                    {icon:'icon-free-island',title:['热门海岛'],example:['象岛','巴厘岛','长滩岛','塞班岛']},
                ],
                menuIndex:-1,/*去向内容的id*/
                /*推荐地点---2*/
                hotDestination:[
                    [/*国内旅游----*/
                        { mainPro:'热门', Scenic:['厦门','成都','深圳','大理','西安']},
                        { mainPro:'云南', Scenic:['丽江','大理','昆明','香格里拉','西双版纳']},
                        { mainPro:'四川', Scenic:['成都','九寨沟']},
                        { mainPro:'浙江', Scenic:['杭州','乌镇','西塘']},
                        { mainPro:'福建', Scenic:['厦门','鼓浪屿','泉州','武夷山']},
                        { mainPro:'广东', Scenic:['广州','深圳','珠海','汕头']},
                        { mainPro:'内蒙古', Scenic:['呼伦贝尔','阿尔山']},
                        { mainPro:'东北', Scenic:['长白山','大连','哈尔滨','长春']},
                        { mainPro:'海南', Scenic:['三亚','海口','西沙']},
                    ],
                    [/*日本-----*/
                        { mainPro:'日本', Scenic:['东京','大阪','冲绳','九州','香川','北海道','镰仓','神户','奈良','名古屋']},
                    ],
                    [/*东南亚、南亚、泰国----*/
                        { mainPro:'泰国', Scenic:['普吉岛','清迈','苏梅岛','曼谷','甲米','芭提雅','象岛']},
                        { mainPro:'南亚', Scenic:['马尔代夫','尼泊尔','印度']},
                        { mainPro:'越柬老缅', Scenic:['越南','芽庄','柬埔寨','岘港','吴哥窟','缅甸','老挝','胡志明','大叻','河内','暹粒','金边']},
                        { mainPro:'菲律宾|文莱', Scenic:['菲律宾','长滩岛','杜马盖地','薄荷岛','宿雾','文莱']},
                        { mainPro:'印尼|马拉西亚|新加披', Scenic:['巴厘岛','马来西亚','沙巴','仙本那','美娜多','吉隆坡','新加坡','纳闽']},

                    ],
                    [/*港、澳、台-------*/
                        { mainPro:'台湾', Scenic:['台北','垦丁','花莲','高雄','台中','阿里山']},
                        { mainPro:'香港|澳门',Scenic:['香港','澳门']},
                    ],
                    [/*欧、美---------*/
                        { mainPro:'欧洲', Scenic:['英国','法国','意大利','德国','瑞士','西班牙','伦敦','巴黎','圣托里尼', '罗马','奥地利',
                                '丹麦','匈牙利','荷兰','普罗旺斯','比利时','巴塞罗那','贝加尔湖','马德里','葡萄牙','波兰','爱尔兰',]},
                        { mainPro:'美洲', Scenic:['美国','加拿大','洛杉矶','旧金山','纽约', '塞班岛','关岛','夏威夷','黄石公园',
                                '阿根廷','西雅图','华盛顿','波士顿','迈阿密','古巴','墨西哥','拉斯维加斯','芝加哥','秘鲁']}
                    ],
                    [/*海岛----*/
                        { mainPro:'当季热门', Scenic:['普吉岛','巴厘岛','苏梅岛','塞班岛','长滩岛','斐济','关岛','夏威夷']},
                        { mainPro:'高端奢华', Scenic:['马尔代夫','毛里求斯','大溪地','塞舌尔']},
                        { mainPro:'马尔代夫', Scenic:['双鱼岛','伊露岛','蜜月岛','第六感拉姆岛','宁静岛','蕉叶岛','柏悦哈达哈','蓝色美人蕉','阿玛瑞岛','中央格兰德','萨芙莉岛','神仙珊瑚岛']},
                    ],
                ],
                /*热门景点*/
                recomend:[
                    {title:'热销榜',content:[]},
                    {title:'休假好去处',content:[]},
                    {title:'看海圣地',content:[]},
                    {title:'扫货圣地',content:[]},
                ],
            }
        },
        methods:{
            /*选择到达的地点*/
            chooseArrive(value){
                this.arriveDes=value;
                this.menuIndex=-1;
            },
            /*查看内容跳转到详情页面，参数：id作为标志*/
            gotoDeatil(id){
                this.$router.push({
                    path:'freeDetail',
                    query:{id:id}
                })
            },
            /*功能：初始化数据*/
            /*功能：更新数据*/
            initData(){
                this.$https.get('/selfguid/init').then( res =>{
                    if(res.body.success){
                       this.recomend[0].content = res.body.selfGuidList.slice(0,4);
                       this.recomend[1].content = res.body.selfGuidList.slice(4,8);
                       this.recomend[2].content = res.body.selfGuidList.slice(8,12);
                       this.recomend[3].content = res.body.selfGuidList.slice(12,16);
                    }
                })
            }
        },
        created(){
            this.initData();
        }
    }
</script>

<style scoped lang="scss">
    .centerContent{
        width: 80%;
        margin: 0 auto;
    }
    .free{
        /*头部---------*/
        position: relative;
        min-width: 1000px;
        .places{
            display: flex;
            margin-top: 15px;
            position: relative;
            .recom{
                flex: 1;
                list-style: none;
                border: 1px solid #4b61c1;
                border-right: none;
                padding-left: 0;
                z-index: 2;
                .item{
                    height: 80px;
                    display: flex;
                    border-bottom: 1px solid #f6f6f6;
                    padding-left: 15px;
                    border-right: 1px solid #4b61c1;
                    .picture{
                        flex: 1;
                        line-height: 70px;
                        .iconfont{
                            font-size: 30px;
                            color:  #4b61c1;
                        }
                    }
                    .place-country{
                        flex: 4;
                        padding-top: 10px;
                        h3{
                            span{
                                padding-right: 5px;
                            }
                        }
                        .provice{
                            font-size: 11px;
                            span{
                                padding-right: 8px;
                                &:hover{
                                    text-decoration: underline;
                                    color: #4b61c1;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .more{
                        line-height: 70px;
                        color: #666;
                        padding-right: 14px;
                    }
                    &:hover{
                        padding-left: 20px;
                        border-top: 1px solid #4b61c1;
                        border-bottom: 1px solid #4b61c1;
                        border-right: none;
                        &:last-of-type{
                            border-bottom: none;
                        }
                        &:first-of-type{
                            border-top: none;
                        }
                        .more{
                            color: #4b61c1;
                        }
                    }
                }
            }
            .recomContent{
                width: 720px;
                height: 440px;
                position: absolute;
                left: 24%;
                top: 0;
                border: 1px solid #4b61c1;
                border-left: none;
                background-color: #fff;
                display: flex;
                flex-wrap: wrap;
                padding: 30px 10px 20px 40px;
                .item{
                    width: 45%;
                    margin-right: 30px;
                    .title{
                        color: #000;
                        font-size: 17px;
                        font-weight: bold;
                        border-bottom: 1px solid #f0f0f0;
                        padding-bottom: 5px;
                    }
                    .content{
                        span{
                            display: inline-block;
                            padding: 5px 0;
                            font-size: 13px;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                        .interval{
                            color: #ccc;
                            padding: 0 8px;
                            font-size: 11px;
                        }
                    }
                }
            }
            .advertise{
                flex: 3;
                margin-left: 30px;
                position: relative;
                img{
                    width: 100%;
                }
                .word{
                    position: absolute;
                    right: 20px;
                    top: 15px;
                    padding: 2px 10px;
                    color: #fff;
                    background-color: rgba(0,0,0,.4);
                }
                ul{
                    list-style:none;
                    display: flex;
                    margin-top: 12px;
                    li{
                        flex: 1;
                        margin-right: 50px;
                        display: flex;
                        &:last-of-type{
                            margin-right: 0;
                        }
                        >div{
                            flex: 1;
                            .iconfont{
                                font-size: 35px;
                                color: #4b61c1;
                            }
                        }
                        .desc{
                            flex: 3;
                            color: #777;
                            font-size: 12px;
                            span{
                                color: #000;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
        /*热销榜----------*/
        .hot{
            margin: 30px 0 ;
            h2{
                color: #4b61c1;
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
            }
            ul{
                width: 100%;
                display: flex;
                list-style: none;
                padding-left: 0;
                padding-top: 5px;
                .item{
                    flex: 1;
                    margin-right: 20px;
                    position: relative;
                    cursor: pointer;
                    &:last-of-type{
                        margin-right: 0;
                    }
                    img{
                        width: 100%;
                    }
                    .box{
                        border: 1px solid #ddd;
                        padding: 5px 10px;
                        .describe{
                            overflow: hidden;
                            color: #000;
                            line-height: 20px;
                            font-size: 13px;
                            position: absolute;
                            left: 1px;
                            top: 140px;
                            padding: 0 10px;
                            background-color: #fff;
                            height: 40px;
                            width: 99%;
                        }
                        .price{
                            color: #ff9d00;
                            font-size: 14px;
                            z-index: 6;
                            margin-top: 40px;
                            b{
                                font-size: 22px;
                            }
                        }

                    }
                    &:hover{
                        .describe{
                            top: 100px;
                            height: 80px;
                        }
                    }
                }
            }
        }
    }

</style>