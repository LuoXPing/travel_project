<template>
    <div class="hotelScreen">
        <div class="center">
            <!--面包屑-->
            <div class="breadcrumb">
                酒店<a-icon type="right" class="icon"/>{{address}}酒店预订
            </div>
            <!--搜索框-->
            <div class="searchBox">
                <a-input placeholder="出行目的地" class="hotelNameInput" v-model="address"/>
                <a-date-picker @change="onChangeStart" placeholder="入店日期" class="date" v-model="startTime"/>
                <a-date-picker @change="onChangeEnd" placeholder="离店日期" v-model="endTime" />
                <a-input-number class="numberInput"  placeholder="入住人数" :min="1" :max="20" v-model="number" >
                    <a-icon slot="suffix" type="user" />
                </a-input-number>
                <a-button class="searchBtn">查看价格</a-button>
            </div>
            <!--中间内容-->
            <div class="hotelScreenCont">
                <ul class="hotlCont" v-if="hotelData.length!=0">
                    <li v-for="(item,index) in hotelData" :key="index"
                        class="item" @click="gotoDetail(item.id)">
                        <div class="picture">
                            <img :src="item.mainPicture" alt="">
                        </div>
                        <div class="describe">
                            <h3>{{item.name}}</h3>
                            <span class="english">{{item.ename}}</span>
                            <div class="count"><span class="num">{{item.count}}</span>分</div>
                            <p>{{item.describe}}</p>
                            <span class="locate"><span class="iconfont icon-location"></span>地址:{{item.detail_loacte}} </span>
                        </div>
                        <ul class="price">
                            <li class="price-item">
                                <span class="name" >马蜂窝优选</span>
                                <span class="pri out" v-if="item.price1=='已售罄'">{{item.price1}}</span>
                                <span class="pri" v-else>
                                    <span class="num">￥{{item.price1}}</span>起
                                    <a-icon type="right" class="rightIcon"/>
                                </span>
                            </li>
                            <li class="price-item">
                                <span class="name">携程旅行</span>
                                <span class="pri out" v-if="item.price2=='已售罄'">{{item.price2}}</span>
                                <span class="pri" v-else>
                                    <span class="num">￥{{item.price2}}</span>起
                                    <a-icon type="right" class="rightIcon"/>
                                </span>
                            </li>
                            <li class="price-item">
                                <span class="name">Booking.com</span>
                                <span class="pri out" v-if="item.price3=='已售罄'">{{item.price3}}</span>
                                <span class="pri" v-else>
                                    <span class="num">￥{{item.price3}}</span>起
                                    <a-icon type="right" class="rightIcon"/>
                                </span>
                            </li>
                            <li class="price-item">
                                <span class="name">有鱼订房</span>
                                <span class="pri out" v-if="item.price4=='已售罄'">{{item.price4}}</span>
                                <span class="pri" v-else>
                                    <span class="num">￥{{item.price4}}</span>起
                                    <a-icon type="right" class="rightIcon"/>
                                </span>
                            </li>
                            <li class="price-item">
                                <span class="name">艺龙</span>
                                <span class="pri out" v-if="item.price5=='已售罄'">{{item.price5}}</span>
                                <span class="pri" v-else>
                                    <span class="num">￥{{item.price5}}</span>起
                                    <a-icon type="right" class="rightIcon"/>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!--没有内容时显示-->
                <div class="widthoutCont" v-else>
                    没有符合的内容~
                </div>
                <a-pagination :current="current" :total="totalNum" :defaultCurrent="1" style="float: right;"
                              :hideOnSinglePage="true" @change="gotoNextpage"/>
            </div>
        </div>
        <!--底部信息栏-->
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import moment from 'moment';
    import smallFoot from '../components/smallFoot'
    export default {
        name: "hotel-screen",
        components:{smallFoot},
        data(){
            return{
                address:'',
                number:'',
                startTime:null,
                endTime:null,
                /*宾馆的记录*/
                hotelData:[],
                current:1,
                totalNum:1
            }
        },
        methods:{
            /*跳转到酒店详情页面*/
            gotoDetail(id){
                this.$router.push({
                    path:'/hotelDetail',
                    query:{id:id}
                })
            },
            /*日期选择器:开始日期*/
            onChangeStart(date) {
                this.startTime = date;
            },
            onChangeEnd(date) {
                this.endTime = date;
            },
            /*翻页*/
            gotoNextpage(current){
                this.current = current;
                document.documentElement.scrollTop=100;
            },
            /*功能：更新页面，获取数据*/
            updateTicket(){
                var num = this.current-1;
                var param = {locate:this.address,pageNum:num};
                this.$https.post('/hotel/getByAddress',param).then( res =>{
                    if(res.body.success){
                        if(res.body.number>10){
                            this.totalNum = res.body.number;
                        }
                        this.hotelData = res.body.hotelList;
                    }else{
                        this.$message.error(res.body.rspDesc);
                    }
                })
            }

        },
        created(){
            this.address = this.$route.query.address;
            var start = localStorage.getItem('startTime');
            var end = localStorage.getItem('endTime');
            this.startTime = start == 'null'?null: moment(start);
            this.endTime = end == 'null'?null: moment(end);
            this.updateTicket();
        },
        destroyed(){
            localStorage.clear()
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 70%;
        margin: 0 auto;
    }
    /*面包屑*/
    .breadcrumb{
        padding: 20px 10px 0 10px;
        font-size: 13px;
        .icon{
            color: #999;
            font-size: 11px;
            padding: 0 5px;
        }
    }
    /*搜索框*/
    .searchBox{
        padding: 10px;
        margin-top: 10px;
        .hotelNameInput{
            width: 150px;
        }
        .numberInput{
            width: 150px;
            margin: 0 6px;
        }
        .hotelNameInput,.date{
            margin-right: 6px;
        }
        .searchBtn{
            background-color: #4b61c1;
            width: 100px;
            height: 32px;
            border-color: #4b61c1;
            color: #fff;
        }
    }
    /*主要内容*/
    .hotelScreenCont{
        min-height: 500px;
        margin-bottom: 50px;
        /*有内容时显示*/
        .hotlCont{
            padding: 10px;
            .item{
                display: flex;
                margin-top: 20px;
                padding-bottom: 30px;
                margin-bottom: 30px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                .picture{
                    flex: 1;
                    img{
                        width: 100%;
                        border-radius: 5px;
                    }
                }
                .describe{
                    flex: 1;
                    padding: 0 15px;
                    h3{
                        color: #666;
                        margin-bottom: 5px;
                    }
                    .english{
                        font-size: 14px;
                        color: #999;
                    }
                    .count{
                        margin-top: 5px;
                        margin-left: 10px;
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border: 2px solid #ffc542;
                        border-radius: 50%;
                        color: #999;
                        .num{
                            color: #ff8a00;
                        }
                    }
                    p{
                        margin: 5px 0;
                        font-size: 14px;
                        line-height: 24px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                       -webkit-box-orient: vertical;
                    }
                    .locate{
                        font-size: 12px;
                        .icon-location{
                            color: #ffa800;
                        }
                    }

                }
                .price{
                    flex: 1;
                    margin-top: 30px;
                    margin-left: 10px;
                    .price-item{
                        border-bottom: 1px solid #eee;
                        padding:5px;
                        display: flex;
                        &:hover{
                            background-color: #fafafa;
                        }
                        span{
                            display: inline-block;
                            height: 24px;
                            line-height: 24px;
                        }
                        .name{
                            flex: 2;
                            border-right: 1px solid #eee;
                        }
                        .pri{
                            flex: 1;
                            padding: 0 10px;
                            color: #666;
                            font-weight: bold;
                            font-size: 11px;
                            .rightIcon{
                                padding-left: 10px;
                                color: #ff8a00;
                                font-weight: bold;
                            }
                            .num{
                                color: #ff8a00;
                                font-size: 16px;
                            }
                        }
                        .out{
                            color: #999;
                            font-size: 12px;
                        }
                    }

                }
            }
        }
        /*没有内容显示*/
        .widthoutCont{
            width: 100%;
            text-align: center;
            margin: 0 auto;
            padding-top: 200px;
            color: #999;
            font-size: 20px;
        }
    }
</style>