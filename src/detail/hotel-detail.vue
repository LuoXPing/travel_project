<template>
    <div class="hotel-detail">
        <div class="picDescribe">
            <div class="center">
                <!--标题栏目-->
                <div class="title">
                    <div class="leftPart">
                        <h2>{{hotelContent.name}}</h2>
                        <span class="foreign">{{hotelContent.ename}}</span>
                        <a-tooltip placement="bottom" >
                            <template slot="title">
                                <span>等级评定是根据房价，设施服务等各方面水平的综合评估</span>
                            </template>
                            <!--皇冠-->
                            <div class="crown">
                                <span class="iconfont icon-hd-crown"></span>
                                <span class="iconfont icon-hd-crown"></span>
                                <span class="iconfont icon-hd-crown"></span>
                                <span class="iconfont icon-hd-crown"></span>
                            </div>
                        </a-tooltip>
                        <br/>
                        <span class="address">地址：{{hotelContent.detail_loacte}}</span>
                    </div>
                    <div class="rightPart">
                        <div class="rank">
                            <span class="num">{{hotelContent.count}}</span>分
                        </div>
                        <div class="comment">非常好</div>
                    </div>
                </div>
                <!--图片-->
                <div class="desPic">
                    <div class="big-img">
                        <img :src="hotelContent.mainPicture"  alt="">
                        <p>{{hotelContent.describe}}</p>
                    </div>
                    <div class="small-img">
                        <img :src="hotelContent.pic1" alt="">
                        <img :src="hotelContent.pic2" alt="">
                        <img :src="hotelContent.pic3" alt="">
                        <img :src="hotelContent.pic4" alt="">
                        <img :src="hotelContent.pic5" alt="">
                        <img :src="hotelContent.pic6" alt="">
                    </div>
                </div>

            </div>
        </div>
        <div class="book">
           <div class="center">
               <h3>预定</h3>
               <div class="inputBox">
                   <a-date-picker placeholder="入住日期" class="date" v-model="startTime"/>
                   <a-date-picker placeholder="离店日期" class="date" v-model="endTime"/>
                   <a-input-number class="numberInput"  placeholder="入住人数" :min="1" :max="5">
                       <a-icon slot="suffix" type="user" />
                   </a-input-number>
                   <a-button  class="searchBtn">查看价格</a-button>
               </div>
               <div class="table">
                   <table>
                       <tr class="title">
                           <td>价格来源</td>
                           <td>最低价房型</td>
                           <td>最低价格/每晚</td>
                       </tr>
                       <tr v-for="(item,index) in hotelPricData" :key="index" class="row">
                           <td>{{item.name}}</td>
                           <td :class="{noType:item.price!='已售罄'}">{{item.type}}</td>
                           <td>
                               <span v-show="item.price!='已售罄'">
                                   <span class="num">￥{{item.price}}</span>起</span>
                           </td>
                       </tr>
                   </table>
               </div>
           </div>
        </div>
        <div class="center">
            <!--基本信息-->
            <div class="basic">
                <div class="title">基本信息</div>
                <ul class="content">
                    <li>入住时间: <span class="num">14:00</span>之后</li>
                    <li>离店时间: <span class="num">12:00</span>之前</li>
                    <li>建成于: <span class="num">1997</span>年</li>
                    <li>翻修于: <span class="num">2013</span>年</li>
                    <li>酒店规模: <span class="num">490</span>间客房</li>
                </ul>
            </div>
            <!--酒店设施-->
            <div class="equipment">
                <div class="title">主要设施</div>
                <ul class="content">
                    <li><span class="iconfont icon-hd-wifi"></span>wifi服务</li>
                    <li><span class="iconfont icon-hd-parking"></span>免费停车场</li>
                    <li><span class="iconfont icon-hd-elevator"></span>电梯</li>
                    <li><span class="iconfont icon-tableware"></span>餐厅</li>
                    <li><span class="iconfont icon-hd-luggage"></span>行李寄存</li>
                    <li><span class="iconfont icon-stragegyDetail-time"></span>24小时服务</li>
                    <li><span class="iconfont icon-hd-kettle"></span>热水壶</li>
                    <li><span class="iconfont icon-hd-drier"></span>吹风机</li>
                </ul>
            </div>
            <!--酒店服务-->
            <div class="service">
                <div class="title">酒店服务</div>
                <ul class="content">
                    <li><a-icon type="check" class="icon"/>接机服务</li>
                    <li><a-icon type="check" class="icon"/>旅游服务</li>
                    <li><a-icon type="check" class="icon"/>客房服务</li>
                    <li><a-icon type="check" class="icon"/>洗衣服务</li>
                    <li><a-icon type="check" class="icon"/>熨衣服务</li>
                    <li><a-icon type="check" class="icon"/>行李服务</li>
                    <li><a-icon type="check" class="icon"/>24小时大堂经理</li>
                    <li><a-icon type="check" class="icon"/>租车服务</li>
                </ul>
            </div>
            <!--酒店设施-->
            <div class="facilities">
                <div class="title">酒店设施</div>
                <ul class="content">
                    <li><a-icon type="check" class="icon"/>理发美容室</li>
                    <li><a-icon type="check" class="icon"/>咖啡厅</li>
                    <li><a-icon type="check" class="icon"/>健身房</li>
                    <li><a-icon type="check" class="icon"/>室内游泳池</li>
                    <li><a-icon type="check" class="icon"/>传真/复印</li>
                    <li><a-icon type="check" class="icon"/>酒廊</li>
                    <li><a-icon type="check" class="icon"/>乒乓球室</li>
                    <li><a-icon type="check" class="icon"/>吸烟区</li>
                    <li><a-icon type="check" class="icon"/>多功能厅</li>
                </ul>
            </div>
            <!--房间设施-->
            <div class="room">
                <div class="title">房间设施</div>
                <ul class="content">
                    <li><a-icon type="check" class="icon"/>叫醒服务</li>
                    <li><a-icon type="check" class="icon"/>浴缸</li>
                    <li><a-icon type="check" class="icon"/>浴衣</li>
                    <li><a-icon type="check" class="icon"/>多种规格电源插座</li>
                    <li><a-icon type="check" class="icon"/>冰箱／迷你吧</li>
                    <li><a-icon type="check" class="icon"/>宽带上网</li>
                    <li><a-icon type="check" class="icon"/>空调</li>
                    <li><a-icon type="check" class="icon"/>电视</li>
                    <li><a-icon type="check" class="icon"/>免费洗漱用品</li>
                    <li><a-icon type="check" class="icon"/>儿童娱乐</li>
                </ul>
            </div>
            <!--酒店攻略-->
            <div class="strategy">
                <div class="title">酒店攻略</div>
                <div class="content">
                    <p>
                        必读<br/>
                        --{{hotelContent.name}}位于{{hotelContent.detail_loacte}}，毗邻金融区、购物中心和美丽的筼筜湖，临近松柏公园、后屿王公宫等。<br/>
                        --酒店提供全天接机和小三通码头接船服务（需等候30分钟），专人在接机接船车辆上即可为您办理入住手续，以及定时巴士送机和提供船服务。<br/>
                        --酒店设有西餐厅、粤菜厅、闽菜厅、日本料理、素食餐厅、酒吧及咖啡厅。
                    </p>
                    <p>
                        贴士<br/>
                        --若是亲子出游，酒店会细心为小朋友准备儿童专用拖鞋、睡袍、衣架、洗漱用品和婴儿车等。<br/>
                        --高级客房和精品客房由设计公司打造，配备液晶电视、无噪音冰箱、淋浴设备、TOTO自动冲洗便洁器以及保险箱、小酒吧等。<br/>
                        酒店可兑换新台币，设多功能厅、各类豪华会议室（配同声传译设备）以及商务中心、银行、商场、美容美发、足健、中医推拿、健身房、台球室、乒乓球室，以及室内游泳池等。
                    </p>
                </div>
            </div>
        </div>
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import moment from 'moment';
    import smallFoot from '../components/smallFoot';
    export default {
        name: "hotel-detail",
        components:{
            smallFoot
        },
        data(){
            return{
                startTime:null,
                endTime:null,
                id:'',
                hotelContent:{},
                hotelPricData:null
            }
        },
        methods:{
            /*功能：更新页面，获取数据*/
            updateTicket(){
                this.$https.post('/hotel/getDetail',{id:this.id}).then( res =>{
                    var data = res.body.hotel;
                    if(res.body.success){
                        this.hotelContent = res.body.hotel;
                        this.hotelPricData=[
                            {name:'Booking.com',type:data.type1,price:data.price1},
                            {name:'马蜂窝优选',type:data.type2,price:data.price2},
                            {name:'agoda',type:data.type3,price:data.price3},
                            {name:'有鱼订房',type:data.type4,price:data.price4},
                            {name:'艺龙',type:data.type5,price:data.price5},
                            {name:'携程',type:data.type6,price:data.price6},
                        ];
                    }else{
                        this.$message.error(res.body.rspDesc);
                    }
                })
            }
        },
        created(){
            var start = localStorage.getItem('startTime');
            var end = localStorage.getItem('endTime');
            this.startTime = start == null?null: moment(start);
            this.endTime = end == null?null: moment(end);
            this.id = this.$route.query.id;
            this.updateTicket()
        }
    }
</script>

<style scoped lang="scss">
    .hotel-detail{
        min-width: 900px;
    }
    .center{
        width: 75%;
        margin: 0 auto;
    }
    .picDescribe{
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        .title{
            width: 100%;
            height: 80px;
            .leftPart{
                float: left;
                h2{
                    margin-bottom: 5px;
                }
                line-height: 24px;
                .foreign{
                    color: #666;
                    font-size: 14px;
                }
                .address{
                    font-size: 12px;
                    color: #999;
                }
                .crown{
                    display: inline-block;
                    color: #ffa800;
                    padding-left: 3px;
                    cursor: pointer;
                }
            }
            .rightPart{
                width: 190px;
                float: right;
                color: #666;
                margin-top: 15px;
                .rank{
                    float: left;
                    padding: 0 10px;
                    border-right: 1px solid #ccc;
                    .num{
                        font-size: 30px;
                        color: #ff8a00;
                    }
                }
                .comment{
                    float: left;
                    font-size: 18px;
                    padding:  10px;
                }
            }
        }
        .desPic{
            margin-top: 10px;
            padding: 10px 0 30px 0;
            display: flex;
            img{
                border-radius: 5px;
            }
            .big-img{
                flex: 2;
                margin-right: 10px;
                position: relative;
                img{
                    width:  100%;
                    height: 380px;
                }
                p{
                    position: absolute;
                    left: 15px;
                    bottom: 15px;
                    width: 260px;
                    padding: 8px;
                    background-color: rgba(0,0,0,.75);
                    border-radius: 3px;
                    font-size: 14px;
                    line-height: 24px;
                    color: #fff;
                }
            }
            .small-img{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                height: 380px;
                img{
                    width: 47%;
                    margin-bottom: 10px;
                    &:nth-of-type(2n+1){
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .book{
        padding: 20px;
        h3{
            color: #4b61c1;
        }
        .inputBox{
            .date{
                margin-right: 10px;
            }
            .searchBtn{
                background-color: #4b61c1;
                color: #fff;
                margin-left: 10px;
            }
        }
    }
    .table{
        padding: 20px 0;
        table{
            width: 100%;
            border: 1px solid #ccc;
            td{
                padding: 0 20px;
            }
            .title{
                background-color: #f4f4f4;
                border-bottom: 1px solid #ccc ;
                height: 46px;
                line-height: 46px;
                padding: 0 15px;
                color: #333;
            }
            .row{
                height: 60px;
                line-height: 60px;
                font-size: 14px;
                color: #666;
                border-bottom: 1px dashed #cecece;
                &:last-of-type{
                    border-bottom: none;
                }
                span{
                    font-weight: bold;
                }
                .num{
                    color: #ff8a00;
                    font-size: 20px;
                    padding-right: 5px;
                }
                .noType{
                    color: #999;
                }
            }
        }
    }
    .basic,.equipment,.strategy,.service,.facilities,.room{
        padding: 10px 5px;
        margin: 0 15px;
        display: flex;
        color: #666;
        .title{
            flex: 1;
            font-size: 16px;
        }
        .content{
            flex: 6;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            font-size: 14px;
            li{
                width: 20%;
                margin-bottom: 10px;
            }
        }
    }
    .basic{
        border-bottom: 1px solid #ccc;
        .num{
            font-size: 18px;
            color: #000;
        }
    }
    .equipment,.service,.facilities,.room{
        padding: 10px 0;
        height: 100px;
        .iconfont,.icon{
            padding-right: 10px;
            color: #333;
        }
        .content{
            padding-bottom: 10px;
            height: 100%;
            border-bottom: 1px dashed #cecece;
        }
    }
    .room{
        border-bottom: 1px solid #ccc;
        .content{
            border-bottom: none;
        }
    }
    .strategy{
        padding: 20px 0;
        height: 300px;
        margin-bottom: 20px;
        p{
            line-height: 24px;
        }
    }

</style>