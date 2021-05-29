<template>
    <div class="main">
        <div class="background">
            <!--搜索框-->
            <div class="box">
                <div class="title">
                    <span :class="{active:currTitle}" @click="currTitle=true">机票</span>
                    <span :class="{active:!currTitle}" @click="currTitle=false">火车票</span>
                </div>
                <div class="begin">
                    <span>出发城市</span>
                    <input type="text" v-model="beginDes">
                </div>
                <span class="change" @click="changeDes">换</span>
                <div class="arrive">
                    <span>到达城市</span>
                    <input type="text" v-model="arriveDes">
                </div>
                <div class="date">
                    <span>出发日期</span>
                    <a-date-picker class="dateIput" @change="onChange" placeholder="选择日期" v-model="date"/>
                </div>
                <div class="passage">
                    <span>乘客人数</span>
                    <a-input-number id="inputNumber" :min="1" :max="10" v-model="number"/>
                </div>
                <a-button type="primary" icon="search" class="searchBtn" @click="searchTicket">查询</a-button>
            </div>
        </div>
        <div class="center">
            <!--保证-->
            <ul class="promise">
                <li><span class="iconfont icon-ticket-plan"><br/></span>100%航协认证</li>
                <li><span class="iconfont icon-ticket-bao"><br/></span>出行保证</li>
                <li><span class="iconfont icon-ticket-phone"></span><br/>
                    <div><span>7x24小时服务<br/><span style="color: #ff8800;">4006345678转2</span></span></div>
                </li>
            </ul>
            <!--特价机票-->
            <div class="barginTicket">
                <h2><span class="iconfont icon-ticket-bargin"></span>特价机票</h2>
                <ul class="barginContent">
                    <li class="item" v-for="(item,index) in barginData" :key="index">
                        <div class="picture">
                            <img :src="item.pic" alt="">
                            <span class="address">{{item.address}}</span>
                        </div>
                        <div class="desc">
                            <h4>{{item.title}}</h4>
                            <span class="price">￥<span class="number">{{item.price}}</span>含税起</span><br/>
                            <span class="date">出发日期：{{item.date}}</span>
                            <button @click="bookTicket(index)">立即预定</button>
                        </div>
                    </li>
                </ul>
            </div>
            <!--热门路线-->
            <div class="hotLine">
                <div class="title">
                    <img src="../assets/ticket-logo.png" alt="" class="logo">
                    <span>热门路线</span>
                </div>
                <ul class="hot-content">
                    <li v-for="(item,index) in hotLineData" :key="index"
                    @click="chooseLine(item)">{{item}}</li>
                </ul>
            </div>
            <!--常见问题-->
            <div class="problem">
                    <h3><a-icon type="question" class="icon"/>常见问题</h3>
                    <ul class="pro-box">
                        <li>
                            <span class="title">票类型限制</span><br/>
                            <span class="content">目前支持预订成人全价汽车票，暂不能购买免票（携儿童）、儿童票、学生票、优待票等。</span>
                        </li>
                        <li>
                            <span class="title">购票是否成功</span><br/>
                            <span class="content">订成功后，途牛旅游网将为您进行出票，出票成功后或出票失败有短信提醒，请及时查收短信。</span>
                        </li>
                        <li>
                            <span class="title"> 取票方式</span><br/>
                            <span class="content">凭取票号码/取票密码/身份证等凭证（参照客运站具体规定）到车站售票窗口/ 自助取票机取票上车。</span>
                        </li>
                        <li>
                            <span class="title">退改签</span><br/>
                            <span class="content">出票成功的客运票订单，途牛暂不支持网站和客服电话退票或改签。城际巴士票订单可支持发车前退票，退票收取部分退票手续费，具体细则请在订单填写页查看预订协议。</span>
                        </li>
                    </ul>
                </div>
        </div>
        <travelFoot></travelFoot>
    </div>

</template>

<script>
    import travelFoot from '../components/travelFoot'
    export default {
        name: "ticket",
        components:{
            travelFoot
        },
        data(){
            return{
                currTitle:true,
                number:'',/*乘客人数*/
                beginDes:'',/*出发地*/
                arriveDes:'',/*到达地*/
                date:null,//选择时间
                dateString:'',
                /*热门路线*/
                hotLineData:['南京到淮安','南京到滨海','南京到连云港',
                    '淮安到南京','南京到宿迁','南京到邳州','上海到盐城',
                    '南京到灌云','上海到启东','南京到合肥','深圳到广州',
                    '南京到沭阳','北京到唐山','南京到赣榆','上海到海门',
                    '南京到泗阳','宿迁到南京','南京到泰兴','南京到响水',
                    '吴江到上海','深圳到河源'],
                /*特价机票*/
                barginData:[
                    {address:'曼谷',pic:"http://localhost:8081/ticket/bargin4.jpg",title:'深圳往返曼谷4天热门机票',price:'953',date:'2020-04-03'},
                    {address:'香港',pic:"http://localhost:8081/ticket/bargin1.jpg",title:'厦门往返香港3天热门机票',price:'751',date:'2020-08-04'},
                    {address:'胡志明',pic:"http://localhost:8081/ticket/bargin2.jpg",title:'广州往返胡志明6天热门机票',price:'927',date:'2020-06-08'},
                    {address:'澳门',pic:"http://localhost:8081/ticket/bargin3.jpg",title:'上海往返澳门3天特价机票',price:'736',date:'2020-07-23'},
                ],
                token:'',
                account:''
            }
        },
        methods:{
            onChange(date,dateString) {
                this.date=date;
                this.dateString=dateString;
            },
            /*转换出发地和起始地*/
            changeDes(){
                if (this.beginDes!=null||this.arriveDes!=null){
                    var mid=this.beginDes;
                    this.beginDes =  this.arriveDes ;
                    this.arriveDes = mid;
                }
            },
            /*选择热门路线*/
            chooseLine(value){
                var subValue = value.split('到');
                this.beginDes=subValue[0];
                this.arriveDes = subValue[1];
            },
            /*搜索车票*/
            searchTicket(){
                if(this.beginDes==''||this.arriveDes==''||this.number==''||this.date==''){
                    this.$warning({
                        title: '请输入完整的搜索信息',
                        okText:'确认'
                    });
                }else{
                    localStorage.setItem('ticketDate',this.date);
                    this.$router.push({
                        path:'ticketDetail',
                        query:{
                            beginDes:this.beginDes,
                            arriveDes:this.arriveDes,
                            dateString:this.dateString
                        }
                    })
                }
            },
            /*功能：预定车票，参数：id：第几个的标志*/
            bookTicket(index){
                var _this =this;
                if(this.token){
                    this.$confirm({
                        title: '是否确认预定该航班的机票?',
                        okText:'确认',
                        cancelText:'取消',
                        onOk() {
                            var tick = _this.barginData[index];
                            var param = {userAccount:_this.account,token:_this.token,des:tick.title,
                                price:tick.price,picture:tick.pic,date:tick.date};
                            _this.$https.post('order/add',param).then( res =>{
                                if(res.body.success){
                                    setTimeout(()=>{
                                        _this.$message.success('已成功预定，可返回购物车查看');
                                    }, 500);
                                }
                            })
                        },
                    });
                }else{
                    this.$message.warning('请先进行登录');
                }
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
        }
    }
</script>

<style scoped lang="scss">

    .center {
        width: 80%;
        margin: 0 auto;
    }
    /*头部背景和搜索框-------*/
    .background{
        padding: 20px;
        width: 100%;
        height: 400px;
        background: url("../assets/ticket-bg.jpg") no-repeat;
        background-size: 100% 100%;
        .box{
            width: 400px;
            min-height: 300px;
            border: 1px solid  #4b61c1;
            padding: 10px 20px;
            position: relative;
            background-color: #fff;
            margin-left: 130px;
            .title{
                border-bottom: 1px solid #ddd;
                span{
                    display: inline-block;
                    width: 80px;
                    height: 100%;
                    padding-bottom: 5px;
                    text-align: center;
                    font-size: 18px;
                    margin-right: 5px;

                }
                .active{
                    color: #4b61c1;
                    border-bottom: 1px solid #4b61c1;
                }
            }
            .passage,.begin,.arrive,.date{
                margin-top: 20px;
                position: relative;
                span:first-of-type{
                    padding-right: 15px;
                }
                input{
                    width: 270px;
                    height: 36px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 0 10px;
                    &:focus{
                        border: 1px solid #4b61c1;
                        outline: none;
                    }
                }
            }
            .date{
                .dateIput{
                    width: 270px;
                }
            }
            .searchBtn{
                margin: 30px;
                width: 80%;
                height: 35px;
                background-color: #4b61c1;
                border: 1px solid #4b61c1;
            }
            /*更换按钮*/
            .change{
                position: absolute;
                right: 10px;
                top: 93px;
                background-color: #4b61c1;
                color: #fff;
                font-size: 12px;
                padding: 0 2px;
                cursor: pointer;
            }
            .begin::after,.begin::before{
                content: '';
                display: block;
                width: 15px;
                height: 27px;
                position: absolute;
                right: -3px;
                border-right:1px solid #4b61c1;

            }
            .begin::before{
                top: 14px;
                border-top:1px solid #4b61c1;
            }
            .begin:after{
                top: 57px;
                border-bottom:1px solid #4b61c1;
            }
        }
    }
    .promise{
        background-color: #f6f6f6;
        padding: 5px;
        margin-top: 10px;
        border: 1px solid #e5e5e5;
        text-align: center;
        list-style: none;
        display: flex;
        align-items: center;
        li{
            flex: 1;
            border-right: 1px solid #e5e5e5;
            &:last-of-type{
                border: none;
            }
            .iconfont{
                font-size: 30px;
            }
        }
    }
    .hotLine{
        width: 100%;
        .title{
            img{
                width: 50px;
            }
            span{
                font-size: 22px;
                color: #000;
            }
        }
        .hot-content{
            width: 100%;
            border: 2px solid #4b61c1;
            border-radius: 2px;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 50px;
            margin-top: 10px;
            li{
                width: 130px;
                padding: 5px;
                cursor: pointer;
                &:hover{
                    color: #4b61c1;
                    text-decoration: underline;
                }
            }
        }

    }
    .barginTicket{
        width: 100%;
        .iconfont{
            color: #fff;
            background-color: #4b61c1;
            margin-right: 10px;
            padding: 5px ;
            font-size: 20px;
        }
        .barginContent{
            width: 100%;
            list-style: none;
            padding-left: 0;
            display: flex;
            flex-wrap: wrap;
            margin: 20px 0;
            .item{
                width: 48%;
                height: 160px;
                margin-right: 20px;
                margin-bottom: 30px;
                display: flex;
                background-color: #eee;
                
                cursor: pointer;
                &:hover{
                    box-shadow: 0 4px 10px 2px rgba(255,136,0,.5);
                }
                .picture{
                    flex: 2;
                    position: relative;
                    img{
                        height:  100%;
                    }
                    .address{
                        position: absolute;
                        left: 0;
                        top: 0;
                        background-color: rgba(0,0,0,.7);
                        color: #fff;
                        padding: 3px 9px;
                        font-size: 12px;
                    }
                }
                .desc{
                    flex: 3;
                    padding: 20px;
                    position: relative;
                    .price{
                        color: #f80;
                        .number{
                            font-size: 28px;
                        }
                    }
                    button{
                        width: 100px;
                        height: 34px;
                        border-radius: 3px;
                        position: absolute;
                        bottom: 6px;
                        right: 6px;
                        background-color: #f80;
                        color: #fff;
                        outline: none;
                        border: none;
                        cursor: pointer;
                        &:hover{
                            background-color: #ffa833;
                        }
                    }
                }

            }
        }
    }
    .problem{
            margin: 20px 0 ;
            .icon{
                margin-right: 10px;
                background-color: #4b61c1;
                color: #fff;
                padding: 3px;
            }
            .pro-box{
                border: 1px solid #4b61c1;
                border-radius: 2px;
                padding: 10px 20px;
                list-style-type: none;
                display: flex;
                li{
                    flex: 1;
                    border-right: 1px dashed #eee;
                    padding: 0 20px;
                   &:last-of-type{
                       border: none;
                   }
                    .content{
                        color: #888;
                        margin-top: 10px;
                    }
                }
            }


        }

</style>