<template>
    <div class="order">
        <div class="center">
            <img :src="headPic" alt="" class="head">
            <ul class="navigateMenu">
                <li :class="{item:true,active:navindex==0}" @click="navindex=0">全部</li>
                <li :class="{item:true,active:navindex==1}" @click="navindex=1">待支付</li>
                <li :class="{item:true,active:navindex==2}" @click="navindex=2">待出行</li>
                <li :class="{item:true,active:navindex==3}" @click="navindex=3">取消</li>
            </ul>
            <div class="order-content" v-if="orderDate[navindex].length">
                <div class="item" v-for="(item,index) in orderDate[navindex]" :key="index">
                    <div class="pic">
                        <img :src="item.picture" alt="">
                        <span class="tip" v-if="item.type==1">待支付</span>
                        <span class="tip" v-if="item.type==2">待出行</span>
                        <span class="tip" v-if="item.type==3">取消</span>
                        <span class="tip" v-if="item.type==4">失效</span>
                    </div>
                    <div class="desc">
                        <h3>{{item.des}}</h3>
                        <span class="price">￥{{item.price}}</span>
                        <span class="time" v-show="item.date">出行日期为:&nbsp;{{item.date}}</span>
                        <div class="payBtn" v-if="item.type=='1'"
                             @click="payMoney(item.id)">支付</div>
                        <div class="cancelBtn" @click="cancelItem(item.id)"
                             v-if="item.type=='1'||item.type=='2'">取消</div>
                    </div>
                </div>
            </div>
            <div class="noneOrder" v-else>
                <div class="cont">
                    <img src="../../assets/nonePersonOrder.png" alt="">
                    <span class="none">暂无相关订单</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "personOrder",
        data(){
            return{
                account:'',
                token:'',
                navindex:'',
                orderDate:[
                    [], //全部
                    [], //待支付  type ==1
                    [], //待出行（已支付） type==2
                    [] //取消type==3
                ]
            }
        },
        computed: {
            headPic: function () {//用户头像地址
                return this.$store.state.headPic;
            }
        },
        methods:{
            /*支付订单*/
            payMoney(id){
                var _this =this;
                this.$confirm({
                    title: '是否确认进行支付',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        _this.updateOrderType(2,id);
                        _this.refreshDate();
                        _this.$message.success('支付成功');
                    }
                })
            },
            /*取消订单*/
            cancelItem(id){
                var _this =this;
                this.$confirm({
                    title: '是否确认取消该订单',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        _this.updateOrderType(3,id);
                        _this.refreshDate();
                        _this.$message.success('取消成功');
                    }
                })
            },
            /*更新数据*/
            refreshDate(){
               this.orderDate[1] =[]; this.orderDate[2] =[];this.orderDate[3]=[];
                this.$https.post('order/init',{userAccount:this.account}).then( res =>{
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    if(res.body.success){
                        res.body.OrderList.forEach((item)=>{
                            var depdate = item.date.split('-');
                            if( depdate[0]>year|| (depdate[0]<year&&depdate[1]>month)
                                ||(depdate[0]<year&&depdate[1]<month&&depdate[1]>day) ){
                                item.type = 4;
                                this.updateOrderType(4,item.id);
                            }
                            if(item.type==='1'){
                               this.orderDate[1].push(item);
                            }else if(item.type==='2'){
                               this.orderDate[2].push(item);
                           }else{
                               this.orderDate[3].push(item);
                           }
                        })
                        this.navindex =0;
                        this.orderDate[0] = this.orderDate[1].concat(this.orderDate[2],this.orderDate[3]);
                    }
                })
            },
            //修改订单的状态
            updateOrderType(type,id){
                var param = {userAccount:this.account,id:id,type:type,token:this.token};
                this.$https.post('order/modifyInfo',param);
            }
        },
        created(){
            this.account =this.$store.state.account;
            this.token =this.$store.state.token;
            this.refreshDate();
        },
    }
</script>

<style scoped lang="scss">
    .order{
        .center{
            width: 75%;
            margin: 20px auto;
            background-color: #fff;
            position: relative;
            .head{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                position: absolute;
                left: 10%;
                top: -140px;
            }
        }
        .navigateMenu{
            list-style: none;
            display: flex;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #d5d5d5;
            .item{
                flex: 1;
                margin-right: 100px;
                color: #666;
                font-weight: bold;
                padding-bottom: 10px;
                cursor: pointer;
            }
            .active{
                color: #ff8a00;
                border-bottom:1px solid #ff8a00 ;
            }
        }
        /*没有订单*/
        .noneOrder{
            height: 400px;
            position: relative;
            .cont{
                position: absolute;
                left: 38%;
                top: 30%;
                text-align: center;
                .none{
                    display: block;
                    margin-top: 30px;
                    color: #000;
                    font-size: 20px;
                }
            }

        }
        /*有订单*/
        .order-content{
            padding: 20px 40px;
             min-height: 300px;
            .item{
                position: relative;
                background-color: #eee;
                display: flex;
                padding: 20px;
                height: 150px;
                margin-bottom: 20px;
                .pic{
                    flex: 1;
                    position: relative;
                    img{
                        height: 120px;
                        width: 100%;
                    }
                    .tip{
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: rgba(0,0,0,.7);
                        color: #fff;
                        font-size: 12px;
                        padding: 3px 5px;
                    }
                }
                .desc{
                    flex: 3;
                    margin-left: 20px;
                    h3{
                        word-wrap: break-word;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2;
                        padding-top: 13px;
                    }
                    .price{
                        color: #ff8a00;
                        font-size: 18px;
                        padding-right: 20px;
                    }
                    .time{
                        color: #000;
                    }
                    .payBtn,.cancelBtn{
                        width: 80px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        color: #fff;
                        background-color: #ff8a00;
                        border-radius: 5px;
                        position: absolute;
                        right: 20px;
                        bottom: 10px;
                        cursor: pointer;
                    }
                    .payBtn{
                        right: 120px;
                    }
                }
            }
        }

    }


</style>