<template>
    <div class="person">
        <div class="topBg">
            <img src="../assets/person-bg.png" alt="">
        </div>
        <!--导航栏-->
        <div class="navigate">
            <ul class="navigateCenter">
                <li :class="{item:true,active:navIndex==1}" @click="navIndex = 1">我的窝</li>
                <li :class="{item:true,active:navIndex==2}" @click="navIndex = 2">我的游记</li>
                <li :class="{item:true,active:navIndex==3}" @click="navIndex = 3">我的足迹</li>
                <li :class="{item:true,active:navIndex==4}" @click="navIndex = 4">我的订单</li>
            </ul>
        </div>
        <!--修改信息页面-->
        <personChange v-show="navIndex==0"></personChange>
        <!--个人首页-->
        <personDefault @sendNavIndex="sendNavIndex" v-show="navIndex==1"></personDefault>
        <!--我的游记-->
        <personStrategy v-show="navIndex==2"></personStrategy>
        <!--我的足迹-->
        <personRoute v-show="navIndex==3"></personRoute>
        <!--我的订单-->
        <personOrder v-show="navIndex==4"></personOrder>
        <!--底部信息-->
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    /*默认显示首页*/
    import personDefault from '../components/person/personDefault'
    /*修改信息*/
    import personChange from '../components/person/personChange'
    /*我的游记*/
    import personStrategy from '../components/person/personStrategy'
    /*我的足迹*/
    import personRoute from '../components/person/personRoute'
    /*我的订单*/
    import personOrder from '../components/person/personOrder'
    /*底部广告栏*/
    import smallFoot from '../components/smallFoot'
    export default {
        name: "person",
        components:{
            personChange,
            personDefault,
            personStrategy,
            personRoute,
            personOrder,
            smallFoot
        },
        data(){
            return{
                account:'',
                navIndex:''  /*当前导航栏显示第几个*/
            }
        },
        methods:{
            /*获得来自个人中心传送得值*/
            sendNavIndex(value){
                this.navIndex=value;
            },
        },
        created(){
            this.navIndex = this.$route.query.navIndex;
            this.account = this.$store.state.account;
        }
    }
</script>

<style scoped lang="scss">
    .person {
        width: 100%;
        background-color: #ddd;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        /*头部的图片装饰*/
        .topBg{
           img{
               width: 100%;
           }
        }
        /*头部导航栏*/
        .navigate{
            width: 100%;
            height: 60px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            box-shadow: 0 2px 5px rgba(0,0,0,0.12);
            .navigateCenter{
                width: 60%;
                height: 100%;
                margin: 0 28%;
                padding-left: 0;
                list-style: none;
                line-height: 60px;
                display: flex;
                color: #000;
                font-size: 18px;
                .item{
                    flex: 1;
                    margin-right: 25px;
                    text-align: center;
                    cursor: pointer;
                }
                .active{
                    border-bottom:  2px solid #ff8a00;
                }
            }
        }
    }
</style>