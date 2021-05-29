<template>
    <div class="destinationDetail">
        <div class="topTitle">
            <div class="center">
                <div class="leftPart">
                    <span class="title">{{address}}</span>
                    <span class="phonetic">{{describe.ename}}</span>
                </div>
                <div class="rightPart">
                    <span :class="{icon:true,gone:hasgone}" @click="routeAdd">
                        <span class="iconfont icon-qizi"></span>
                    </span>
                    <span class="word" >去过</span>
                </div>
            </div>
        </div>
        <div :class="{navicate:true,navfixed:showCatalog}">
            <div class="center">
                <div class="item">
                    <span class="iconfont icon-free-japan"></span>
                    <a href="#describe">城市概况</a>
                </div>
                <div class="item">
                    <span class="iconfont icon-free-china"></span>
                    <a href="#scenicRecom">景点推荐</a>
                </div>
                <div class="item">
                    <span class="iconfont icon-free-route"></span>
                    <a href="#routes">路线推荐</a>
                </div>
            </div>
        </div>
        <!--景点描述-->
        <div class="describe" id="describe">
            <div class="center">
                <h2> <span class="iconfont icon-free-japan"></span>城市概况</h2>
                <p >{{describe.cityDes}}</p>
            </div>
        </div>
        <!--top5景点推荐-->
        <div class="scenicRecom" id="scenicRecom">
            <div class="center">
                <h3><span class="iconfont icon-free-scenery"></span>必游景点TOP5</h3>
                <div class="item" v-for="(item,index) in scenicRecomd" :key="index">
                    <div class="leftPart">
                        <h4><span class="serial">{{index+1}}</span>{{item.name}}</h4>
                        <p class="mainDes">{{item.desc}}</p>
                        <p class="scenic" v-show="item.scenic"><span class="start">这里还包含景点：</span>{{item.scenic}}</p>
                    </div>
                    <div class="rightPart">
                        <img :src="item.pic" alt="">
                    </div>
                </div>
            </div>

        </div>
        <!--行程路线推荐-->
        <div class="routes" id="routes">
            <div class="center"><h2 class="title"><span class="iconfont icon-free-route"></span>行程线路推荐</h2></div>
            <div v-for="(item,index) in routesRecomd" :key="index"
                 :class="{itemCount:true,routeBack:index%2==1}">
                <div class="box">
                    <h2>{{item.title}}</h2>
                    <div class="duration">
                        <span class="iconfont icon-calendar"></span>
                        <span>游玩时间：<span class="num">{{item.duration}}</span> </span>
                    </div>|
                    <div class="date">
                        <span class="iconfont icon-home-sun"></span>
                        <span>最佳季节：<span class="num">{{item.date}}</span></span>
                    </div><br/>
                    <span><span class="proportion">{{item.proportion}}</span>人会选择这条线路</span>
                    <div class="arrange" >
                        <div v-for="(arg,i) in item.arrange" :key="i" v-show="arg">D{{i+1}}&nbsp;：{{arg}}</div>
                    </div>
                    <div class="light">
                        <h3>路线亮点</h3>
                        <div class="pic" v-for="(pic,j) in item.light" :key="j">
                            <img :src="pic.pic" alt="">
                            <div class="mask"></div>
                            <span>第{{j+1}}天<br/>{{pic.des}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--底部-->
        <travelFoot></travelFoot>
    </div>
</template>

<script>
    import travelFoot from '../components/travelFoot';
    export default {
        name: "destination-detail",
        components:{travelFoot},
        data(){
            return{
                /*搜索的地址*/
                address:'',
                token:'',
                /*去过的标志*/
                hasgone:false,
                /*当前内容数据*/
                describe:{},
                /*路线推荐*/
                routesRecomd:[],
                /*景点推荐*/
                scenicRecomd:[],
                /*导航栏是否固定*/
                showCatalog:false
            }
        },
        methods:{
            handleScroll() {
                if(document.documentElement.scrollTop>300){
                    this.showCatalog=true;
                }else{
                    this.showCatalog=false;
                }
            },
            /*功能：更新页面数据*/
            updataPage(){
                this.$https.post('/destination/getMsg',{name:this.address}).then( res =>{
                    if(res.body.success){
                        var data = res.body.des;
                        this.describe={name:data.name,ename:data.ename,cityDes:data.cityDes};
                        this.scenicRecomd = [
                            {name:data.scenicName1,pic:data.pic1,desc:data.scenicDes1,scenic:data.moreScenic1},
                            {name:data.scenicName2,pic:data.pic2,desc:data.scenicDes2,scenic:data.moreScenic2},
                            {name:data.scenicName3,pic:data.pic3,desc:data.scenicDes3,scenic:data.moreScenic3},
                            {name:data.scenicName4,pic:data.pic4,desc:data.scenicDes4,scenic:data.moreScenic4},
                            {name:data.scenicName5,pic:data.pic5,desc:data.scenicDes4,scenic:data.moreScenic5},
                            ];
                        if(data.routeName1){
                            var item = {title:data.routeName1,duration:data.playtime1,date:data.season1,proportion:data.percent1,
                                arrange:[data.dayRoute11,data.dayRoute12], light:[{pic:data.pic1,des:data.scenicName1},{pic:data.pic2,des:data.scenicName1}]};
                            this.routesRecomd.push(item);
                        }
                        if(data.routeName2){
                            var item1 = {title:data.routeName2,duration:data.playtime2,date:data.season2,proportion:data.percent2,
                                arrange:[data.dayRoute21,data.dayRoute22], light:[{pic:data.pic3,des:data.scenicName3},{pic:data.pic4,des:data.scenicName4}]}
                            this.routesRecomd.push(item1);
                        }
                        if(data.routeName3){
                            var item2 =  {title:data.routeName3,duration:data.playtime3,date:data.season3,proportion:data.percent3,
                                       arrange:[data.dayRoute31,data.dayRoute32], light:[{pic:data.pic5,des:data.scenicName5}]}
                            this.routesRecomd.push(item2);
                        }
                    }else {
                        var _this =this;
                        this.$info({
                            title: res.body.rspDesc,
                            onOk() {_this.$router.go(-1);},
                        });
                    }
                })
            },
            /*功能：点击去过，添加路径*/
            routeAdd(){
                if(this.token){
                    this.hasgone=true
                }else{
                    this.$message.error('请先登录');
                }
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.address = this.$route.query.address;
            /*初始化数据*/
            this.updataPage();
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 75%;
        margin: 0 auto;
    }
    .topTitle{
        background-color: #fafafa;
        padding: 20px;
        height: 90px;
        .leftPart{
            float: left;
            .title{
                display: block;
                font-size: 30px;
            }
            .phonetic{
                color: #999;
                font-size: 16px;
                padding-left: 5px;
            }
            &:after{
                content: '';
                display: block;
                clear: both;
            }
        }
        .rightPart{
            margin-right: 100px;
            float: right;
            height: 60px;
            position: relative;
            top: 10px;
            .icon{
                display: inline-block;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: #b6b6b6;
                text-align: center;
                cursor: pointer;
                .iconfont{
                    color: #fff;
                    line-height: 35px;
                    font-size: 20px;
                }
            }
            .gone{
                background-color: #5fc5f0;
            }
            .word{
                padding-left: 10px;
                color: #333;
            }

        }
    }
    /*导航栏*/
    .navicate{
        width: 100%;
        padding: 10px;
        background-color: #fafafa;
        border-bottom: 1px solid #e4e4e4;
        .center{
            display: flex;
        }
        .item{
            width: 130px;
            .iconfont{
                font-size: 20px;
                padding-right: 5px;
            }
            &:first-of-type{
                color: #ffb80e;
                a{
                    color: #ffb80e;
                }
            }
            &:nth-of-type(2){
                color: #786ee6;
                a{
                    color: #786ee6;
                }
            }
            &:last-of-type{
                color: #45bd9e;
                a{
                    color: #45bd9e;
                }
            }
        }
    }
    .navfixed{
        position: fixed;
        top: 45px;
        z-index: 99;
    }
    /*景点介绍*/
    .describe{
        padding: 20px;
        border-bottom: 1px solid #e4e4e4;
        h2{
            color: #ffb80e;
            .iconfont{
                padding-right: 10px;
                font-size: 20px;
            }
        }
        p{
            padding: 10px;
            line-height: 24px;
            color: #666;
        }
    }
    /*景点推荐----------*/
    .scenicRecom{
        background-color: #fafafa;
        border-bottom: 1px solid #e4e4e4;
        .center{
            padding: 20px;
        }
        h3{
            color: #786ee6;
            .iconfont{
                padding-right: 10px;
                font-size: 20px;
            }
        }
        .item{
            padding: 20px;
            border-bottom: 1px dashed #e4e4e4;
            display: flex;
            .leftPart{
                flex: 2;
                margin-right: 20px;
                h4{
                    color: #786ee6;
                    .serial{
                        display: inline-block;
                        font-size: 12px;
                        background-color: #786ee6;
                        color: #fff;
                        padding: 0 5px;
                        border-radius: 3px;
                        margin-right: 10px;
                    }
                }
                .mainDes{
                    margin: 10px 0;
                    padding: 0 10px;
                    color: #666;
                }
                .scenic{
                    line-height: 24px;
                    padding: 0 10px;
                    .start{
                        color: #999;
                    }
                }
            }
            .rightPart{
                flex: 1;
                img{
                    width: 250px;
                }
            }
            &:last-of-type{
                border-bottom: none;
            }
        }
    }
    /*路线推荐----------*/
    .routes{
        padding: 20px 0;
        .title{
            color: #45bd9e;
        }
        .icon-free-route{
            font-size: 30px;
            padding-right: 10px;
        }
        .itemCount{
            padding: 40px;
            border-bottom: 1px solid #e4e4e4;
            &:last-of-type{
                border-bottom: none;
            }
            .iconfont{
                color: #45bd9e;
            }
            .box{
                padding: 20px;
                width: 75%;
                margin: 0 auto;
                border: 1px solid #e4e4e4;
                box-shadow: 0 1px 3px rgba(0,0,0,.1);
                h2{
                    display: inline-block;
                    padding-right: 100px;
                }
                .duration,.date{
                    display: inline-block;
                    margin-left: 10px;
                    padding-right: 20px;
                    .iconfont{
                        padding-right: 10px;
                    }
                    .num{
                        color: #000;
                        font-size: 13px;
                        font-weight: 500;
                    }
                }
                .proportion{
                    display: inline-block;
                    margin-right: 5px;
                    border-radius: 3px;
                    background-color: #ff9d00;
                    color: #fff;
                    padding: 0 5px;
                    font-size: 12px;
                }
                .arrange{
                    padding: 20px 10px;
                    div{
                        margin-bottom: 10px;
                    }
                }
                .light{
                    padding: 20px 10px;
                    border-top: 1px solid #f2f2f2;
                    .pic{
                        display: inline-block;
                        width: 250px;
                        margin-right: 10px;
                        position: relative;
                        img{
                            width: 100%;
                        }
                        span{
                            position: absolute;
                            left: 20px;
                            bottom: 20px;
                            color: #fff;
                            font-size: 18px;
                        }
                        .mask{
                            width: 100%;
                            height: 100%;
                            background-color: #000;
                            opacity: .2;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                    }
                }
            }
        }
    }
    .routeBack{
        background-color: #fafafa;
    }

</style>