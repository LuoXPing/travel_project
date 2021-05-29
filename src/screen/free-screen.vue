<template>
    <div class="free-screen">
        <bannerMenu nowActive='0'></bannerMenu>
        <div class="center">
            <!--搜索框-->
            <searchBox :arrive="arriveDes" title="自由行"></searchBox>
            <!--主要内容-->
            <div class="freeScreenCont">
                <!--当地景点-->
                <div class="free-box first">
                    <h2><span class="iconfont icon-free-scenery"></span>当地景点</h2>
                    <ul class="point-content">
                        <li  v-for="(item,index) in localScenic" :key="index"
                             class="item" @click="gotoDetail(item.id,'scenicDetail')">
                            <span class="address">{{item.province}}</span>
                            <img :src="item.mainPic" alt="">
                            <div class="point-desc">
                                <div class="descCont">{{item.mainTitle}}</div>
                                <div class="pricce">￥{{item.price}}<span>起</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--必备酒店-->
                <div class="free-box second">
                    <h2><span class="iconfont icon-home-hotel"></span>必备酒店</h2>
                    <ul class="point-content">
                        <li  v-for="(item,index) in recomHotel" :key="index"
                             class="item" @click="gotoDetail(item.id,'hotelDetail')">
                            <span class="address">{{item.count}}</span>
                            <img :src="item.mainPicture" alt="">
                            <div class="point-desc">
                                <div class="descCont">{{item.name}}</div>
                                <div class="pricce" v-if="item.price3 != '已售罄'">￥{{item.price3}}<span>起</span></div>
                                <div class="pricce" v-else>￥498<span>起</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--热门路线-->
                <div class="free-box third">
                    <h2><span class="iconfont icon-free-route"></span>热门套餐</h2>
                    <ul class="point-content">
                        <li  v-for="(item,index) in hotLine" :key="index"
                             class="item" @click="gotoDetail(item.id,'freeDetail')">
                            <img :src="item.desPic1" alt="">
                            <div class="point-desc">
                                <div class="descCont">{{item.mainTitle}}</div>
                                <div class="pricce">￥{{item.price}}<span>起</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--页尾-->
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import bannerMenu from '../components/bannerMenu';
    import searchBox from '../components/searchBox';
    import smallFoot from '../components/smallFoot'
    export default {
        name: "free-screen",
        components:{bannerMenu,smallFoot,searchBox},
        data(){
            return {
                startDes: '',
                arriveDes: '',
                /*当地景点----*/
                localScenic: [],
                /*必备酒店-----*/
                recomHotel: [],
                /*热门路线-----*/
                hotLine: [],
            }
        },
        methods:{
            /*查看内容跳转到详情页面，参数:id作为标志,path:跳转的地址*/
            gotoDetail(id,path){
                this.$router.push({
                    path:path,
                    query:{id:id}
                })
            },
            /*功能：更新景点数据*/
            initScenicData(){
                this.$https.post('/scenic/getList',{address:this.arriveDes}).then( res =>{
                    if(res.body.success){
                        this.localScenic = res.body.scenicList;
                    }
                })
            },
            /*功能：更新酒店数据*/
            initHotelData(){
                this.$https.post('/hotel/getByAddress',{locate:this.arriveDes,pageNum:0}).then( res =>{
                    if(res.body.success){
                        this.recomHotel = res.body.hotelList;
                    }
                })
            },
            /*功能：更新套餐*/
            initPackageData(){
                this.$https.post('/selfguid/getList',{arrivedAdd:this.arriveDes}).then( res =>{
                    if(res.body.success){
                        this.hotLine =res.body.selfGuidList;
                    }
                })
            }
        },
        created(){
            this.startDes = this.$route.query.startDes;
            this.arriveDes = this.$route.query.arriveDes;
            this.initScenicData();
            this.initHotelData();
            this.initPackageData();
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 80%;
        margin: 0 auto;
    }
    .freeScreenCont{
        min-height: 500px;
        .first{
            h2{
                color: #45bd9e;
            }
            .address{
                background-color: #45bd9e;
            }
        }
        .second{
            h2{
                color: #786ee6;
            }
            .address{
                background-color: #786ee6;
            }
        }
        .third{
            h2{
                color: #ffb80e;
            }
            .address{
                background-color: #ffb80e;
            }
        }
        .free-box{
            .iconfont{
                font-size: 28px;
                padding-right: 10px;
            }
            h2{
                border-bottom: 1px solid #eee;
                padding-bottom: 8px;
            }
            .point-content{
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 15px 0;
                img{
                    width: 100%;
                    height: 150px;
                }
                .item{
                    width: 23%;
                    margin-left: 20px;
                    position: relative;
                    cursor: pointer;
                    margin-bottom: 30px;
                    .address{
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        padding: 0 8px;
                        color: #fff;
                    }
                    .point-desc{
                        border: 1px solid #eee;
                        border-top: none;
                        padding: 10px;
                        color: #000;
                        .descCont{
                            overflow: hidden;
                            white-space: nowrap;
                            word-break: break-word;
                            text-overflow: ellipsis;
                        }
                        .pricce{
                            text-align: right;
                            color: #ff9d00;
                            font-size: 18px;
                            span{
                                font-size: 13px;
                                color: #999;
                            }
                        }
                    }
                    &:hover{
                        background-color: #eee;
                        box-shadow: 0 4px 10px 4px rgba(0,0,0,.2);
                    }
                }
            }
        }
    }
</style>