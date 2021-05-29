<template>
    <div class="free-detail">
        <bannerMenu nowActive='0' v-show="from!='index'"></bannerMenu>
        <div class="DetailContent">
            <div class="firstPart">
                <div class="pic">
                    <img :src="pageData.desPic1" alt="">
                </div>
                <div class="desc">
                    <h3>{{pageData.mainTitle}}</h3>
                    <div class="price">
                        ￥<span class="num">{{pageData.price}}</span>
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
                    <a href="#product">产品介绍</a>
                </li>
                <li :class="{item:true,active:subheading==2}" @click="subheading=2">
                    <a href="#description">费用说明</a>
                </li>
                <li :class="{item:true,active:subheading==3}" @click="subheading=3">
                    <a href="#introduction">购买须知</a>
                </li>
            </ul>
            <div class="product" id="product">
                <h2 class="title">产品介绍</h2>
                <div class="picture">
                    <img :src="pageData.proPic1" alt="">
                    <img :src="pageData.proPic2" alt="" v-show="pageData.proPic2">
                </div>
                <div class="hotel">
                    <h3 class="title">酒店信息</h3>
                    <ul>
                        <li>
                            <div class="picture">
                                <img :src="pageData.hotelPic" alt="">
                            </div>
                            <div class="describe">
                                <h3>{{pageData.hotelName}}</h3>
                                <p>{{pageData.hotelDes}}</p>
                                <span class="iconfont icon-location"></span>
                                <span>{{pageData.hotelLocate}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="tip">以上酒店仅供参考，如遇出行高峰碰上酒店无空房情况，供应商会安排转至同级酒店。</div>
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
    import smallFoot from '../components/smallFoot';
    export default {
        name: "free-detail",
        components:{
            bannerMenu,Description,smallFoot
        },
        data(){
            return{
                pageData:{},//页面数据
                showHotline:false,
                subheading:1,/*副标题导航显示第几个*/
                isfixed:false,//副标题导航是否固定
                from:'',//哪个页面跳转过来的，index为首页跳转
                token:'',//是否登录的标志
                account:'',//用户的账号
                id:'',//商品的id

            }
        },
        methods:{
            /*滚动事件监听*/
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
                            var param = {userAccount:_this.account,token:_this.token,des:_this.pageData.mainTitle,
                                price:_this.pageData.price,picture:_this.pageData.desPic1,date:_this.pageData.deptime};
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
            initData(){
                this.$https.post('/selfguid/getDetail',{id:this.id}).then( res =>{
                    if(res.body.success){
                        this.pageData = res.body.selfGuid;
                    }
                })
            }
        },
        created(){
            this.from = this.$route.query.from;
            this.id = this.$route.query.id;
            this.token =this.$store.state.token;
            this.account =this.$store.state.account;
            this.initData();
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
        /*导航栏*/
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
        /*服务电话*/
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
        /*产品介绍*/
        .product{
            width: 80%;
            .picture{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            .hotel{
                padding-left: 20px;
                ul{
                    list-style: none;
                    padding-left: 10px;
                    li{
                        margin: 20px 0;
                        display: flex;
                        .picture{
                            flex: 1;
                            margin-right: 10px;
                            img{
                                width: 100%;
                            }
                        }
                        .describe{
                            flex: 3.5;
                            h3{
                                font-weight: bold;
                            }
                            p{
                                font-size: 12px;
                                color: #666;
                                padding: 0 10px;
                            }
                            span{
                                font-size: 12px;
                                padding-left: 10px;
                            }
                        }
                    }
                }
                .tip{
                    color: #666;
                    font-size: 12px;
                    background-color: #fff6e5;
                    padding: 2px 5px;
                }
            }
        }
    }
</style>