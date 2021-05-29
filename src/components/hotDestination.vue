<template>
    <div class="hotDestination">
        <div class="hotDesCenter" >
            <h1>热门目的地</h1>
            <div class="country">
                    <span v-for="(item,index) in hotDestination" :key="index"
                          @mouseenter="choosePro(item.country)" :class="{active:currMenu==index}">{{item.country}}</span>
            </div>
            <div class="province">
                <div class="item" v-for="(pro,i) in curPro" :key="i">
                    <div class="pro-big">{{pro.mainPro}}</div>
                    <div class="Scenic">
                        <span v-for="(Scenic,j) in pro.Scenic" :key="j" @click="sendMessage(Scenic)">{{Scenic}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hotDestination",
        data(){
            return{
                hotDestination:[
                    {country:'国内',province:[
                            { mainPro:'热门', Scenic:['厦门','成都','深圳','大理','西安']},
                            { mainPro:'云南', Scenic:['丽江','大理','昆明','香格里拉','西双版纳']},
                            { mainPro:'四川', Scenic:['成都','九寨沟']},
                            { mainPro:'浙江', Scenic:['杭州','乌镇','西塘']},
                            { mainPro:'福建', Scenic:['厦门','鼓浪屿','泉州','武夷山']},
                            { mainPro:'广东', Scenic:['广州','深圳','珠海','汕头']},
                            { mainPro:'内蒙古', Scenic:['呼伦贝尔','阿尔山']},
                            { mainPro:'东北', Scenic:['长白山','大连','哈尔滨','长春']},
                            { mainPro:'海南', Scenic:['三亚','海口','西沙']},
                        ]},
                    {country:'港澳台',province:[
                            { mainPro:'台湾', Scenic:['台北','垦丁','花莲','高雄','台中','阿里山']},
                            { mainPro:'香港'},
                            { mainPro:'澳门'}
                        ]},
                    {country:'日本',province:[
                            { mainPro:'日本', Scenic:['东京','大阪','冲绳','北海道','镰仓','神户','奈良','名古屋']},
                        ]},
                    {country:'欧洲',province:[
                            { mainPro:'冰岛', Scenic:['雷克雅未克','维克']},
                            { mainPro:'俄罗斯', Scenic:['莫斯科','贝加尔湖']}
                        ]},
                    {country:'美洲',province:[
                            { mainPro:'美国', Scenic:['洛杉矶','夏威夷','华盛顿','旧金山','纽约']}
                        ]}
                ],
                currMenu:0,
                curPro:null,
            }
        },
        methods:{
            choosePro(curCountry){
                this.hotDestination.some((item,index)=>{
                    if (item.country == curCountry){
                        this.currMenu=index;
                        this.curPro = item.province;
                        return;
                    }
                })
            },
            /*传值给父组件*/
            sendMessage(scenic){
                this.$emit('getMessage',scenic)
            }
        },
        created(){
            this.choosePro('国内');
        }
    }
</script>

<style scoped lang="scss">
    .hotDestination{
        padding: 30px 0;
        border-bottom: 1px solid #ccc;
        .hotDesCenter{
            margin: 0 auto;
            width: 80%;
            text-align: center;
            .country{
                width: 60%;
                margin: 0 auto;
                display: flex;
                >span{
                    flex: 1;
                    font-size: 17px;
                    cursor: pointer;
                    border-left: 1px solid #ccc;
                    font-weight: 600;
                    padding-bottom: 5px;
                    &:first-of-type{
                        border: none;
                    }
                    &:hover,&:focus,&:active{
                        color: #4b61c1;
                        text-decoration: underline;
                    }
                }
                .active{
                    color: #4b61c1;
                    text-decoration: underline;
                }
            }
            .province{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 40px 30px;
                .item{
                    width: 47%;
                    border-bottom: 1px dashed #eee;
                    display: flex;
                    flex-wrap: wrap;
                    text-align: left;
                    padding: 20px 0;
                    &:nth-of-type(2n){
                        margin-left: 30px;
                    }
                    .pro-big{
                        flex: 1;
                        line-height: 50px;
                        font-weight: 600;
                        text-decoration: underline;
                    }
                    .Scenic{
                        flex: 5;
                        display: flex;
                        flex-wrap: wrap;
                        span{
                            width: 80px;
                            padding: 10px 0;
                            cursor: pointer;
                            &:hover{
                                color: #4b61c1;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }

        }
    }

</style>