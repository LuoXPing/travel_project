<template>
    <div class="passportDetail">
        <bannerMenu nowActive='2'></bannerMenu>
        <div class="DetailContent">
            <!--第一部分，产品描述-->
            <div class="firstPart">
                <div class="pic">
                    <img :src="passportData.desPic" alt="">
                </div>
                <div class="desc">
                    <h2>{{passportData.title}}</h2>
                    <div class="advertise">
                        <span>可加急</span>
                        <span>陪签服务</span>
                        <span>简化资料</span>
                    </div>
                    <div class="price">
                        ￥<span class="num">{{passportData.price}}</span>
                    </div>
                    <div class="notice">
                        <span class="tit">预订须知</span>
                        <span class="">本商品支付完成即可顺利出行，无需等待确认</span>
                    </div>
                    <div class="buyBtn" @click="buyProduct">立即购买</div>
                </div>
            </div>
            <!--产品语言描述-->
            <div class="passportDescribe">
                <p class="item">
                    <span class="Ptitle">签证类型：</span>
                    <span class="Pcont">旅游签证</span>
                </p>
                <p class="item">
                    <span class="Ptitle">面试/录指纹：</span>
                    <span class="Pcont">录入指纹，具体以实际要求为准</span>
                </p>
                <p class="item">
                    <span class="Ptitle">订单有效期：</span>
                    <span class="Pcont">3个月</span>
                </p>
                <p class="item">
                    <span class="Ptitle">停留天数：</span>
                    <span class="Pcont">180天，具体以实际下发为准</span>
                </p>
                <p class="item">
                    <span class="Ptitle">有效期：</span>
                    <span class="Pcont">2年，具体以实际下发为准</span>
                </p>
                <p class="item">
                    <span class="Ptitle">入境次数：</span>
                    <span class="Pcont">多次，具体以实际下发为准</span>
                </p>
                <p class="item">
                    <span class="Ptitle">受理地区：</span>
                    <span class="Pcont">{{passportData.area}}</span>
                </p>
            </div>
            <!--详细内容导航栏-->
            <ul :class="{navicate:true,navfix:isfixed}">
                <li :class="{item:true,active:subheading==1}" @click="subheading=1">
                    <a href="#materials">所需材料</a>
                </li>
                <li :class="{item:true,active:subheading==2}" @click="subheading=2">
                    <a href="#process">办签流程</a>
                </li>
                <li :class="{item:true,active:subheading==3}" @click="subheading=3">
                    <a href="#illustrate">购买须知</a>
                </li>
            </ul>
            <!--所需材料-->
            <div class="materials" id="materials">
                <h2 class="title">所需材料</h2>
                <table>
                    <tr><td class="certificate">申请表<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">请完整、准确、详实填写个人申请表（出行时间真实，联系电话需保持畅通），所有表格签名页必须由本人签名。</td>
                    </tr>
                    <tr><td class="certificate">护照<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">中国大陆因私护照：⑴护照原件（有效期6个月以上；G开头的护照尾页必须有本人签字笔签字）；⑵至少有3页连续对开空白签证页；⑶必须完整无刮痕、划痕、破损或修改的痕迹。</td>
                    </tr>
                    <tr><td class="certificate">身份证<br/><span class="exhort">复印件</span></td><td>x1</td>
                        <td class="detailDes">申请人新版身份证正反面清晰的彩色电子版</td>
                    </tr>
                    <tr><td class="certificate">户口本<br/><span class="exhort">复印件</span></td><td>x1</td>
                        <td class="detailDes">户口本整本复印件；如集体户口，请提供集体户口户主首页及本人信息页复印件；如丢失，请提供开户派出所出具的户籍证明。</td>
                    </tr>
                    <tr><td class="certificate">婚姻证明<br/><span class="exhort">复印件</span></td><td>x1</td>
                        <td class="detailDes">如已婚，请提供结婚证复印件；如离异，请提供离婚证或离婚协议复印件。</td>
                    </tr>
                    <tr><td class="certificate">在职证明<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">公司在职证明中文原件1份（使用单位正规抬头纸打印，加盖单位公章，负责人手写签字，具体内容可向我社索取模板）。</td>
                    </tr>
                    <tr><td class="certificate">单位证明<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">公司营业执照副本复印件或组织机构代码证复印件，加盖公章。</td>
                    </tr>
                    <tr><td class="certificate">对账单<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">申请人工资卡或日常活期银行卡（信用卡除外）最近六个月的进出账单原件，在职人员请提供工资卡流水，退休人员请提供退休金流水，建议余额5万元以上，行程越长建议余额相对高，能支付此次旅游所用费用，如余额不足可提供多张银行卡对账单，不建议最后一笔大金额存入。 注：流水必须用A4纸打印</td>
                    </tr>
                    <tr><td class="certificate">存款证明<br/><span class="exhort">原件</span></td><td>x1</td>
                        <td class="detailDes">银行存款证明原件或存单复印件，金额不少于5万/人，建议冻结到归国后3个月。</td>
                    </tr>
                    <tr><td class="certificate">房产证<br/><span class="exhort">复印件</span></td><td>x1</td>
                        <td class="detailDes">房产证复印件</td>
                    </tr>
                    <tr><td class="certificate">车辆登记证<br/><span class="exhort">复印件</span></td><td>x1</td>
                        <td class="detailDes">机动车登记证复印件</td>
                    </tr>
                </table>
            </div>
            <!--办理流程-->
            <div class="process" id="process">
                <h2 class="title">办理流程</h2>
                <div class="pic">
                    <img src="../assets/passportDetail-process.png" alt="">
                </div>
            </div>
            <!--费用说明-->
            <div class="illustrate" id="illustrate">
                <h2 class="title">费用说明</h2>
                <div class="cancelPolicy">
                    <h3>取消政策</h3>
                    订单支付成功后，买家未办理（即资料未快递/邮件给商家），可与商家协商退款；<br/>
                    订单有效期为3个月，买家在有效期内未办理，视为自动放弃，予以退款处理，敬请谅解；<br/>
                    若商家已为您递交资料或已付费预约，已支付订单款项无法退还，敬请谅解；<br/>
                    非拒签可退款套餐，若发生拒签则已支付订单款项无法退还，敬请谅解。<br/>
                </div>
                <!--温馨提示-->
                <div class="reminder">
                    <h3 class="subheading">温馨提示</h3>
                    <p>1. 此产品只适用于中华人民共和国护照持有者。</p>
                    <p>2.  自由行尊重并保护用户隐私，用户信息只会用于协助用户预订旅游产品。</p>
                    <p>3. 关于产品：本产品为签证产品，支付成功后，供应商以邮件或是短信方式告知办理流程，请根据具体要求具体办理。</p>
                    <p>4. 关于购买：预订订单，需要在支付时限内支付全款，超出时限的支付将被视为无效支付， 需要联系商家退回款项。 支付成功以收到邮件及短信为准，售完即止。</p>
                    <p>5. 关于使用：每张优惠券只能使用一次，每个订单限用一张。优惠券不能兑换为现金，不设找零。</p>
                    <p>6. 若因相关办理部门（包括并不限于使馆、政府部门、签证中心、保险公司等）对签证整体费用政策性调整， 差额需由客人自行承担，敬请谅解</p>
                    <div class="tipPart">
                        <p class="tip">【温馨提示】</p>
                        <p>1.所有工作日均为从材料到齐后的第二个工作日开始计算。请注意，加急签证预约签证为1个工作日内为客人成功预约好录取指纹时间，但可最早预约到的时间以使馆系统为主，提供的办理时长仅供参考。</p>
                        <p>2.受理范围：<br/>
                            沈阳领区：常住地、工作地为黑吉辽地区的申请人； 由于体检原因，不接受75周岁及以上者的预订； 不接受拥有仍在有效期内的APEC卡的持有者预订；</p>
                        <p>3.从收到材料起，在受理签证申请期间，我公司可能会根据您的材料情况要求补充相关材料、担保金或予以劝退；领馆也可能会针对您的实际情况，要求补充相关材料，并且领馆有权利延长申请者签证受理时间（此种情况由领馆决定，我公司无权干预）。领馆也可能因其内部原因延迟出签，本网相关的受理时间仅为参考时间，并非法定完全承诺。</p>
                        <p>4.签证申请所需材料，是我方依据使馆官方申请材料清单，要求申请者提供，并不能作为获得签证的保证项目，最终签证结果将由申请国领馆决定。
                            自2015年10月12日起，申请申根国签证需要申请者本人前往使馆或签证中心递交材料并录入指纹。指纹信息保存59个月。</p>
                        <p>5.在您取得目的地签证前，不建议您提前购买机票和预定酒店，以免因签证问题产生不必要的费用损失，损失将由您自行承担；如果您在送签时提供了机票、酒店等订单，请勿在下签之前取消预订，否则可能对签证结果产生不可估量的影响。</p>
                        <p>6.由于春节期间处于出行高峰，各国使馆受理的签证量激增，已陆续延期出签的情况，请您尽早准备签证材料，我社强烈建议您不要在出签之前购买机票、酒店等产品，以免因使馆延期出签造成不必要的损失，感谢您的理解与配合</p>
                    </div>
                </div>
                <!--重要提示-->
                <div class="hintsPart">
                    <h3 class="subheading">重要提示</h3>
                    <p>1. 尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品。</p>
                    <p>2. 若相关办理部门（包括并不限于使馆、政府部门、签证中心、保险公司等）有政策性费用调整，差额需由客人自行承担，敬请谅解。</p>
                </div>
                <div class="hintsPart">
                    <h3 class="subheading">产品服务信息</h3>
                    <p>该旅游产品由 xxxx国际旅行社有限公司 提供 </p>
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
        name: "passport-detail",
        components:{
            bannerMenu,smallFoot
        },
        data(){
            return{
                address:'',
                passportData:'',//页面数据
                showHotline:false,
                subheading:1,/*副标题导航显示第几个*/
                isfixed:false,//副标题导航是否固定
                token:'',//登陆的标志
                account:'',
            }
        },
        methods:{
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
                            var param = {userAccount:_this.account,token:_this.token,des:_this.passportData.title,
                                price:_this.passportData.price,picture:_this.passportData.desPic,date:''};
                            _this.$https.post('order/add',param).then( res =>{
                                if(res.body.success){
                                    _this.$message.success(res.body.rspDesc);
                                }
                            })
                        },
                    })
                }
            },
            /*功能：更新数据*/
            initData(){
                this.$https.post('/passport/getDetail',{address:this.address}).then( res =>{
                    if(res.body.success){
                       this.passportData = res.body.passport;
                    }else{
                        var _this =this;
                        this.$info({
                            title: res.body.rspDesc,
                            onOk() {_this.$router.go(-1);},
                        });
                    }
                })
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
            this.address = this.$route.query.address;
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
        /*产品语言描述*/
        .passportDescribe{
            display: flex;
            flex-wrap: wrap;
            margin: 20px 5px;
            .item{
                width: 40%;
                display: flex;
                font-size: 14px;
                .Ptitle{
                    flex: 1;
                    color: #999;
                }
                .Pcont{
                    flex: 3;
                    color: #333;
                }
                &:nth-of-type(2n+1){
                    width: 55%;
                    margin-right: 40px;
                    .Pcont{
                        flex: 4;
                    }
                }
            }
        }
        /*详细内容导航栏*/
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
        /*所需材料---------*/
        .materials{
            width: 80%;
            padding:0 10px 20px 10px;
            table{
                border: 1px solid rgba(227,229,232,1);
                tr{
                    td{
                        border: 1px solid rgba(227,229,232,1);
                        padding: 15px;
                        font-size: 14px;
                        color: #666;

                    }
                    .certificate{
                        width: 15%;
                        text-align: center;
                        .exhort{
                            display: inline-block;
                            height: 16px;
                            line-height: 16px;
                            padding: 0 4px;
                            font-size: 10px;
                            border-radius: 2px;
                            background-color: rgba(255,231,229,1);
                            color: rgba(255,91,77,1);
                        }
                    }
                    td:nth-of-type(2){
                        width: 15%;
                        text-align: center;
                    }
                    .detailDes{
                        padding: 10px 20px;
                        line-height: 25px;
                        font-size: 13px;
                        color: #333;
                    }
                }
            }
        }
        /*办理流程--------*/
        .process{
            .pic{
                padding: 40px 20px;
            }
        }
        /*费用说明----------*/
        .illustrate{
            width: 80%;
            padding: 20px 10px;
            .cancelPolicy{
                width: 90%;
                padding: 10px 20px;
                background-color: #fff8b7;
                border: 1px solid #e0e0e0;
                line-height: 24px;
                margin-bottom: 10px;
                font-size: 13px;
                color: #000;
            }
            .reminder{
                padding: 10px 25px;
                font-size: 14px;
                color: #333;
                p{
                    padding-left: 10px;
                    line-height: 1.8;
                }
                .tipPart{
                    padding-left: 5px;
                    font-size: 13px;
                    color: #000;
                    .tip{
                        color: #ff0000;
                        font-weight: bold;
                        padding-left: 10px;
                    }
                }

            }
            .hintsPart{
                padding: 10px 25px;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                p{
                    padding-left: 10px;
                }
            }
        }
    }
    .withoutCont{
        min-height: 536px;
        width: 100%;

        .ContCenter{
            width: 60%;
            margin: 0 auto;
        }
        .search{
            padding: 20px 150px;
            background-color: #fafafa;
            border-bottom: 1px solid #ddd;
            .input{
                width: 400px;
                margin-right: 10px;
            }
            .searchBtn{
                background-color: #4b61c1;
                color: #fff;
            }
            .example{
                margin:10px;
                font-size: 12px;
                span{
                    padding-right: 10px;
                }
            }
        }
        .tip{
            text-align: center;
            margin: 100px auto;
            .word{
                font-size: 20px;
                margin-top: 20px;
                color: #999;
            }
        }

    }
</style>