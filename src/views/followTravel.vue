<template>
    <div class="follow">
        <bannerMenu nowActive='1'></bannerMenu>
        <div class="center">
            <!--搜索框-->
            <searchBox :arrive="arriveDes" title="跟团游" @searchMore="search"></searchBox>
            <!--限制条件-->
            <div class="restrict">
                <div class="option">
                    <div class="option-item ">全部</div>
                    <div class="option-item active">境内跟团游</div>
                    <div class="option-item">出境跟团游</div>
                </div>
                <div class="dateLimit">
                    出发时间：
                    <a-checkbox :checked="dateLimitList.length==0"
                                @focus="dateLimitList=[]">不限</a-checkbox>
                    <a-checkbox-group :options="dateLimit" v-model="dateLimitList"/>
                </div>
                <div class="priceLimit">
                    价格区间：
                    <a-checkbox :checked="priceLimitList.length==0"
                                @focus="priceLimitList=[]">不限</a-checkbox>
                    <a-checkbox-group :options="priceLimit" v-model="priceLimitList"/>
                </div>
                <div class="featureLimit">
                    产品特色：
                    <a-checkbox :checked="featureList.length==0"
                                @focus="featureList=[]">不限</a-checkbox>
                    <a-checkbox-group :options="featureLimit" v-model="featureList"/>
                </div>
            </div>
            <div class="restrictCont"
                 v-show="dateLimitList.length!=0||priceLimitList.length!=0||featureList.length!=0">
                <span>您已选择：</span>
                <div class="registItem">
                        <span  v-for="(item,index) in dateLimitList" :key="index">{{item}}
                            <span class="delete" @click="dateLimitList.splice(index,1)">✕</span>
                        </span>
                    <span  v-for="(item,index) in priceLimitList" :key="index+9">{{item}}
                            <span class="delete" @click="priceLimitList.splice(index,1)">✕</span>
                        </span>
                    <span  v-for="(item,index) in featureList" :key="index+13">{{item}}
                            <span class="delete" @click="featureList.splice(index,1)">✕</span>
                        </span>
                    <span class="deleteAll" @click="dateLimitList=priceLimitList=featureList=[]">全部清除</span>
                </div>
            </div>
            <!--主体内容-->
            <div class="mainContent">
                <div class="leftPart">
                    <div class="menuTitle">
                        <span class="active">综合排序</span>
                        <span >销量优先</span>
                        <span >价格<a-icon class="down" type="down" /></span>
                    </div>
                    <ul class="followContent" v-if="followContentDate.length!=0">
                        <li v-for="(item,index) in followContentDate" :key="index"
                            class="item"  @click="gotoDetail(item.id)">
                            <div class="picture"><img :src="item.desPic" alt="">
                                <span class="flag">{{item.type}}</span>
                            </div>
                            <div class="describe">
                                <h3>{{item.mainTitle}}</h3>
                                <div class="itemFlag">
                                    <span v-for="(cont,i) in item.feature" :key="i">{{featureLimit[cont-1]}}</span>
                                </div>
                                <div class="time">班期:{{item.date}} </div>
                                <div>
                                    <span class="price">￥<span class="num">{{item.price}}</span>起</span>
                                    <button>立即预定</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="widthoutContent" v-else>
                        <span>暂无此类自由行产品 再逛逛其他的～</span>
                    </div>
                    <a-pagination :current="current" :total="totalNum" :defaultCurrent="1" style="float: right;"
                                  :hideOnSinglePage="true" @change="gotoNextpage"/>
                </div>
                <div class="rightPart">
                    <div class="title">
                        <h3>热卖推荐</h3>
                        <ul class="hotContent">
                            <li class="item">
                                <div class="picture"><img src="../assets/follow-hot1.png" alt=""></div>
                                <div class="desc">
                                    <span class="title">北京直飞俄罗斯贝加尔湖5天4晚自由行（免费赠送签证）</span>
                                    <span class="price">￥2033起</span>
                                </div>
                            </li>
                            <li class="item">
                                <div class="picture"><img src="../assets/follow-hot2.png" alt=""></div>
                                <div class="desc">
                                    <span class="title">北京往返 美国一号公路+黄石国家公园深度16日（细品碧海蓝天阳光沙滩 深入狂野西部 探秘大峡谷南缘 羚羊谷彩穴 66号公路 黄石国家公园）</span>
                                    <span class="price">￥17800起</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <travelFoot></travelFoot>

    </div>
</template>
<script>
    import bannerMenu from '../components/bannerMenu';
    import travelFoot from '../components/travelFoot';
    import searchBox from '../components/searchBox';
    const dateLimit = ['2月','3月','4月','5月','6月','7月','8月','9月','10月'];
    const priceLimit = ['1000-2000','2000-3000','3000-5000','5000以上'];
    const featureLimit = ['全程无自费','含自由活动','纯玩无购物'];
    export default {
        name: "followTravel",
        components: {
            bannerMenu,
            travelFoot,
            searchBox
        },
        data(){
            return{
                /*限制条件-----筛选内容*/
                dateLimit,priceLimit,featureLimit,
                dateLimitList:[],
                priceLimitList:[],
                featureList:[],
                totalNum:0,//总页码
                current:1,/*当前页码*/
                followContentDate:[],
                followContentDateOld:[],//不能变的数据
                /*搜索的地点*/
                arriveDes:''
            }
        },
        watch:{
            'dateLimitList':function(newValue) {
                var newContent=[];
                var followList = this.followContentDate;
                if(this.priceLimitList.length==0&&this.featureList.length==0){
                    followList = this.followContentDateOld;
                }
                followList.forEach((item)=>{
                    newValue.forEach((date)=>{
                        if(item.month == parseInt(date))  {
                            newContent.push(item);
                        }
                    })
                })
                this.followContentDate = newContent;
                if(newValue.length==0&&this.priceLimitList.length==0&&this.featureList.length==0){
                    this.followContentDate =  this.followContentDateOld;
                    this.updateFollow();
                }
                this.totalNum = this.followContentDate.length;
            },
            'priceLimitList':function(newValue) {
                var newContent=[];
                var followList = this.followContentDate;
                if(this.dateLimitList.length==0&&this.featureList.length==0){
                    followList = this.followContentDateOld;
                }
                newValue.forEach((price)=>{
                   var priceNum =  price.split('-');
                    followList.forEach((item)=>{
                        if((item.price >=parseInt( priceNum[0]) )&& (item.price <= parseInt(priceNum[1]))){
                            newContent.push(item);
                        }
                    })
                })
                this.followContentDate = newContent;
                if(newValue.length==0&&this.dateLimitList.length==0&&this.featureList.length==0){
                    this.followContentDate =  this.followContentDateOld;
                    this.updateFollow();
                }
                this.totalNum = this.followContentDate.length;
            },
            'featureList':function(newValue) {
                var newContent=new Set();
                var featureType = [];
                var followList = this.followContentDate;
                if(this.priceLimitList.length==0&&this.dateLimitList.length==0){
                    followList = this.followContentDateOld;
                }
                newValue.forEach((feature)=>{
                    if(feature == '全程无自费'){
                        featureType.push(1);
                    }else if(feature == '含自由活动'){
                        featureType.push(2);
                    }else{
                        featureType.push(3);
                    }
                })
                followList.forEach((item)=>{
                    featureType.forEach((feType)=>{
                        item.feature.forEach((itemF)=>{
                            if( itemF == feType){
                                newContent.add(item);
                            }
                        })
                    })
                });
                this.followContentDate = newContent;
                if(newValue.length==0&&this.priceLimitList.length==0&&this.dateLimitList.length==0){
                    this.followContentDate =  this.followContentDateOld;
                    this.updateFollow();
                }
                if(this.followContentDate.size==0){
                    this.followContentDate=[];
                }
                this.totalNum = this.followContentDate.length;
            }
        },
        methods:{
            /*跳转到详情页面*/
            gotoDetail(id){
                this.$router.push({
                    path:'/followDetail',
                    query:{id:id}
                })
            },
            /*功能：搜索更多内容*/
            search(startDes,arriveDes){
                if(arriveDes){
                    this.updateFollow(arriveDes);
                    document.documentElement.scrollTop=380;
                }
            },
            /*翻页*/
            gotoNextpage(current){
                this.current = current;
                document.documentElement.scrollTop=380;
                this.updateFollow();
            },
            /*更新套餐数据*/
            updateFollow(arriveDes){
                var num = this.current-1;
                var param={};
                this.followContentDate = [];
                if(arriveDes){
                    param = {arrivedAdd:arriveDes,pageNum:num};
                }else{
                    param = {pageNum:num};
                }
                this.$https.post('follow/getList',param).then( res =>{
                    if(res.body.success){
                        this.totalNum = res.body.number;
                        res.body.followList.forEach((item)=>{
                            var feature = item.feature.split('-');
                            var month = item.date.split('-');
                            item.feature = feature;
                            item.month=month[1];
                            this.followContentDate.push(item);
                        })
                        this.followContentDateOld =  this.followContentDate;
                    }else{
                        this.$message.error(res.body.rspDesc);
                    }
                })
            },
        },
        created(){
            /*用于从首页跳转过来，重置内容*/
            this.arriveDes = this.$route.query.address;
            this.updateFollow();
        }
    }
</script>

<style  lang="scss">
    /*antd中多选框样式重置*/
    .ant-checkbox-wrapper + span, .ant-checkbox + span{
        font-size: 12px;
    }
    .ant-checkbox-checked .ant-checkbox-inner{
        background-color: #4b61c1;
        border: 1px solid #4b61c1;
    }
    .ant-checkbox-inner{
        width: 14px;
        height: 14px;
    }
    .ant-checkbox-group-item{
        margin-right: 12px;
    }
   /*居中，通用样式*/
    .center{
        width: 70%;
        margin: 0 auto;
    }
    /*限制条件*/
    .restrict{
        width: 100%;
        height: 150px;
        border: 1px solid #eee;
        margin-bottom: 20px;
        .option{
            background-color: #f4f4f4;
            height: 36px;
            line-height: 36px;
            text-align: center;
            border-bottom:1px solid #eee ;
            .option-item{
                width: 120px;
                height: 100%;
                float: left;
            }
            .active{
                background-color: #fff;
                font-weight: bold;
                color: #000;
                border-top: 2px solid #4b61c1;
            }
        }
        .dateLimit,.priceLimit,.featureLimit{
            height: 36px;
            line-height: 36px;
            margin:0  15px;
            font-size: 12px;
            border-bottom: 1px solid #eee;
        }
        .featureLimit{
            border-bottom: none;
        }
    }
    .restrictCont{
        margin-bottom: 10px;
        display: flex;
        >span{
            flex: 1;
            font-size: 12px;
            line-height: 23px;
        }
        .registItem{
            flex: 11;
            >span{
                display: inline-block;
                border: 1px solid #eee;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 1px 5px;
                font-size: 12px;
                .delete{
                    margin-left: 10px;
                    cursor: pointer;
                }
                &:hover{
                    border-color:#ccc ;
                }
            }
            .deleteAll{
                border: none;
                color: #4b61c1;
                cursor: pointer;
            }
        }
    }
    .mainContent{
        margin-bottom: 15px;
        position: relative;
        display: flex;
        .leftPart{
            flex: 4;
            margin-right: 20px;
            .menuTitle{
                height: 36px;
                line-height: 36px;
                &:after{
                    content: '';
                    display: block;
                    width: 410px;
                    height: 2px;
                    border-bottom: 1px solid #eee;
                    position: absolute;
                    right: 30%;
                    top: 36px;
                }
                span{
                    color: #333333;
                    display: inline-block;
                    padding: 0 15px;
                    text-align: center;
                    border-bottom: 1px solid #eee;
                    font-size: 12px;
                    .down{
                        padding-left: 10px;
                    }
                }
                .active{
                    color: #ff6e4a;
                    border: 1px solid #eee;
                    border-bottom: none;
                }
            }
            .followContent{
                margin-top: 20px;
                padding-left: 0;
                padding-right: 15px;
                list-style: none;
                .item{
                    display: flex;
                    padding: 15px;
                    margin-bottom: 20px;
                    cursor: pointer;
                    .picture{
                        flex: 1.3;
                        position: relative;
                        margin-right: 20px;
                        img{
                            width: 100%;
                        }
                        .flag{
                            position: absolute;
                            left: 0;
                            top: 0;
                            font-size: 12px;
                            color: #fff;
                            padding: 2px 5px;
                            background-color: #12bcc4;
                        }
                    }
                    .describe{
                        flex: 3;
                        h3{
                            overflow: hidden;
                            text-overflow: clip;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            font-weight: bold;
                        }
                        .time{
                            font-size: 11px;
                            color: #666;
                            margin: 5px 0;
                        }
                        .itemFlag{
                            margin-bottom: 10px;
                            span{
                                font-size: 12px;
                                color: #3aaeff;
                                padding: 0 2px;
                                border: 1px solid #3aaeff;
                                margin-right: 10px;
                            }
                        }
                        .price{
                            color: #ff6e4a;
                            .num{
                                font-size: 20px;
                            }
                        }
                         button{
                            border: 1px solid #ff6e4a;
                            background-color: #fff;
                            color: #ff6e4a;
                            float: right;
                            padding: 2px 10px;
                            &:hover{
                                color: #fff;
                                background-color: #ff6e4a;
                            }
                        }
                    }
                    &:hover{
                        background-color: #eee;
                        h3{
                            text-decoration: underline;
                        }
                    }
                }
            }
            .page{
                float: right;
            }
        }
        .rightPart{
            flex: 1.4;
            line-height: 36px;
            .hotContent{
                padding-left: 5px;
                list-style: none;
                .item{
                    display: flex;
                    margin-bottom: 20px;
                    cursor: pointer;
                    .picture{
                        flex: 2;
                        img{
                            width: 98%;
                        }
                    }
                    .desc{
                        flex: 3;
                        .title{
                            line-height: 16px;
                            overflow: hidden;
                            text-overflow: clip;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .price{
                            color: #ff6e4a;
                        }
                    }
                    &:hover{
                        color: #ff6e4a;
                    }
                }
            }
        }

    }
    .widthoutContent{
        width: 100%;
        text-align: center;
        padding: 100px 0;
        font-size: 20px;
        color: #666;
    }
</style>