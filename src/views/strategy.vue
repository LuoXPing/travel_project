<template>
    <div class="main">
        <div class="centerContent">
            <div class="TopNav">
                <!--左边-->
                <div class="navMenu" @mouseleave="nowIndex=-1">
                    <h4>旅游攻略导航</h4>
                    <!--推荐菜单-->
                    <ul class="menuBox" >
                        <li @mouseenter="nowIndex=0">国内精选 <a-icon class="icon" type="right"/></li>
                        <li @mouseenter="nowIndex=1">国外精选 <a-icon class="icon" type="right" /></li>
                        <li @mouseenter="nowIndex=2">奔向海岛 <a-icon class="icon" type="right" /></li>
                        <li @mouseenter="nowIndex=3">主题推荐 <a-icon class="icon" type="right" /></li>
                    </ul>
                    <ol class="menuContent" v-show="nowIndex!=-1&&nowIndex<3">
                        <li v-for="(item,index) in addressData[nowIndex]" :key="index">
                            <em>{{index}}</em>
                            <span class="address" @click="address=item.address">{{item.address}}</span>
                            <span class="desc">{{item.describe}}</span>
                        </li>
                    </ol>
                    <ul class="menuContent1" v-show="nowIndex==3">
                        <li v-for="(item,index) in addressData[3]" :key="index">
                            <div class="topic">{{item.topic}}</div>
                            <div class="country">
                                <span v-for="(content,i) in item.country" :key="i"
                                      @click="address=content">{{content}}</span>
                            </div>
                        </li>
                    </ul>
                    <!--搜索框-->
                    <div class="search">
                        <a-icon type="search" class="searchIcon" @click="searchMore"/>
                        <input type="text" placeholder="输入想去的地点" v-model="address">
                    </div>
                </div>
                <!--右边-->
                <div class="rightPart">
                    <template>
                        <a-carousel arrows autoplay>
                            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                                <a-icon type="left-circle" />
                            </div>
                            <div slot="nextArrow"  class="custom-slick-arrow" style="right: 10px">
                                <a-icon type="right-circle" />
                            </div>
                            <div><img src="../assets/strategy-cal1.jpeg" alt=""></div>
                            <div><img src="../assets/strategy-cal2.jpeg" alt=""></div>
                            <div><img src="../assets/strategy-cal3.jpeg" alt=""></div>
                            <div><img src="../assets/strategy-cal4.jpeg" alt=""></div>
                        </a-carousel>
                    </template>
                </div>
            </div>
            <!--书写查看游记-->
            <div class="btn">
                <span class="person" @click="gotoPerson('/person',2)">
                    <a-icon type="read" class="icon"/>
                    <span >我的游记</span>
                </span>
                <span class="write" @click="gotoPerson('/writeStrategy',2)">
                    <a-icon type="edit" class="icon" />
                    <span >书写游记</span>
                </span>
            </div>
            <div class="recomendStrategy">
               <div class="ranking">
                   <h3>热门排行</h3>
                   <ul class="rankCont">
                       <li v-for="(item,index) in rankData" :key="index">
                           <span class="number">{{index+1}}</span>
                           <span @click="address=item">{{item}}</span>
                       </li>
                   </ul>
               </div>
                <div class="strategy">
                    <h3>推荐攻略</h3>
                    <ul class="mainCont">
                        <li v-for="(item,index) in strategyDate" :key="index" @click="goteDetail(item.id)">
                           <div class="item">
                               <span class="title">{{item.mainTitle}}</span>
                               <div class="detail">
                                   <div class="picture">
                                       <img :src="item.picture1" alt="" v-if="item.picture1">
                                       <img src="http://localhost:8081/strategy/default.jpg" alt="" v-else>
                                   </div>
                                   <div class="desc">{{item.article1}}</div>
                               </div>
                               <!--个人信息-->
                               <div class="information">
                                   <img :src="item.headPic" class="head">
                                   <span>来自于</span>
                                   <span class="name">{{item.nickName}}</span>
                               </div>
                               <!--点赞-->
                               <div class="support">
                                   <span style="color: #ff9d00;">{{item.supportNum}}</span>
                                   个人点赞过
                                   <a-icon type="like" style="color: #ff9d00;" theme="filled"/>
                               </div>
                           </div>
                        </li>
                    </ul>
                    <a-pagination :current="current" :total="totalNum" :defaultCurrent="1" style="float: right;"
                                  :hideOnSinglePage="true" @change="gotoNextpage"/>
                </div>
            </div>
        </div>
        <travelFoot></travelFoot>
    </div>

</template>

<script>
    import travelFoot from '../components/travelFoot'
    export default {
        name: "strategy",
        components:{
            travelFoot
        },
        data(){
            return{
                /*热门排行*/
                rankData:['成都','香港','台湾','东京','广州','北海道','曼谷','新加坡','重庆','厦门'],
                /*推荐地点导航栏*/
                nowIndex:-1,
                addressData:[
                    /*国外精选*/
                    [{address:'北海道',describe:'在皑皑白雪中泡温泉'}, {address:'冰岛',describe:'亲近极北之地的莫测极光'},
                        {address:'澳大利亚',describe:'在南半球过个暖洋洋的圣诞'}, {address:'洛杉矶',describe:'阳光加州，避寒圣地'},
                        {address:'斯里兰卡',describe:'便利签证，异域风情'}, {address:'菲律宾',describe:'徜徉海岛间，潜入深海中'},
                        {address:'迪拜',describe:'沙漠中的奇迹之城'}],
                    /*国内精选*/
                    [{address:'黄山',describe:'银装素裹秒杀菲林季'}, {address:'西岭雪山',describe:'成都周边最大滑雪场'},
                        {address:'西双版纳',describe:'聆听欣赏原生态歌舞'}, {address:'霞浦',describe:'红枫白荻的交相辉映'},
                        {address:'广州',describe:'相约一起喝粤式早茶'}, {address:'高雄',describe:'暖冬初阳遇最美台湾'},
                        {address:'三亚',describe:'去热带海滩逃离寒冬'}],
                    /*海岛*/
                    [{address:'象岛',describe:'腻了普吉，来象岛玩个深度季'},
                        {address:'巴厘岛',describe:'巴厘岛免签啦'}, {address:'毛里求斯',describe:'印度洋上的海上明珠'},
                        {address:'塞班岛',describe:'成都周边最大滑雪场'}, {address:'西双版纳',describe:'错“季”出行，也有惊喜'},
                        {address:'长滩岛',describe:'潜水与蜜月的天堂'}, {address:'圣托里尼',describe:'蓝白之城映衬着海风吹拂 '}],
                    /*主题推荐*/
                    [{topic:'骑行',country:['海南','青海湖','台湾','厦门','太湖','大理','成都','杭州','北京']},
                        {topic:'潜水',country:['夏威夷','巴厘岛','三亚','泰国','三亚','马尔代夫']},
                        {topic:'徒步',country:['尼泊尔','三峡','阳朔','西双版纳']},
                        {topic:'登山',country:['珠穆朗玛峰','五台山','牛背山','黄山','泰山','太白山']},
                    ]
                ],
                /*主要推荐攻略*/
                strategyDate:[],
                totalNum:0,//总页码
                current:1,/*当前页码*/
                /*想去的地点，搜索框内容*/
                address:'',
            }
        },
        computed:{
            /*登录的标志*/
            token:function () {
                return this.$store.state.token;
            }
        },
        methods:{
            /*跳转到攻略详情页面，参数：id：被点击攻略的id*/
            goteDetail(id){
                this.$router.push({
                    path:'/strategyDetail',
                    query:{ id:id }}
                )},
            /*跳转到个人中心，参数：path：跳转的路径，id为那一页的标志*/
            gotoPerson(path,id){
                if(this.token){
                    this.$router.push({
                        path: path,
                        query:{navIndex:id}
                    })
                }else{
                    this.$message.warning('请先进行登录');
                }

            },
            /*搜索游记*/
            searchMore(){
                if(this.address){
                    this.updateStrategy();
                    document.documentElement.scrollTop=380;
                }
            },
            /*翻页*/
            gotoNextpage(current){
                this.current = current;
                document.documentElement.scrollTop=380;
                this.updateStrategy();
            },
            /*更新攻略数据*/
            updateStrategy(){
                var num = this.current-1;
                var param={};
                if(this.address){
                    param = {address:this.address,pageNum:num};
                }else{
                    param = {pageNum:num};
                }
                this.$https.post('/strategy/getByAdd',param).then( res =>{
                    if(res.body.success){
                        this.totalNum = res.body.number;
                       this.strategyDate = res.body.strategyList;
                    }else{
                        this.$message.error(res.body.rspDesc);
                    }
                })
            },
        },
        created(){
            this.updateStrategy();

        }
    }
</script>

<style scoped lang="scss">
    .centerContent{
        width: 80%;
        margin: 0 auto;
        padding: 20px;
    }
    .main{
        width: 100%;
        color: #666;
        .TopNav{
            display: flex;
            width: 100%;
            /*左边部分-------------*/
            .navMenu{
                flex: 3;
                .menuBox{
                    margin-top: 15px;
                    width: 250px;
                    border: 1px solid #e8e8e8;
                    list-style: none;
                    padding: 0;
                    li{
                        border-bottom: 1px solid #e8e8e8;
                        padding: 0 15px;
                        height: 40px;
                        line-height: 40px;
                        position: relative;
                        color: #666;
                        &:last-of-type{
                            border: none;
                        }
                        .icon{
                            position: absolute;
                            right: 10px;
                            top: 10px;
                            color: #cdcdcd;
                        }
                        &:hover{
                            color: #4b61c1;
                            .icon{
                                color:  #4b61c1;
                            }
                        }
                    }
                }
                .menuContent ,.menuContent1{
                    position: absolute;
                    left: 398px;
                    top: 101px;
                    background-color: #fff;
                    z-index: 2;
                    border: 1px solid #e8e8e8;
                    list-style: none;
                    padding:5px 70px 30px 20px;
                }
                .menuContent{
                    li{
                        height: 32px;
                        line-height: 32px;
                        em{
                            margin-right: 10px;
                            font-size: 20px;
                            font-weight: 600;
                            padding-right: 2px;
                            color: #aaa;
                        }
                        .address{
                            color: #666;
                            padding-right: 25px;
                            cursor: pointer;
                        }
                        .desc{
                            color: #999;
                            font-size: 11px;
                        }
                        &:hover{
                            .address{
                                color: #4b61c1;
                                text-decoration: underline;
                            }
                        }
                    }
                    li:nth-of-type(-n+3){
                        em{
                            color: #4b61c1;
                        }
                        .address{
                            color: #4b61c1;
                        }
                    }
                }
                .menuContent1{
                    width:  450px;
                    padding-right: 40px;
                    li{
                        display: flex;
                        .topic{
                            flex: 1;
                            width: 60px;
                            height: 30px;
                            margin: 5px;
                            line-height: 30px;
                            float: left;
                            color: #666;
                            font-size: 12px;
                            font-weight: bold;
                        }
                        .country{
                            flex: 6;
                            display: flex;
                            flex-wrap: wrap;
                            word-wrap: break-spaces;
                            span{
                                padding-right: 20px;
                                color: #999;
                                font-size: 12px;
                                line-height: 30px;
                                cursor: pointer;
                                &:hover{
                                    text-decoration: underline;
                                    color: #4b61c1;
                                }
                            }
                        }
                    }
                }
                .search{
                    position: relative;
                    margin-top: 24px;
                    input{
                        width: 250px;
                        height: 36px;
                        outline: none;
                        border: 2px solid #4b61c1;
                        padding-left: 35px;
                    }
                    .searchIcon{
                        position: absolute;
                        left: 4px;
                        top: 4px;
                        color: #4b61c1;
                        font-size: 28px;
                        cursor: pointer;
                    }

                }
            }
            /*右边---------*/
            .rightPart{
                flex: 7;
                width: 300px;
                .ant-carousel {
                    .slick-slide {
                        text-align: center;
                        height: 160px;
                        line-height: 160px;
                        background: #364d79;
                        overflow: hidden;
                    }
                    .custom-slick-arrow {
                        width: 25px;
                        height: 25px;
                        font-size: 25px;
                        color: #fff;
                        background-color: rgba(31, 45, 61, 0.11);
                        opacity: 0.3;
                    }
                    .custom-slick-arrow:before {
                        display: none;
                    }
                    .custom-slick-arrow:hover {
                        opacity: 0.5;
                    }
                    .slick-slide img {
                        width: 100%;
                    }
                }
            }

        }
        .btn{
            position: absolute;
            left: 155px;
            top: 358px;
            .person , .write{
                background-color: #6276d0;
                color: #fff;
                display: inline-block;
                margin-right: 20px;
                width: 110px;
                height: 37px;
                line-height: 37px;
                text-align: center;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background-color: #4158bc;
                }
                .icon{
                    padding-right: 4px;
                }
            }
        }
        .recomendStrategy{
            display: flex;
            margin: 10px 0 20px 0;
            h3{
                border-bottom: 1px solid #e8e8e8 ;
                padding-bottom: 5px;
            }
            .ranking{
                flex: 1;
                margin-right: 30px;
                .rankCont{
                    list-style: none;
                    padding-left: 10px ;
                    li{
                        font-size: 14px;
                        color: #000;
                        line-height: 40px;
                        border-bottom: 1px dashed #e8e8e8;
                        .number{
                            color: #ff9d00;
                            font-size: 20px;
                            padding-right: 20px;
                        }
                        span:last-of-type{
                            cursor: pointer;
                        }
                        &:hover{
                            span:last-of-type{
                                color: #ff9d00;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
            .strategy{
                flex: 6;
                .mainCont{
                    padding: 20px;
                    list-style-type: none;
                    li{
                        padding:5px 0 30px 0 ;
                        border-bottom: 1px solid #e8e8e8;
                        position: relative;
                    }
                    .item{
                        padding: 40px 10px 20px 10px;
                        cursor: pointer;
                        .title{
                            display: block;
                            margin-bottom: 20px;
                            font-size: 20px;
                            color: #000;
                        }
                        .detail{
                            display: flex;
                            .picture{
                                flex: 1;
                                margin-right: 20px;
                                img{
                                    width: 100%;
                                    height: 110px;
                                }
                            }
                            .desc{
                                flex: 3;
                                height: 100px;
                                word-wrap: break-word;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                display:-webkit-box;
                                -webkit-box-orient:vertical;
                                -webkit-line-clamp:4;
                                padding-top: 13px;
                            }
                        }
                        /*个人信息*/
                        .information{
                            position: absolute;
                            left: 11px;
                            top: 13px;
                            font-size: 12px;
                            line-height: 20px;
                            .head{
                                width: 17px;
                                border-radius: 50%;
                                margin-right: 7px;
                            }
                            .name{
                                color: #ff9d00;
                                cursor: pointer;
                                &:hover{
                                    text-decoration: underline;
                                }
                            }
                        }
                        /*点赞*/
                        .support{
                            position: absolute;
                            top: 20px;
                            right: 10px;
                            font-size: 12px;
                            border: 1px solid #ff9d00;
                            padding: 5px 7px;
                            border-radius: 15px;
                        }
                        &:hover{
                            background-color: #f8f8f8;
                            .title{
                                color: #ff9d00;
                            }
                        }
                    }
                }

            }

        }
    }

</style>