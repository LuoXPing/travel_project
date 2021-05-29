<template>
    <!--搜索框-->
    <div class="TravelSearchBox" @mouseleave="showSearch=false">
        <div class="icon">
            <img src="../assets/freePlane.png" alt="" v-if="title=='自由行'">
            <img src="../assets/follow-flag.png" alt="" v-else>
            <span class="word">{{title}}</span>
        </div>
        <div class="search">
           <div class="inputBox">
               <div class="start">
                   <input type="text" placeholder="输入出发地" v-model="startDes">
                   <span>出发</span>
               </div>
               <a-icon type="swap-right" class="arrow"/>
               <div class="arrive">
                   <input type="text" placeholder="请输入目的地名字"
                          @mouseenter="showSearch=true"  v-model="arriveDes">
               </div>
               <a-icon type="search" class="searchBtn" @click="searchMore"/>
           </div>
        </div>
        <div class="example" v-show="showSearch">
            <div v-for="(item,index) in searchMenu" :key="index" class="country">
                <h4>{{item.country}}</h4>
                <div v-for="(cont1,i) in item.content" :key="i" class="Line">
                    <div class="title">{{cont1.title}}</div>
                    <div class="MenuItems">
                        <span v-for="(cont2,j) in cont1.items" :key="j" @click="chooseArrive(cont2)">
                            {{cont2}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "searchBox",
        props:['arrive','title'],
        data(){
            return{
                showSearch:false,
                startDes:'福州',/*出发地*/
                arriveDes:'',
                /*搜索框推荐内容*/
                searchMenu: [
                    {country:'国内',content:[
                            {title:'热门',items:[ '厦门','成都','深圳','大理','西安','香格里拉','杭州','广州']}]
                    },
                    {country:'出境',content:[
                            {title:'日本',items:['东京','大阪','冲绳','北海道','镰仓','神户','奈良','名古屋']},
                            {title:'海岛',items:['象岛','巴厘岛','毛里求斯','塞班岛','西双版纳','长滩岛','圣托里尼']},
                            {title:'欧美',items:['美国','洛杉矶','旧金山','法国','俄罗斯','英国','贝加尔湖']},
                            {title:'港澳台',items:['香港','澳门','台湾']}]
                    }
                ],
            }
        },
        methods:{
            /*选择到达的地点*/
            chooseArrive(value){
                this.arriveDes=value;
                this.showSearch=false;
            },
            /*功能：搜索更多内容*/
            searchMore(){
                if(this.arriveDes){
                    if(this.title=='自由行'){
                        this.$router.push({
                            path:'freeScreen',
                            query:{
                                startDes:this.startDes,
                                arriveDes:this.arriveDes,
                            }
                        })
                    }else{
                        this.$emit('searchMore',this.startDes,this.arriveDes)
                    }
                }else{
                    this.$warning({
                        title: '请输入目的地，再进行搜索',
                        okText:'确认'
                    });
                }
            }
        },
        watch:{
            arrive:function(){
               this.arriveDes = this.arrive;
            }
        },
        created(){
            this.arriveDes = this.arrive;
        }
    }
</script>

<style scoped lang="scss">
    .TravelSearchBox{
        display: flex;
        height: 60px;
        margin-bottom: 20px;
        position: relative;
        .icon{
            flex: 1;
            img{
                height:  83%;
                margin-right: 10px;
                float: left;
            }
            .word{
                display: block;
                float: left;
                margin-top: 15px;
                font-size: 20px;
                font-weight: bold;
                color: #333;
            }
        }
        .search{
            flex: 5;
            .inputBox{
                width: 600px;
                background-color:#4b61c1;
                height: 38px;
                margin-top: 15px;
                border-radius: 4px;
                padding:5px;
                input{
                    width: 72%;
                    height: 100%;
                    border: none;
                    outline:  none;
                    border-radius: 2px;
                    padding-left: 8px;
                    color: #333;
                    &:hover{
                        outline:  none;
                    }
                }
                .start{
                    background-color: #fff;
                    width: 130px;
                    height: 100%;
                    border-radius: 2px;
                    span{
                        font-size: 12px;
                        line-height: 25px;
                        padding-left: 5px;
                    }

                }
                >div{
                    float: left;
                }
                .arrow{
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 20px;
                    padding: 0 10px;
                    float: left;
                }
                .arrive{
                    background-color: #fff;
                    height: 100%;
                    border-radius: 2px;
                    width: 55%;
                }
                .searchBtn{
                    font-size: 25px;
                    padding-left: 30px;
                    color: #fff;
                }
            }
        }
        .example{
            width: 400px;
            height: 300px;
            border: 1px solid #4b61c1;
            position: absolute;
            top: 60px;
            left: 35%;
            border-radius: 3px;
            background-color: #fff;
            padding: 10px 15px;
            z-index: 3;
            .country{
                h4{
                    color: #4b61c1;
                    font-weight: bold;
                }
                .Line{
                    display: flex;
                    margin-bottom: 7px;
                    font-size: 12px;
                    .title{
                        flex: 1;
                        color: #333;
                        font-weight: bold;
                    }
                    .MenuItems{
                        flex: 5;
                        display: flex;
                        flex-wrap: wrap;
                        span{
                            display: inline-block;
                            padding-right: 20px;
                            margin-bottom: 4px;
                            color: #666;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }

                }
            }

        }
    }
</style>