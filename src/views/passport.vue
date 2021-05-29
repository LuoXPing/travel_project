<template>
    <div class="passport">
        <bannerMenu nowActive='2'></bannerMenu>
        <div class="banner" >
            <div class="search">
                <div class="inputBox">
                    <input type="text" placeholder="输入要办理签证地区或国家名字" v-model="address" >
                </div>
                <a-button icon="search" class="searchBtn" @click="searchMore"></a-button>
                <div class="example">
                    <span v-for="(item,index) in tipCountry" :key="index"
                          @click="address=item">{{item}}</span>
                </div>
            </div>
        </div>
        <div class="center">
            <!--推荐地点-->
            <div class="recommend">
                <h3>推荐地点</h3>
                <ul>
                    <li @click="gotoDetail('日本')"><img src="../assets/passport-japan.jpeg" alt="">
                        <div class="country">
                            <span class="name">日本</span>
                            <span class="power">上海送签</span>
                        </div>
                        <div class="desc">
                            <span class="name">日本</span>
                            <div class="price">
                                <span  class="num">￥228</span>
                                <span>起</span>
                            </div>
                        </div>
                    </li>
                    <li @click="gotoDetail('澳大利亚')"><img src="../assets/passport-australia.jpeg" alt="">
                        <div class="country">
                            <span class="name">澳大利亚</span>
                            <span  class="power">全国受理</span>
                        </div>
                        <div class="desc">
                            <span class="name">澳大利亚</span>
                            <div class="price">
                                <span  class="num">￥879</span>
                                <span>起</span>
                            </div>
                        </div>
                    </li>
                    <li @click="gotoDetail('新加坡')"><img src="../assets/passport-singapore.jpeg" alt="">
                        <div class="country">
                            <span class="name">新加坡</span>
                            <span class="power">全国受理</span>
                        </div>
                        <div class="desc">
                            <span class="name">新加坡</span>
                            <div class="price">
                                <span class="num">￥228</span>
                                <span>起</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--热门国家-->
            <div class="hot">
                <h2>热门国家/地区</h2>
                <ul class="countryCont">
                    <li v-for="(item,index) in passportCountry" :key="index"
                        class="item" @click="gotoDetail(item.address)">
                        <div class="pic"><img :src="item.countryPic"></div>
                        <div class="info">
                            <span class="nation">{{item.address}}</span><br/>
                            <span class="price"><em>¥{{item.price}}</em>起</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--签证问题-->
            <div class="problem">
                <a-icon type="question-circle" class="icon" />
                <h3>签证问题</h3>
                <div class="item">
                    <span class="question">Q: 什么是签证</span>
                    A: 签证是一个主权国家发给申请出入该国的外国公民或本国公民的出入境许可证明，即在申请出入境人员持有的护照或其他有效的旅行证件上签注盖印，以示准许其出入境或经过该国国境。签证通常由前往国的驻外领使馆签发。
                </div>
                <div class="item">
                    <span class="question"> Q: 签证是否能保证通过呢</span>
                    A: 所有的签证都不能保证通过，都是根据客人自己提供的材料由使馆去决定是否可以获得签证的。
                </div>
                <div class="item">
                    <span class="question"> Q: 怎样才能提高出签率</span>
                    A: 申请签证之前一定要准备好详细真实的签证材料，另外，最好详细叙述你的出行目的及行程安排，以便提高获签率，顺利拿到签证。
                </div>
            </div>

        </div>
        <div class="processBox">
            <div class="center">
                <!--签证流程-->
                <div class="process">
                    <span class="title">办理流程</span>
                    <ul>
                        <li class="item">
                            <span class="iconfont icon-computer"></span><br/>
                            <span class="methods">1.选择签证</span>
                        </li>
                        <li class="item">
                            <span class="iconfont icon-confirm"></span><br/>
                            <span class="methods">2.确认订单</span>
                        </li>
                        <li class="item">
                            <span class="iconfont icon-payment"></span><br/>
                            <span class="methods">3.支付费用</span>
                        </li>
                        <li class="item">
                            <span class="iconfont icon-mail"></span><br/>
                            <span class="methods">4.坐等商家邮件</span>
                        </li>
                        <li class="item">
                            <span class="iconfont icon-building"></span><br/>
                            <span class="methods">5.递交材料</span>
                        </li>
                        <li class="item">
                            <span class="iconfont icon-passport"></span><br/>
                            <span class="methods">6.出签领取</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <travelFoot></travelFoot>

    </div>
</template>

<script>
    import bannerMenu from '../components/bannerMenu';
    import travelFoot from '../components/travelFoot';

    export default {
        name: "passport",
        components:{
            bannerMenu,
            travelFoot
        },
        data(){
            return{
                address:'',
                tipCountry:['日本','澳大利亚','美国','新加坡'],
                passportCountry:[]
            }
        },
        methods:{
            /*跳转到详情页面*/
            gotoDetail(address){
                this.$router.push({
                    path:'/passportDetail',
                    query:{address:address}
                })
            },
            /*功能：搜索更多的内容*/
            searchMore(){
                if(this.address){
                    this.$router.push({
                        path:'/passportDetail',
                        query:{address:this.address}
                    })
                }else{
                    this.$message.error('请输入目的地');
                }
            },
            /*功能：更新数据*/
            initData(){
                this.$https.get('passport/getRecom').then( res =>{
                    if(res.body.success){
                        this.passportCountry = res.body.passportList;
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
    .passport{
        width: 100%;
        .banner{
            width: 100%;
            height: 240px;
            background: url("../assets/passport-banner.jpg");
            position: relative;
            /*搜索框*/
            .search{
                width: 500px;
                height:90px;
                position: absolute;
                left: 50%;
                top: 30%;
                transform: translateX(-50%);
                background-color: rgba(0,0,0,.4);
                border-radius: 6px;
                padding: 15px;
                color: #fff;
                .inputBox{
                    float: left;
                }
                input{
                    color: #000;
                    width: 425px;
                    height: 36px;
                    border: none;
                    border-radius: 5px;
                    padding-left: 10px;
                    padding-top: 0;
                    &:focus{
                        outline: none;
                    }
                }
                .searchBtn{
                    width: 40px;
                    height: 36px;
                    background-color: #4b61c1;
                    margin-left: 5px;
                    border: none;
                    font-size: 20px;
                    color: #fff;
                }
                .example{
                    color: #fff;
                    font-size: 12px;
                    margin-top: 9px;
                    span{
                        padding-right: 10px;
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }

        }
        .center{
            width: 80%;
            margin: 0 auto;
        }
        .recommend{
            padding: 30px 0 10px 0;
            h3{
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
            }
            ul{
                width: 100%;
                display: flex;
                list-style-type: none;
                padding: 10px 0;
                li{
                    flex: 1;
                    border: 1px solid #eee;
                    margin-right: 20px;
                    position: relative;
                    cursor: pointer;
                    &:last-of-type{
                        margin-right: 0;
                    }
                    img{
                        width: 100%;
                    }
                    .desc{
                        height: 45px;
                        line-height: 45px;
                        padding: 0 10px;
                        .name{
                            color: #000;
                            font-size: 20px;
                        }
                        .price{
                            float: right;
                            span{
                                font-size: 14px;
                            }
                            .num{
                                color: #ff9d00;
                                font-size: 20px;
                            }
                        }
                    }
                    .country{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 183px;
                        background-color: rgba(0,0,0,0.1);
                        font-size: 24px;
                        color: #fff;
                        text-align: center;
                        padding: 30px;
                        span{
                            display: block;
                            margin-top: 10px;
                        }
                        .name:after{
                            content: '';
                            width: 100px;
                            height: 3px;
                            background-color: #fff;
                            position: absolute;
                            left: 111px;
                            top: 84px;
                        }
                        .power:after,.power:before{
                            content: '';
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: #fff;
                            position: absolute;
                            top: 83px;
                        }
                        .power:before{
                            left: 93px;
                        }
                        .power:after{
                            left: 229px;
                        }
                    }
                    &:hover{
                        background-color: #f5f5f5;
                    }
                }
            }
        }
        .problem{
            border: 1px solid #ddd;
            padding: 20px 40px 20px 70px;
            position: relative;
            .icon{
                position: absolute;
                left: 15px;
                top: 15px;
                font-size: 40px;
                color: #ffae2c;
            }
            .item{
                margin-bottom: 20px;
            }
            .question{
                display: block;
                margin-bottom: 5px;
            }
        }
        .processBox{
            background-color: #f5f5f5;
            margin-top: 30px;
            padding: 30px 0;
            border-top: 1px solid #ccc;
            .title{
                font-size: 22px;
                display: block;
                padding-bottom: 10px;
                border-bottom: 1px solid #ececec;
            }
            ul{
                list-style: none;
                display: flex;
                padding-left: 0;
                padding-top: 20px;
                li{
                    flex: 1;
                    margin-right: 20px;
                    text-align: center;
                    &:last-of-type{
                        margin-right: 0;
                    }
                    .iconfont{
                        font-size: 40px;
                        color: #999;
                    }
                    .methods{
                        color: #666;
                    }
                }
            }

        }
        .hot{
            .countryCont{
                width: 100%;
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                padding-left: 0;
                li{
                    width: 23.5%;
                    margin-right: 20px;
                    margin-bottom: 40px;
                    display: flex;
                    cursor: pointer;
                    &:nth-of-type(4n){
                        margin-right: 0;
                    }
                    .pic{
                        flex: 1.2;
                        padding: 8px;
                        img{
                            width: 98%;
                        }
                    }
                    .info{
                            flex: 1;
                            padding-top: 13px;
                            .nation{
                                color: #000;
                                font-size: 16px;
                                padding-left: 15px;
                                display: inline-block;
                                margin-bottom: 5px;
                            }
                            .price{
                                color: #959595;
                                padding-left: 15px;
                                em{
                                    color: #ff9d00;
                                    font-size: 20px;
                                }
                            }
                        }

                    &:hover{
                        background-color: #f5f5f5;
                        .info{
                            .nation{
                                color: #ff9d00;
                            }

                        }

                    }

                }
            }

        }
    }


</style>