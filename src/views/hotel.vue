<template>
    <div class="main">
        <div class="top-bg"></div>
        <div class="search">
            <h2>订酒店</h2>
            <div class="searchBox">
                <a-input placeholder="出行目的地" class="hotelNameInput" v-model="address"/>
                <a-date-picker @change="onChangeStart" placeholder="入店日期" class="date" v-model="startTime"/>
                <a-date-picker @change="onChangeEnd" placeholder="离店日期"  class="date" v-model="endTime" />
                <a-input-number class="numberInput"  placeholder="入住人数" :min="1" :max="20" v-model="number" >
                    <a-icon slot="suffix" type="user" />
                </a-input-number>
                <a-button class="searchBtn" @click="searchHotel">搜索酒店</a-button>
            </div>
        </div>
        <!--广告--（固定）-->
        <div class="advertise">
            <ul>
                <li class="item">
                    <div><a-icon type="pay-circle" class="icon"/></div>
                    <div><span>合理价格</span><br/>
                        <span>多平台价格对比，天天专享特惠</span>
                    </div>
                </li>
                <li class="item">
                    <div><a-icon type="solution" class="icon"/></div>
                    <div><span>真实点评</span><br/>
                        <span>超过100万真实用户点评和游记</span></div>
                </li>
                <li class="item">
                    <div><a-icon type="gold" class="icon"/></div>
                    <div><span>繁多种类</span><br/>
                        <span>100万间酒店，想你所想</span></div>
                </li>
                <li class="item">
                    <div> <a-icon type="heart" class="icon"/></div>
                    <div><span>专享服务</span><br/>
                        <span>7x24小时专业旅游顾问服务</span></div>
                </li>
            </ul>
        </div>
        <!--特价酒店-->
        <div class="bargin">
            <div class="centerContent">
                <h1>精选酒店</h1>
                <ul class="mainContent">
                    <li v-for="(item,index) in barginHotel" :key="index"
                        class="item" @click="gotoDetail(item.id)">
                        <a-card hoverable style="width: 240px">
                            <span class="score">{{item.count}}分</span>
                            <img :src="item.mainPicture" slot="cover"/>
                            <a-card-meta :title="item.name">
                                <template slot="description">
                                    <span>{{item.locate}}</span>
                                    <span style="font-weight: 800;color: #000;padding-left: 30px;" v-if="item.price1">￥{{item.price1}}起</span>
                                    <span style="font-weight: 800;color: #000;padding-left: 30px;" v-else>￥600起</span>
                                </template>
                            </a-card-meta>
                        </a-card>
                    </li>
                </ul>

            </div>
        </div>
        <!--合作品牌--（固定）-->
        <div class="friendTag">
            <div class="centerContent">
                <h3>合作品牌</h3>
                <ul class="content">
                    <li><img src="../assets/friendTag1.png" alt=""></li>
                    <li><img src="../assets/friendTag2.png" alt=""></li>
                    <li><img src="../assets/friendTag3.png" alt=""></li>
                    <li><img src="../assets/friendTag4.png" alt=""></li>
                    <li><img src="../assets/friendTag5.png" alt=""></li>
                    <li><img src="../assets/friendTag6.png" alt=""></li>
                    <li><img src="../assets/friendTag7.png" alt=""></li>
                    <li><img src="../assets/friendTag8.png" alt=""></li>
                </ul>
            </div>
        </div>
        <travelFoot></travelFoot>
    </div>

</template>

<script>
    import travelFoot from '../components/travelFoot'
    export default {
        name: "hotel",
        components:{
            travelFoot
        },
        data(){
            return{
                barginHotel:[],
                address:'',//出行目的地
                number:'',//出行人数
                startTime:null,//开始时间
                endTime:null//
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
            /*点击搜索酒店*/
            searchHotel(){
                if(this.address){
                    localStorage.setItem('startTime',this.startTime)
                    localStorage.setItem('endTime',this.endTime)
                    this.$router.push({
                        path:'/hotelScreen',
                        query:{
                            address:this.address,
                            number:this.number,
                        }
                    })
                }else{
                    this.$warning({
                        title: '请输入目的地',
                        okText:'确认'
                    });
                }
            },
            /*功能：更新页面，获取数据*/
            updateTicket(){
                this.$https.post('hotel/getHotels',{index:1}).then( res =>{
                    if(res.body.success){
                        this.barginHotel = res.body.hotelList;
                    }
                })
            }
        },
        created(){
            this.updateTicket();
        }
    }
</script>

<style scoped lang="scss">
    .main{
        /*公用样式*/
        .centerContent{
            width: 80%;
            margin: 0 auto;
        }
        .top-bg{
            width: 100%;
            height: 430px;
            background-image: url('../assets/hotel-bg.jpg');
            background-size: 100% 80%;
            position: fixed;
            left: 0;
            top: 0px;
            z-index: -1;
        }
        .search{
            position: absolute;
            top: 150px;
            left: 200px;
            .searchBox{
                margin-top: 20px;
                .hotelNameInput{
                    width: 220px;
                }
                .numberInput{
                    width: 200px;
                    margin: 0 6px;
                }
                .hotelNameInput,.date{
                    margin-right: 6px;
                }
                .date{
                    width: 230px;
                }
                .searchBtn{
                    background-color: #4b61c1;
                    width: 100px;
                    height: 32px;
                    border-color: #4b61c1;
                    color: #fff;
                }
            }
        }
        .advertise{
            width: 100%;
            margin-top: 300px;
            background-color: #fff;
            ul{
                width: 80%;
                margin: 0 auto;
                display: flex;
                list-style: none;
                padding: 20px 0;
                border-bottom: 1px solid #ccc;
                .item{
                    flex: 1;
                    padding-left:  20px;
                    div{
                        float: left;
                        font-size: 13px;

                        .icon{
                            font-size: 30px;
                            padding: 10px;
                            color: #666;
                        }
                        span:first-of-type{
                            color: #000;
                            font-weight: 800;
                        }
                    }
                }
            }
        }
        .bargin{
            padding: 20px 0;
            background-color: #fff;
            text-align: center;
            .mainContent{
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                .item {
                    width: 22%;
                    position: relative;
                    margin-top: 20px;
                    margin-right: 35px;
                    &:nth-of-type(4n){
                        margin-right: 0;
                    }
                    .score {
                        position: absolute;
                        top: 15px;
                        left: 10px;
                        background-color: rgba(0, 0, 0, 0.5);
                        color: #fff;
                        padding: 0 10px;
                        border-radius: 3px;
                        font-size: 16px;
                    }
                }
            }
        }
        .friendTag{
            padding: 20px 20px 40px 20px;
            background-color: #fff;
            .content{
                display: flex;
                list-style: none;
                li{
                    background-color: #f6f6f6;
                    border-radius: 5px ;
                    flex: 1;
                    margin-right: 30px;
                    height: 60px;
                    padding: 10px;
                    img{
                        width: 90%;
                    }
                }
            }
        }

    }

</style>