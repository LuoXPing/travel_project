<template>
    <div class="strategyDetail">
        <!--背景-->
        <div class="topBg">
            <img :src="strategy.backPic" alt="">
        </div>
        <!--标题-->
        <div class="title">
            <div class="center">
                <div class="information">
                    <img :src="strategy.headPic" alt="">
                    <div class="des">
                        <span class="nickName">{{strategy.nickName}}</span>
                        <span>{{strategy.travel_time}}</span>
                    </div>
                </div>
                <!--文章的大标题-->
                <div class="articleTitle">{{strategy.mainTitle}}</div>
                <div class="support" @click="supportStrategy">
                    <a-icon type="like" class="like" :theme="theme"/>
                </div>
            </div>
        </div>
        <div class="DetailContent">
            <div class="center">
                <!--主要信息栏-->
                <ul class="messageBox">
                    <li class="item">
                        <span class="iconfont icon-stragegyDetail-time"></span>
                        <span>出发时间</span><span class="interval">/</span>
                        <span>{{strategy.travel_time}}</span>
                    </li>
                    <li class="item">
                        <span class="iconfont icon-stragegyDetail-days"></span>
                        <span>出行天数</span><span class="interval">/</span>
                        <span>{{strategy.duration}}天</span>
                    </li>
                    <li class="item">
                        <span class="iconfont icon-stragegyDetail-people"></span>
                        <span>人物</span><span class="interval">/</span>
                        <span>{{strategy.person}}</span>
                    </li>
                    <li class="item">
                        <span class="iconfont icon-stragegyDetail-price"></span>
                        <span>人均费用</span><span class="interval">/</span>
                        <span>{{strategy.cost}}RMB</span>
                    </li>
                </ul>
                <!--内容-->
                <div class="ContMain">
                    <!--目录-->
                    <div class="catalog" v-show="showCatalog">
                        <h3>游记目录</h3>
                        <ul>
                            <li class="item" v-for="(item,index) in content" :key="index"
                                v-show="item.pTitle">
                                <span class="serial">0{{index+1}}/</span>
                                <a class="cata" :href="item.href">{{item.pTitle}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="article">
                        <div  v-for="(item,index) in content" :key="index"
                             v-show="item.pTitle" :id="item.href" class="Part">
                            <h2>{{item.pTitle}}</h2>
                            <div>{{item.pArt}}</div>
                            <img :src="item.pic" alt="" v-show="item.pic">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import smallFoot from '../components/smallFoot'
    export default {
        name: "strategy-detail",
        components:{smallFoot},
        data(){
            return{
                theme:'outlined',
                showCatalog:false,//是否显示游记的标题
                id:'',
                account:'',
                token:'',
                strategy:{},
                content:[]
            }
        },
        methods:{
            handleScroll() {
                if(document.documentElement.scrollTop>300){
                    this.showCatalog=true;
                }else{
                    this.showCatalog=false;
                }
            },
            /*功能：点赞游记*/
            supportStrategy(){
                this.theme='filled';
                var num = this.strategy.supportNum++;
                var params = {user_Id:this.account,id:this.id,token:this.token,supportNum:num};
                if(this.account){
                    this.$https.post('/strategy/support',params).then( res =>{
                        var data = res.body;
                        if(data.success){
                            this.$message.success(data.rspDesc);
                        }else{
                            this.$message.error(data.rspDesc);
                        }
                    })
                }else{
                    this.$message.error("请先登录");
                }
            },
            /*功能：获取数据*/
            updateStratrgy(){
                this.$https.post('/strategy/getDetail',{id:this.id}).then( res =>{
                    if(res.body.success){
                        var strategy = res.body.strategy;
                        this.content = [
                            {pTitle:strategy.title1,pArt:strategy.article1,pic:strategy.picture1,href:'#part1'},
                            {pTitle:strategy.title2,pArt:strategy.article2,pic:strategy.picture2,href:'#part2'},
                            {pTitle:strategy.title3,pArt:strategy.article3,pic:strategy.picture3,href:'#part3'},
                            {pTitle:strategy.title4,pArt:strategy.article4,pic:strategy.picture4,href:'#part4'},
                            {pTitle:strategy.title5,pArt:strategy.article5,pic:strategy.picture5,href:'#part5'},
                            ];
                        this.strategy = strategy;
                    }
                })
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.account = this.$store.state.account;
            this.token = this.$store.state.token;
            this.updateStratrgy();
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
    .topBg{
        width: 100%;
        height: 370px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .title{
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #eee;
        box-shadow: 0 2px 0 rgba(0,0,0,0.05);
        .center{
            width: 70%;
            margin: 0 auto;
            height: 100%;
            position: relative;
            .information{
                width: 400px;
                height: 100%;
                float: left;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    position: relative;
                    top: -50px;
                }
                .des{
                    display: inline-block;
                    position: relative;
                    top: -15px;
                    left: 20px;
                    color: #acacac;
                    font-size: 13px;
                    .nickName{
                        color: #ff7200;
                        padding-right: 20px;
                        font-size: 16px;
                    }
                }
            }
            .articleTitle{
                color: #ccc;
                font-size: 25px;
                position: absolute;
                top: -65px;
                left: 130px;
                font-weight: bolder;
            }
            .support{
                float: right;
                width: 50px;
                height: 50px;
                line-height: 55px;
                border-radius: 50%;
                border: 1px solid  #ff9e00;
                text-align: center;
                margin-top: 20px;
                margin-right: 50px;
                cursor: pointer;
                .like{
                    font-size: 30px;
                    color: #ff9e00;
                }
            }
        }
    }
    .DetailContent{
        position: relative;
        .center{
            width: 70%;
            margin: 0 auto;
            padding: 20px;
        }
        .messageBox{
            width: 80%;
            height: 100px;
            margin-bottom: 20px;
            margin-left: 150px;
            border: 1px dashed #ccc;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            .item{
                width: 50%;
                line-height: 30px;
                .iconfont{
                    color: #ff9e00;
                    font-size: 20px;
                    padding-right: 10px;
                }
                .interval{
                    color: #ff9e00;
                    font-size: 12px;
                    padding:0 10px;
                }
            }
        }
        .ContMain{
            .catalog{
                width: 200px;
                padding: 10px;
                position: fixed;
                left: 150px;
                top: 200px;
                ul{
                    list-style: none;
                    padding-left: 20px;
                    .item{
                        line-height: 28px;
                        margin-bottom: 15px;
                        display: flex;
                        .serial{
                            flex: 1;
                            color: #ccc;
                            padding-right: 10px;
                        }
                        .cata{
                            flex: 5;
                            color: #333;
                            cursor: pointer;
                            font-size: 12px;
                            &:hover{
                                color: #ff9e00;
                            }
                        }
                    }
                }
            }
            .article{
                width: 80%;
                margin-left: 150px;
                .Part{
                    margin-bottom: 30px;
                    .h2{
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    img{
                        width: 100%;
                        height: 400px;
                    }
                    div{
                        line-height: 30px;
                        margin-bottom: 20px;
                    }
                }

            }
        }
    }

</style>