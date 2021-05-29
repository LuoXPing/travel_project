<template>
    <div class="ticketDetail">
        <!--头部搜索框-->
        <div class="topSearch">
            <div class="center">
                <a-input placeholder="出发地" class="startAdd" v-model="startAddress"/>
                <a-input placeholder="到达地" class="endAdd" v-model="endAddress"/>
                <a-date-picker @change="onChange" class="date" placeholder="选择日期" v-model="date"/>
                <a-button icon="search" class="searchBtn" @click="searchTicket">搜索</a-button>
            </div>
        </div>
        <!--中间内容-->
        <div class="ticketContent">
            <div class="center">
                <!--左边内容-->
                <div class="leftPart">
                        <span v-show="startAddress&&endAddress" class="tip">
                        选择航班：{{startAddress}} ⇀ {{endAddress}} {{dateString}}</span>
                    <ul class="flight"  v-if="airpotData.length!=0">
                        <li class="title">
                            <span class="company">航空信息</span>
                            <span class="time">起飞时间</span>
                            <span class="endTime">到达时间</span>
                            <span class="price">价格</span>
                        </li>
                        <li class="item" v-for="(item,index) in airpotData" :key="index">
                            <div class="company">
                                <span>{{item.company}}</span>
                                <span class="type">{{item.companyType}}</span><br/>
                                <span class="airport">{{item.airtype}}</span>
                            </div>
                            <div class="startTime">
                                <span class="time">{{item.startDate}}</span><br/>
                                <span class="airport">{{item.startAirport}}</span>
                            </div>
                            <div class="duration">
                                <span class="long">{{item.duration}}</span><br/>
                            </div>
                            <div class="endTime">
                                <span class="time">{{item.arriveDate}}</span><br/>
                                <span class="airport">{{item.arriveAirport}}</span>
                            </div>
                            <div class="price">
                                ￥<span class="num">{{item.price}}</span>
                                <span>起</span>
                            </div>
                            <div class="btn">
                                <span @click="bookTicket(item)">订票</span>
                            </div>
                        </li>
                    </ul>
                    <!--没有航班信息时显示-->
                    <div class="noContent" v-else>
                        <div class="pic">
                            <img src="../assets/td-none.png" alt="">
                        </div>
                        <span>暂无符合条件的机票信息，请重新搜索</span>
                    </div>
                   <!--翻页-->
                    <a-pagination :current="current" :total="totalNum" :defaultCurrent="1" style="float: right;"
                                  :hideOnSinglePage="true" @change="gotoNextpage"/>
                </div>
                <!--右边电话-->
                <div class="rightPart">
                    <div class="box">
                        <ul class="promise">
                            <li><span class="iconfont icon-ticket-plan"><br/></span>航协认证</li>
                            <li><span class="iconfont icon-ticket-bao"><br/></span>出行保证</li>
                            <li><span class="iconfont icon-ticket-phone"></span><br/>
                                <div><span>服务保障</span></div>
                            </li>
                        </ul>
                        <div class="phone">免费客服电话：4006345678</div>
                    </div>

                </div>
            </div>
        </div>
        <!--底部-->
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import moment from 'moment';
    import smallFoot from '../components/smallFoot'
    export default {
        name: "ticket-detail",
        components:{smallFoot},
        data(){
            return{
                startAddress:'',//开始地址
                endAddress:'',//结束地址
                date:null,//选择日期
                dateString:'',
                /*车票信息*/
                airpotData:[],
                token:'',
                totalNum:'',
                current:1,
            }
        },
        methods:{
            onChange(date, dateString) {
                this.date = date;
                this.dateString = dateString;
            },
            /*功能：搜索更多的车票*/
            searchTicket(){
                this.updateTicket();
            },
            /*功能：预定车票，参数：id：第几个的标志*/
            bookTicket(item){
                var _this =this;
                if(this.token){
                    this.$confirm({
                        title: '是否确认预定该航班的机票?',
                        okText:'确认',
                        cancelText:'取消',
                        onOk() {
                            var param = {userAccount:_this.account,token:_this.token,des:item.company+'车票',
                                price:item.price,picture:'http://localhost:8081/ticket/default.jpg',date:_this.dateString};
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
            },
            /*翻页*/
            gotoNextpage(current){
                this.current = current;
                document.documentElement.scrollTop=100;
            },
            /*功能：更新页面，获取数据*/
            updateTicket(){
                var num = this.current-1;
                var param = {startDes:this.startAddress,arriveDes:this.endAddress,pageNum:num};
                this.$https.post('/ticket/getByAdd',param).then( res =>{
                    if(res.body.success){
                        this.totalNum = res.body.number;
                        this.airpotData = res.body.ticketList;
                    }else{
                        this.$message.error(res.body.rspDesc);
                     }
                })
            }
        },
        created(){
            var date = localStorage.getItem('ticketDate');
            this.date = date == 'null'?null: moment(date);
            this.startAddress =  this.$route.query.beginDes;
            this.endAddress =  this.$route.query.arriveDes;
            this.dateString =  this.$route.query.dateString;
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
            this.updateTicket();
        },
        destroyed(){
            localStorage.clear()
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 75%;
        margin: 0 auto;
    }
    .topSearch{
        padding: 0 20px;
        background-color: #f6f6f6;
        height: 90px;
        line-height: 90px;
        .startAdd,.endAdd,.date{
            width: 250px;
            margin-right: 10px;
        }
        .searchBtn{
            background-color: #4b61c1;
            color: #fff;
            width: 150px;
        }

    }
    .ticketContent{
        min-height: 500px;
        margin-bottom: 30px;
        .center{
            display: flex;
        }
        .leftPart{
            flex: 3;
            margin-right: 30px;
            color: #333;
            .tip{
                font-size: 12px;
            }
            .flight{
                margin-top:  10px;
                width: 100%;
                min-height:500px;
                .title{
                    width: 100%;
                    color: #717376;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #f6f6f6;
                    border: 1px solid #e5e5e5;
                    display: flex;
                    span{
                        flex: 2;
                        text-align: center;
                    }
                    .company{
                        flex: 1.2;
                    }
                    .price{
                        text-align: left;
                        box-sizing: border-box;
                    }
                }
                .item{
                    margin-top: 20px;
                    width: 100%;
                    height: 100px;
                    border: 1px solid #e5e5e5;
                    display: flex;
                    padding: 10px 0;
                    div{
                        padding: 10px 0;
                        flex: 1;
                    }
                    .company{
                        flex: 1.2;
                        font-size: 16px;
                        padding: 10px 20px;
                        span{
                            padding-right: 5px;
                        }
                        .type{
                            font-size: 12px;
                            color: #242629;
                        }
                    }
                    .duration{
                        flex: 0.8;
                        font-size: 11px;
                        padding-top: 20px;
                        position: relative;
                        .long:after{
                            content: '';
                            display: block;
                            width:73px;
                            border-bottom: 1px solid #e5e5e5;
                            position: absolute;
                            top: 43px;
                            left: -2px;
                        }
                        .long:before{
                            content: '';
                            display: block;
                            width:10px;
                            border-bottom: 1px solid #e5e5e5;
                            position: absolute;
                            top: 40px;
                            right: 10px;
                            transform: rotate(30deg);
                        }
                    }
                    .time{
                        color: #242629;
                        font-size: 22px;
                    }
                    .airport{
                        font-size: 12px;
                        color: #666;
                    }
                    .startTime,.endTime{
                        padding-left: 10px;
                    }
                    .price{
                        padding-top: 10px;
                        color: #ff4a26;
                        font-size: 12px;
                        span{
                            color: #717376;
                        }
                        .num{
                            font-size: 28px;
                            color: #ff4a26;
                        }
                    }
                    .btn{
                        padding-top: 20px;
                        span{
                            background-color: #ff9d00;
                            color: #fff;
                            display: inline-block;
                            width: 80px;
                            text-align: center;
                            height: 28px;
                            line-height: 28px;
                            cursor: pointer;
                            &:hover{
                                background-color: #ff8a01;
                            }
                        }

                    }
                }
            }
        }
        .noContent{
            text-align: center;
            .pic{
                margin: 20px auto;
            }
            span{
                color: #bdbfc2;
            }
        }
        .rightPart{
            flex: 1;
            .box{
                border: 1px solid #e5e5e5;
                .promise{
                    list-style:none;
                    display: flex;
                    padding-left: 0;
                    padding: 10px;
                    li{
                        flex: 1;
                        padding-right: 10px;
                        font-size: 12px;
                        text-align: center;
                        color: #000;
                        .iconfont{
                            font-size: 30px;
                        }
                    }
                }
                .phone{
                    width: 100%;
                    background-color: #f6f6f6;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    color: #333;
                    font-size: 12px;
                }
            }
        }
    }
</style>