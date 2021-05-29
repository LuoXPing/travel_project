<template>
    <div class="scenicDetail">
        <bannerMenu nowActive='0'></bannerMenu>
        <div class="DetailContent">
            <!--第一部分，产品描述-->
            <div class="firstPart">
                <div class="pic">
                    <img :src="scenicData.mainPic" alt="">
                </div>
                <div class="desc">
                    <h2>{{scenicData.mainTitle}}</h2>
                    <div class="advertise">
                        <span>{{scenicData.mainTitle}}</span>
                        <span>仅当日有效</span>
                        <span>成人票</span>
                    </div>
                    <div class="price">
                        ￥<span class="num">{{scenicData.price}}</span>
                    </div>
                    <div class="notice">
                        <span class="tit">预订须知</span>
                        <span class="">本商品支付完成即可顺利出行，无需等待确认</span>
                    </div>
                    <div style="padding-left: 15px;">目的地：{{scenicData.province}}</div>
                    <div class="buyBtn" @click="buyProduct">立即购买</div>
                </div>
            </div>
            <!--详细内容导航栏-->
            <ul :class="{navicate:true,navfix:isfixed}">
                <li :class="{item:true,active:subheading==1}" @click="subheading=1">
                    <a href="#productDes">产品介绍</a>
                </li>
                <li :class="{item:true,active:subheading==2}" @click="subheading=2">
                    <a href="#costIllus">费用说明</a>
                </li>
                <li :class="{item:true,active:subheading==3}" @click="subheading=3">
                    <a href="#useIllus">使用说明</a>
                </li>
                <li :class="{item:true,active:subheading==4}" @click="subheading=4">
                    <a href="#buyTip">购买须知</a>
                </li>
            </ul>
            <!--产品介绍-->
            <div class="productDes" id="productDes">
                <h2 class="title">产品介绍</h2>
                <div>
                   {{scenicData.desWord}}
                    <div class="pic">
                        <img :src="scenicData.desPic" alt="">
                    </div>
                </div>
            </div>
            <!--费用说明-->
            <div class="costIllus" id="costIllus">
                <h2 class="title">费用说明</h2>
                <div class="contain">
                    <span class="subheading">费用包含</span>
                    <p>园区大门票；</p>
                </div>
                <div class="unContain">
                    <span class="subheading">费用不含</span>
                    <p>1. 园区内其他票券；</p>
                    <p>2. 一切个人消费及费用包含中未提及的任何费用。</p>
                </div>
                <div class="especial">
                    <span class="subheading">特别说明</span>
                    <p><b>【优惠政策】</b><br/>
                        1、60岁以上老人免票。<br/>2、现役军官和士兵免票。<br/>
                        3、1.4米以下小孩免票。<br/>4、在读学生凭学生证半价。<br/>
                        以上优惠需到景区现场购买。<br/>
                    </p>
                </div>
            </div>
            <!--使用说明-->
            <div class="useIllus" id="useIllus">
                <h2 class="title">使用说明</h2>
                <div class="useMode">
                    <span class="subheading">使用方式</span>
                    <p>【验票时间】8：00~19：00<br/>【预定提前】下单需提前2小时<br/>
                        【换票地点】园博广场的团队售票窗口<br/>
                        【入园凭证】凭6位数短信验证码至景区验票入园
                    </p>
                </div>
                <div class="assembPlace">
                    <span class="subheading">集合时间与地点</span>
                    <p>营业时间：8：00~19：00<br/>
                        地址：集美区杏林园博苑温泉岛园博西路89号
                    </p>
                </div>
                <div class="attention">
                    <span class="subheading">注意事项</span>
                    <p><b>【预定规则】</b>预定 2小时后生效。</p>
                </div>
            </div>
            <!--购买须知-->
            <div class="buyTip" id="buyTip">
                <h2 class="title">购买须知</h2>
                <div class="hints">
                    <span class="subheading">重要提示</span>
                    <p>
                        1. 马蜂窝尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品；<br/>
                        2. 预订订单，需要在支付时限内支付全款，超出时限的支付将被视为无效支付， 系统将在1个工作日内将款项退回原支付的账号里，购买成功会收到确认邮件及短信；<br/>
                        3. 出行前，请您确保您自身的身体状况适合参加行程。您应将自身健康情况如实告知旅行社；<br/>
                        4. 请尊重当地的饮食习惯、习俗禁忌、宗教礼仪，遵守当地法律法规等；<br/>
                        5. 为了您人身、财产的安全，请您避免在公开场合暴露贵重物品及大量现金；<br/>
                        6. 您所预订的商品可能包含高危项目（如游泳、漂流、潜水、滑雪等），参与前请根据自身条件， 并充分参考当地相关部门及其它专业机构的相关公告和建议后出行；<br/>
                        7. 建议您自己购买旅游意外保险及其他保险，可保障您在境内旅行期间自身生命、 身体、财产或者相关利益的短期旅游意外伤害保险及紧急救援保险。
                    </p>
                </div>
                <div class="serviceInformation">
                    <span class="subheading">产品服务信息</span>
                    <p>该旅游产品由 xxx电子商务有限公司 提供</p>
                </div>
            </div>
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
    import smallFoot from '../components/smallFoot'
    export default {
        name: "scenicDetail",
        components:{
            bannerMenu,smallFoot
        },
        data(){
            return{
                id:'',
                address:'',
                scenicData:{},//初始化数据
                showHotline:false,//显示热线
                subheading:1,/*副标题导航显示第几个*/
                isfixed:false,//副标题导航是否固定
                token:'',//登陆的标志
            }
        },
        methods:{
            /*功能：更新景点数据*/
            initScenicData(){
                this.$https.post('/scenic/getDetail',{id:this.id}).then( res =>{
                    if(res.body.success){
                        this.scenicData = res.body.scenic;
                    }
                })
            },
            /*功能：滚动条事件的监听*/
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
                            _this.$message.success('购买成功');
                        },
                    })
                }
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.token = this.$store.state.token;
            this.initScenicData();
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
        .subheading{
            margin: 10px 0;
            font-size: 18px;
            line-height: 24px;
            color: #333;
            position: relative;
            &:after{
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #ff9d00;
                position: absolute;
                left: -15px;
                top: 10px;
            }
        }
        /*第一部分，产品描述*/
        .firstPart{
            display: flex;
            margin-bottom: 30px;
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
                .advertise{
                    margin-bottom: 10px;
                    span{
                        display: inline-block;
                        padding: 0 8px;
                        border: 1px dashed #ff7000;
                        color: #ff7000;
                        font-size: 11px;
                        margin-right: 15px;
                    }
                }
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
        /*详细内容导航栏*/
        .navicate{
            margin: 20px 0;
            padding: 0 100px 0 0;
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
        /*售前服务电话号码*/
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
        /*费用说明----------*/
        .productDes,.costIllus,.useIllus,.buyTip{
            width: 80%;
            padding:10px;
            >div{
                padding-left: 30px;
                line-height: 30px;
                margin-bottom: 20px;
                color: #333;
            }
            .pic{
                img{
                    width: 80%;
                }
            }
            .hints{
                p{
                    font-size: 12px;
                }
            }
        }
    }
</style>