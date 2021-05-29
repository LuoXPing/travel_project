<template>
    <div class="personStrategy">
        <div class="center">
            <div class="leftPart">
                <img :src="headPic" alt="">
                <div class="number">
                    我的游记数量：
                    <span class="num">{{strategy.length}}</span>
                </div>
                <div class="writeBtn" @click="gotoWrite">
                    <span class="iconfont icon-write"></span>
                    <span> 写游记</span>
                </div>
            </div>
            <div class="rightPart">
                <!--没有游记时显示的内容-->
                <div class="noneStrategy" v-if="strategy.length==0">
                    <h3>我的游记</h3>
                    <img src="../../assets/person-strage.jpg" alt="">
                </div>
                <div  v-for="(item,index) in strategy" :key="index" class="strategyBox">
                    <div  @click="gotoDetail(item.id)" class="pictureBox">
                        <img :src="item.picture1" alt="" v-if="item.picture1" >
                        <img src="http://localhost:8081/strategy/default.jpg" v-else>
                    </div>
                    <div class="describe">
                        <span class="title">{{item.mainTitle}}</span><br/>
                        <span class="time">{{item.travel_time}}</span>
                    </div>
                    <span class="address">/{{item.address}}/</span>
                    <div class="deleteBtn" @click="deleteStrategy(item.id)">删除</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personStrategy",
        data(){
            return{
                token:'',
                account:'',//用户的账户
                strategy:[]//用户游记
            }
        },
        computed: {
            headPic: function () {//用户头像地址
                return this.$store.state.headPic;
            }
        },
        methods:{
            /*功能：跳转到写游记的界面*/
            gotoWrite(){
                this.$router.push('writeStrategy');
            },
            /*功能：跳转到游记的详情界面，参数：id标识游记*/
            gotoDetail(id){
                this.$router.push({
                    path:'strategyDetail',
                    query:{id:id}
                })
            },
            /*功能：删除游记*/
            deleteStrategy(id){
                var params = {user_Id:this.account,id:id,token:this.token};
                var _this = this;
                this.$confirm({
                    title: "是否确认删除该游记",
                    okText:'确认',
                    cancelText:'取消',
                    onOk() {
                        _this.$https.post('/strategy/delete',params).then( res =>{
                            if(res.body.success){
                                _this.updateStrategy();
                                _this.$message.success(res.body.rspDesc);
                            }else{
                                this.$message.error(res.body.rspDesc);
                            }
                        })
                    },
                })
            },
            /*功能：获取游记的数据*/
            updateStrategy(){
                this.$https.post('/strategy/getPerson',{user_id:this.account}).then( res =>{
                    if(res.body.success){
                        this.strategy = res.body.strategyList;
                    }
                })
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
            this.updateStrategy();
        }
    }
</script>

<style scoped lang="scss">
    .personStrategy{
        padding: 20px;
        margin-bottom: 20px;
        .center{
            width: 75%;
            margin: 0 auto;
            display: flex;
        }
    }
    .leftPart{
        flex: 1;
        margin-right: 30px;
        height: 200px;
        background-color: #fff;
        position: relative;
        text-align: center;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            left: 25%;
            top: -140px;
        }
        .number{
            margin: 30px 0;
            font-size: 18px;
            .num{
                color: #ff8a00;
            }

        }
        .writeBtn{
            background-color: #ff9e00;
            color: #fff;
            display: inline-block;
            width: 140px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin: 0 auto;
        }
    }
    .rightPart{
        flex: 3;
        /*没有游记时显示*/
        .noneStrategy{
            width: 100%;
            height: 450px;
            background-color: #fff;
            box-shadow: 0 0 2px rgba(0,0,0,0.05);
            position: relative;
            h3{
                padding: 20px;
            }
            img{
                width: 100%;
            }

        }
        /*有游记时*/
        .strategyBox{
            width: 100%;
            height: 500px;
            background-color: #fff;
            box-shadow: 0 0 2px rgba(0,0,0,0.05);
            position: relative;
            padding: 30px 0;
            margin-bottom: 20px;
            .pictureBox{
                height: 400px;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 400px;
                }
            }
            .describe{
                padding: 10px 20px;
                float: left;
                .title{
                    color: #ff8a00;
                    font-weight: bold;
                    font-size: 18px;
                    padding-bottom: 10px;
                }
                .time{
                    font-size: 14px;
                    padding-left: 20px;
                    color: #999;
                }
            }
            .address{
                position: absolute;
                right: 30px;
                top: 45px;
                color: #fff;
                font-size: 25px;
            }
            .deleteBtn{
                cursor: pointer;
                margin-top: 15px;
                margin-right: 30px;
                width: 80px;
                height: 36px;
                float: right;
                background-color: #ff8a00;
                color: #fff;
                text-align: center;
                line-height: 36px;
                border-radius: 5px;
            }
        }

    }

</style>