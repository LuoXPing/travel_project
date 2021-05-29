<template>
    <div class="dest">
        <!--顶部背景-->
        <div class="topPart">
            <div class="search">
                <div class="title">You can choose where you want to go</div>
                <div class="serchBox">
                    <input type="text" placeholder="想去哪. . ." v-model="address">
                    <a-button icon="search" class="searchBtn" @click="searchDes(address)"></a-button>
                </div>
                <div class="recomand">
                    <span @click="address='上海'">上海</span>
                    <span @click="address='厦门'">厦门</span>
                    <span @click="address='东京'">东京</span>
                    <span @click="address='杭州'">杭州</span>
                </div>
            </div>
        </div>
        <!--热门目的地-->
        <hotDestination @getMessage="chooseAddress"></hotDestination>
        <!--推荐目的地-->
        <div class="recomandDes">
            <div class="center">
                <h1>热门推荐</h1>
                <div class="recContent">
                    <div v-for="(item,index) in recomDes" :key="index"
                         @click="searchDes(item.address)" class="item">
                        <img :src="item.pic" :alt="item.address">
                        <span>{{item.address}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!--主题选择-->
        <div class="topicDes">
            <div class="center">
                <h1>主题精选</h1>
                <ul class="topicDesCont">
                    <li class="item" @click="gotoScreen(0)"><img src="../assets/des-topic.jpeg" alt=""><span class="desc">潜水</span></li>
                    <li class="item" @click="gotoScreen(1)"><img src="../assets/des-topic2.jpeg" alt=""><span class="desc">登山</span></li>
                    <li class="item" @click="gotoScreen(2)"><img src="../assets/des-topic3.jpeg" alt=""><span class="desc">古镇</span></li>
                    <li class="item" @click="gotoScreen(3)"><img src="../assets/des-topic4.jpeg" alt=""><span class="desc">美食</span></li>
                    <li class="item" @click="gotoScreen(4)"><img src="../assets/des-topic7.jpeg" alt=""><span class="desc">蜜月</span></li>
                    <li class="item" @click="gotoScreen(5)"><img src="../assets/des-topic5.jpeg" alt=""><span class="desc">雪景</span></li>
                    <li class="item" @click="gotoScreen(6)"><img src="../assets/des-topic8.jpeg" alt=""><span class="desc">亲子</span></li>
                    <li class="item" @click="gotoScreen(7)"><img src="../assets/des-topic6.jpeg" alt=""><span class="desc">星空</span></li>
                </ul>
            </div>
        </div>
        <travelFoot></travelFoot>
    </div>
</template>

<script>
    import travelFoot from '../components/travelFoot'
    import hotDestination from '../components/hotDestination'
    export default {
        name: "destination",
        components:{
            travelFoot,
            hotDestination
        },
        data(){
            return {
                recomDes:[
                    {address:'日本',pic:require('../assets/recomDes3.jpeg')},
                    {address:'内蒙古',pic:require('../assets/recomDes1.jpeg')},
                    {address:'香格里拉',pic:require('../assets/recomDes2.jpeg')},
                    {address:'哈尔滨',pic:require('../assets/recomDes7.jpeg')},
                    {address:'广东',pic:require('../assets/recomDes6.jpeg')},
                    {address:'青海',pic:require('../assets/recomDes5.jpeg')},
                    {address:'杭州',pic:require('../assets/recomDes4.jpeg')}
                ],
                address:''
            }
        },
        methods:{
            /*功能：搜索目的地，参数目的地*/
            searchDes(address){
                if(address){
                    this.$router.push({
                        path:'/destDetail',
                        query:{
                            address:address
                        }
                    })
                }else{
                    this.$message.error('请输入目的地');
                }
            },
            /*功能：热门目的地被选中传值*/
            chooseAddress(data){
                this.searchDes(data);
            },
            /*功能：跳转到筛选的页面，参数：id为第几个的标志*/
            gotoScreen(id){
                this.$router.push({
                    path:'destScreen',
                    query:{id:id}
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    /*居中公共样式---------*/
    .center {
        width: 80%;
        margin: 0 auto;
        text-align: center;
    }
    .topPart{
        width: 100%;
        height: 600px;
        min-width: 1150px;
        background: url('../assets/dest-bg.jpg' ) no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        .search {
            width: 400px;
            height: 130px;
            position: absolute;
            left: 10%;
            top: 40%;
            color: #fff;
            background-color: rgba(0, 0, 0, .6);
            padding: 15px;
            border-radius: 10px;
            .title {
                font-size: 18px;
            }
            .serchBox {
                input {
                    width: 300px;
                    height: 36px;
                    border-radius: 5px;
                    border: none;
                    padding-left: 15px;
                    color: #666;
                    margin: 10px 0;
                    &:focus {
                        border: none;
                        outline: none;
                    }
                }
                .searchBtn {
                    width: 40px;
                    height: 36px;
                    background-color: #4b61c1;
                    margin-left: 10px;
                    border: none;
                    font-size: 20px;
                    color: #fff;
                }
            }
            .recomand {
                width: 50%;
                display: flex;
                font-size: 13px;
                span {
                    flex: 1;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .recomandDes{
        width: 100%;
        padding: 30px 0;
        background-color: #fafafa;
        border-bottom: 1px solid #ccc;
        .recContent{
               width: 100%;
               display: flex;
               flex-wrap: wrap;
               .item{
                   position: relative;
                   margin-left: 10px;
                   margin-bottom: 20px;
                   cursor: pointer;
                   img{
                       width: 100%;
                   }
                   span{
                       position: absolute;
                       left: 10px;
                       bottom: 20px;
                       font-size: 20px;
                       color: #fff;
                   }
               }
               .item{
                   width: 23%;
               }
               .item:nth-of-type(-n+3){
                   width: 31%;
               }

           }
    }
    .topicDes{
        padding: 20px 0;
        margin-bottom: 20px;
        .topicDesCont{
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding-left: 0;
            .item{
                width: 23%;
                margin-right: 13px;
                margin-bottom: 20px;
                position: relative;
                cursor: pointer;
                &:nth-of-type(4n){
                    margin-right: 0;
                }
                img{
                    width: 100%;
                }
                .desc{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    text-align: left;
                    padding-left: 20px;
                    width:98%;
                    height: 50px;
                    color: #fff;
                    font-size: 20px;
                    font-weight: 500;
                }
            }

        }
    }
</style>