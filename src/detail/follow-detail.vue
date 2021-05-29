<template>
    <div class="follow-detail">
        <bannerMenu nowActive='1'></bannerMenu>
        <div class="DetailContent">
            <div class="firstPart">
                <div class="pic">
                    <img :src="pageData.desPic" alt="">
                </div>
                <div class="desc">
                    <h3>{{pageData.mainTitle}}</h3>
                    <div class="price">
                        ￥<span class="num">{{pageData.price}}</span>
                        <span class="date" v-if="pageData.date">出发日期：{{pageData.date}}</span>
                    </div>
                    <div class="notice">
                        <span class="tit">预订须知</span>
                        <span class="">本商品支付完成即可顺利出行，无需等待确认</span>
                    </div>
                    <div class="address">
                        <span>出发地：</span><span class="addName">{{pageData.startAdd}}</span>
                    </div>
                    <div class="buyBtn" @click="buyProduct">立即购买</div>
                </div>
            </div>
            <!--导航栏-->
            <ul :class="{navicate:true,navfix:isfixed}">
                <li :class="{item:true,active:subheading==1}" @click="subheading=1">
                    <a href="#route">行程路线</a>
                </li>
                <li :class="{item:true,active:subheading==2}" @click="subheading=2">
                    <a href="#description">费用说明</a>
                </li>
                <li :class="{item:true,active:subheading==3}" @click="subheading=3">
                    <a href="#introduction">购买须知</a>
                </li>
            </ul>
            <!--行程路线-->
            <div class="route" id="route">
                <span class="maintitle">【邂逅江户情】日本6日游 </span>
                <h2 class="title">行程路线</h2>
                <div class="route-content" v-for="(item,index) in routeData"
                     :key="index">
                    <div class="catalog">{{item.day}}</div>
                    <div class="rightContent">
                        <h2>{{item.address}}</h2>
                        <div class="contBox">
                            <span class="iconfont icon-home-hotel"></span>
                            <span class="hotel">{{item.hotel}}</span><br/>
                            <span class="iconfont icon-tableware"></span>
                            <span class="meals">{{item.meals}}</span>
                        </div>
                        <div  v-for="(con,i) in item.scenic" :key="i" class="senicBox">
                            <span class="iconfont icon-free-china"></span>
                            <span class="name">{{con.province}}</span>
                            <p class="des">{{con.desWord}}</p>
                            <img :src="con.mainPic" alt="">
                        </div>
                    </div>

                </div>
            </div>
            <!--费用说明-->
            <Description></Description>
            <!--售前电话-->
            <div class="service" v-show="showHotline">
                <span class="iconfont icon-ticket-phone"></span>
                <div class="right">
                    <h4>售前电话</h4>
                    <span class="num">00064242349转4456</span>
                    <span class="time">周一至周日 08:00-23:00</span>
                </div>
            </div>
        </div>
        <!--底部-->
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import bannerMenu from '../components/bannerMenu';
    import Description from '../components/description';
    import smallFoot from '../components/smallFoot'
    export default {
        name: "follow-detail",
        components:{
            bannerMenu,Description,smallFoot
        },
        data(){
            return{
                id:'',
                pageData:{},
                routeData:[],
                scenicList:[],
                showHotline:false,
                subheading:1,/*副标题导航显示第几个*/
                isfixed:false,//副标题导航是否固定
                token:'',//登陆的标志
                account:''
            }
        },
        methods:{
            handleScroll() {
                if(document.documentElement.scrollTop>400){
                    this.showHotline=true;
                    this.isfixed = true;
                }else{
                    this.showHotline=false;
                    this.isfixed = false;
                }
            },
            /*功能：点击购买*/
            buyProduct(){
                var _this= this;
                if (!this.token){
                    this.$message.warning('请先进行登录');
                }else{
                    this.$confirm({
                        title: '是否确认购买该物品',
                        okText:'确认',
                        cancelText:'取消',
                        onOk() {
                            var pageData = _this.pageData;
                            var param = {userAccount:_this.account,token:_this.token,des:pageData.mainTitle,
                                price:pageData.price,picture:pageData.desPic,date:pageData.date};
                            _this.$https.post('order/add',param).then( res =>{
                                if(res.body.success){
                                    setTimeout(()=>{
                                        _this.$message.success(res.body.rspDesc);
                                    }, 500);
                                }
                            })
                        },
                    })
                }
            },
           /*功能：更新数据*/
            updatePageData(){
                this.$https.post('follow/getDetail',{id:this.id}).then( res =>{
                   var follow = res.body.follow;
                   this.pageData = follow;
                    var item1 = {day:'Day1',address:follow.address1,hotel:follow.hotel1,meals:follow.meal1};
                    this.routeData.push(item1);
                    this.$https.post('/scenic/getList',{address:follow.arriveAdd}).then(cont=>{
                         this.scenicList = cont.body.scenicList;
                         if(follow.address2){
                            var item2 = {day:'Day2',address:follow.address2,hotel:follow.hotel2,meals:follow.meal2};
                             item2.scenic =[];
                            if(this.scenicList.length>=1){
                                item2.scenic.push(this.scenicList[0]);
                            }
                             if(this.scenicList.length>=2){
                                 item2.scenic.push(this.scenicList[1]);
                             }
                            this.routeData.push(item2)
                        }
                        if(follow.address3){
                            var item3 = {day:'Day3',address:follow.address3,hotel:follow.hotel3,meals:follow.meal3};
                            item3.scenic =[];
                            if(this.scenicList.length>=3){
                                item3.scenic.push(this.scenicList[3]);
                            }
                            this.routeData.push(item3)
                        }
                        if(follow.address4){
                            var item4 = {day:'Day4',address:follow.address4,hotel:follow.hotel4,meals:follow.meal4};
                            item4.scenic =[];
                            if(this.scenicList.length>=4){
                                item4.scenic.push( this.scenicList[3] );
                            }
                            if(this.scenicList.length>=5){
                                item4.scenic.push( this.scenicList[4] );
                            }
                            this.routeData.push(item4)
                        }
                        if(follow.address5){
                            var item5 = {day:'Day5',address:follow.address5,hotel:follow.hotel5,meals:follow.meal5};
                            this.routeData.push(item5)
                        }
                    })
                })
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
            this.id = this.$route.query.id;
            this.updatePageData();
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
    .DetailContent{
        width: 70%;
        margin: 20px auto;
        /*标题格式*/
        .title{
            margin: 15px 0;
            position: relative;
            padding-left: 20px;
            &:after{
                content: '';
                display: block;
                width: 5px;
                height: 20px;
                background-color: #ff9d00;
                border-radius: 3px;
                position: absolute;
                left: 0;
                top: 6px;
            }
        }
        .firstPart{
            display: flex;
            .pic{
                flex: 1;
                img{
                    width: 440px;
                    height: 260px;
                }
            }
            .desc{
                flex: 1;
                padding-left: 20px;
                .price{
                    width: 100%;
                    background-color: #f6f6f6;
                    padding: 15px 20px;
                    color: #ff6f00;
                    .num{
                        color: #ff6f00;
                        font-size: 30px;
                    }
                    .date{
                        color: #777;
                        float: right;
                        margin-top: 20px;
                        font-size: 12px;
                    }
                }
                .notice{
                    color: #666;
                    margin: 10px;
                    font-size: 12px;
                    .tit{
                        color: #999;
                        padding-right: 20px;
                    }
                }
                .address{
                    padding-left: 10px;
                    .addName{
                        color: #ff8800;
                    }
                }
                .buyBtn{
                    width: 100px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background-color: #ff8800;
                    color: #fff;
                    border-radius: 3px;
                    float: right;
                    cursor: pointer;
                }
            }
        }
        .navicate{
            margin: 20px 0;
            padding: 0 200px 0 0;
            background-color: #fff;
            width: 60%;
            height: 50px;
            line-height: 50px;
            list-style: none;
            display: flex;
            text-align: center;
            border-bottom: 1px solid #ddd;
            .item{
                flex: 1;
                margin-right: 40px;
                padding-bottom: 5px;
                cursor: pointer;
                a{
                    color: #333;
                }
            }
            .active{
                border-bottom: 2px solid #ff6f00;
                font-weight: bold;
                a{
                    color: #ff6f00;
                }
            }
        }
        .navfix{
            position: fixed;
            top: 25px;
            z-index: 99;
        }
        .route{
            .maintitle{
                background-color: #ff9d00;
                color: #fff;
                display: inline-block;
                padding: 3px 10px;
                border-radius: 3px;
            }
            .route-content{
                width: 80%;
                display: flex;
                .catalog{
                    flex: 1.5;
                    margin-top: 10px;
                    padding-right: 30px;
                    border-right: 3px solid #e5e5e5;
                    text-align: right;
                    position: relative;
                    font-weight: bold;
                    color: #000;
                    font-size: 20px;
                    &:after{
                        content: '';
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        border: 3px solid #e5e5e5;
                        position: absolute;
                        right: -7px;
                        top: -13px;
                    }
                }
                .rightContent{
                    flex: 3;
                    margin-left: 30px;
                    h2{
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    /*目的地*/
                    .contBox{
                        background-color: #f6f6f6;
                        width: 300px;
                        padding: 15px 20px;
                        font-size: 14px;
                        line-height: 20px;
                        margin-bottom: 20px;
                        .iconfont{
                            padding-right: 20px;
                        }
                        .hotel,.meals{
                            font-size: 12px;
                        }
                    }
                    /*景点框*/
                    .senicBox{
                        width: 300px;
                        margin: 30px 0;
                        padding-left: 20px ;
                        .iconfont{
                            background-color: #fff;
                            position: relative;
                            left: -70px;
                            font-size: 20px;
                            padding: 10px 0 10px 10px;
                        }
                        .name{
                            color: #000;
                            font-weight: bold;
                            position: relative;
                            left: -50px;
                        }
                        img{
                            width: 200px;
                        }
                    }
                }

            }
        }
        .service{
            width: 250px;
            height: 150px;
            position: fixed;
            top: 50px;
            right: 50px;
            border: 1px solid #e2e2e2;
            padding: 20px;
            display: flex;
            .iconfont{
                flex: 1;
                font-size: 40px;
                line-height: 50px;

            }
            .right{
                flex: 3;
                .num{
                    color: #333;
                    display: block;
                    font-size: 17px;
                    margin-bottom: 10px;
                }
                .time{
                    font-size: 12px;
                }
            }
        }
    }
</style>