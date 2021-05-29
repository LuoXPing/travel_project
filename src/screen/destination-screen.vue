<template>
    <div class="destination-screen">
        <div class="screen">
            <div class="center">
                <div class="breadcrumb">
                    目的地<a-icon type="right" class="icon"/>目的地筛选
                </div>
                <h2>目的地筛选</h2>
                <div class="restrict">
                    <span class="title">主题</span>
                    <div class="content">
                        <span :class="{focus:id==0}" @click="id=0">潜水</span>|
                        <span :class="{focus:id==1}" @click="id=1">登山</span>|
                        <span :class="{focus:id==2}" @click="id=2">古镇</span>|
                        <span :class="{focus:id==3}" @click="id=3">美食</span>|
                        <span :class="{focus:id==4}" @click="id=4">蜜月</span>|
                        <span :class="{focus:id==5}" @click="id=5">雪景</span>|
                        <span :class="{focus:id==6}" @click="id=6">亲子</span>|
                        <span :class="{focus:id==7}" @click="id=7">星空</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mainCont">
            <div class="center">
                <ul>
                    <li v-for="(item,index) in recomContent[id]" :key="index"
                        @click="gotoDetail(item.name)">
                        <img :src="require(`../assets/destScreen/${item.pic}.jpeg`)" alt="">
                        <span class="address">{{item.name}}</span>
                        <p>{{item.desc}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import smallFoot from '../components/smallFoot'
    export default {
        name: "destination-screen",
        components:{smallFoot},
        data(){
            return{
                /*当前选中的主题*/
                id:0,
                recomContent:[
                    [{pic:'item1',name:'巴厘岛',desc:'岛上热带植被茂密，万种风情，景物甚为绮丽，因此也叫天堂之岛'},
                     {pic:'item2',name:'沙巴',desc:'沙巴州拥有景致优美的沙滩、珊瑚群围绕的小岛、峥嵘的山峦和原始神秘的热带雨'},
                     {pic:'item3',name:'甲米',desc:'这个犹如天堂的热带岛屿，周围零星散落着30多个离岛，如珍珠般点缀着这片海域。'},
                     {pic:'item4',name:'长滩岛',desc:'长滩岛拥有长达4公里被誉为“世界上最细的沙滩”的白色沙滩，拥有着洁白沙滩'},
                     {pic:'item5',name:'仙本那',desc:'仙本那位于马来西亚沙巴州南部，洁白的沙滩、高耸的椰树、五颜六色的海底景观'},
                     {pic:'item6',name:'亚庇',desc:'这里有绝佳的阳光和海滩，深受潜水爱好者们的喜爱'},
                     {pic:'item7',name:'毛里求斯',desc:'毛里求斯作为火山岛国，四周被珊瑚礁环绕，岛上地貌千姿百态，景色颇为壮观。'},
                     {pic:'item8',name:'垦丁',desc:'垦丁位于台湾南端的屏东县恒春半岛，三面环海，常年风平浪静，阳光普照'}
                    ],
                    [{pic:'mount1',name:'张家界',desc:'九寨沟看水，张家界看山'},
                     {pic:'mount2',name:'黄山',desc:'五岳归来不看山，黄山归来不看岳'},
                     {pic:'mount3',name:'长白山',desc:'中国十大名山之一，素有"千年积雪万年松，直上人间第一峰"的美誉。'},
                     {pic:'mount4',name:'尼泊尔',desc:'海拔8000米以上的雪山让人神往，拥有佛教与印度教背景的熏陶及悠久的人文历史'},
                     {pic:'mount5',name:'香格里拉',desc:'香格里拉有独特的融雪山、峡谷、草原、高山湖泊、原始森林和民族风情为一体'},
                     {pic:'mount6',name:'峨眉山',desc:'峨眉山以其“雄、秀、神、奇、灵”和深厚的佛教文化蜚声中外。'},
                     {pic:'mount7',name:'华山',desc:'奇险天下第一山，蜿蜒险峻，危崖仄道众多，华山的千姿万态'},
                     {pic:'mount8',name:'泰山',desc:'泰山是中国历史上唯一受过皇帝封禅的名山，享有“五岳之首”、“天下第一山”.'},
                     {pic:'mount9',name:'五台山',desc:'中国佛教建筑最早地方之一，当今中国唯一兼有汉地佛教和藏传佛教的佛教道场。'},
                     {pic:'mount10',name:'庐山',desc:'在老别墅里寻找定格的时光，追忆父辈庐山恋的记忆。'},
                    ],
                    [{pic:'town1',name:'清迈',desc:'这里的泰式按摩，特色美食还有那穿梭在街道中的摩托车'},
                     {pic:'town2',name:'丽江',desc:'丽江被联合国教科文组织列为“世界文化遗产”城市，'},
                     {pic:'town3',name:'大理',desc:'大理有上关风、下关花、苍山雪、洱海月四个著名景点'},
                     {pic:'town4',name:'乌镇',desc:'“鱼米之乡，丝绸之府”，典型江南水乡，乌镇完整地保存着晚清和民国时期'},
                     {pic:'town5',name:'周庄',desc:'“上有天堂，下有苏杭，中间有个周庄”，周庄有“中国第一水乡”之美誉'},
                     {pic:'town6',name:'平遥',desc:'中国保存最为完好的四大古城之一，已有2700多年历史。'},
                     {pic:'town7',name:'同里',desc:'“东方小威尼斯”，醇正水乡，薄雾、轻烟、暮霭的江南古镇。'},
                    ],
                    [{pic:'food1',name:'重庆',desc:'重庆的美食丰富多样，其中当以火锅和小面冠绝，美食街也热闹非凡。'},
                     {pic:'food2',name:'广州',desc:'除了在老字号粤菜馆一品精致的粤菜，早茶的各色小吃也不容错过。'},
                     {pic:'food3',name:'南京',desc:'“中国四大古都”，到处都有时代侵蚀的遗痕，六朝的兴废、王谢的风流...'},
                     {pic:'food4',name:'台北',desc:'秀美的阳明山、舒适的北投温泉、热情好客的原住民、繁华喧闹的时尚街区...'},
                     {pic:'food5',name:'武汉',desc:'武汉菜的花色品种较多，注重刀工火候，讲究配色与造型...'},
                     {pic:'food6',name:'长沙',desc:'湘菜是全国八大菜系之一，以其油重色浓突出，尤以酸、辣、香、鲜、腊见长'},
                     {pic:'food7',name:'名古屋',desc:'名古屋特有的鳗鱼饭吃法，一共有三个步骤，首先是将鳗鱼饭盛至碗內'},
                    ],
                    [{pic:'moon1',name:'新西兰',desc:'在新西兰的土地上，满眼苍翠，牛羊遍地，环境清新，生活安逸，美得仿佛电影场...'},
                     {pic:'moon2',name:'北海道',desc:'拥有广阔的森林、山川、湿原等多彩的大自然，迷人的雪景闻名于世'},
                     {pic:'moon3',name:'巴黎',desc:'巴黎是法国的首都和最大城市，也是法国的政治文化中心，被誉为浪漫之都。'},
                     {pic:'town4',name:'乌镇',desc:'“鱼米之乡，丝绸之府”，典型江南水乡，乌镇完整地保存着晚清和民国时期'},
                     {pic:'item1',name:'巴厘岛',desc:'岛上热带植被茂密，万种风情，景物甚为绮丽，因此也叫天堂之岛'},
                     {pic:'item7',name:'毛里求斯',desc:'毛里求斯作为火山岛国，四周被珊瑚礁环绕，岛上地貌千姿百态，景色颇为壮观。'},
                     {pic:'item4',name:'长滩岛',desc:'长滩岛拥有长达4公里被誉为“世界上最细的沙滩”的白色沙滩，拥有着洁白沙滩'},
                     {pic:'food7',name:'名古屋',desc:'名古屋特有的鳗鱼饭吃法，一共有三个步骤，首先是将鳗鱼饭盛至碗內'},
                     {pic:'food4',name:'台北',desc:'秀美的阳明山、舒适的北投温泉、热情好客的原住民、繁华喧闹的时尚街区...'},
                    ],
                    [{pic:'snow1',name:'哈尔滨',desc:'黑龙江省省会，世界冰雪文化的发源地之一。可到索菲亚大教堂看白鸽飞舞.'},
                     {pic:'snow2',name:'漠河',desc:'位于大兴安岭北麓，中国版图的最北端可看繁星满天的静谧村庄'},
                     {pic:'snow3',name:'富士山',desc:'矗立在东京西部，是世界上最大的活火山之一，也是日本的象征.可去登山徒步'},
                     {pic:'moon2',name:'北海道',desc:'拥有广阔的森林、山川、湿原等多彩的大自然，迷人的雪景闻名于世'},
                     {pic:'mount3',name:'长白山',desc:'中国十大名山之一，素有"千年积雪万年松，直上人间第一峰"的美誉。'},
                     {pic:'snow4',name:'雪乡',desc:'中国北方的童话世界，距离哈尔滨有约七个小时的车程爸爸去哪儿的拍摄地'},
                    ],
                    [{pic:'par1',name:'北京',desc:'北京，无处不在的历史和文化。无限的摩登元素与老北京地道的京味儿相互交融'},
                     {pic:'par2',name:'香港',desc:'迪士尼和海洋公园都是孩子们的最爱。'},
                     {pic:'par3',name:'大阪',desc:'大阪环球影城除了原汁原味的好莱坞大片的惊险项目，还有针对亚洲游客开设...'},
                     {pic:'par4',name:'冲绳',desc:'除了具有东南亚、中国、日本的民俗风情建筑外，较日本本土更具有独特的美式风'},
                     {pic:'par5',name:'新加坡',desc:'新加坡环球影城坐落在圣淘沙岛名胜世界内，是东南亚唯一一个环球影城。'},
                     {pic:'par6',name:'青岛',desc:'“红瓦绿树，碧海蓝天”的城市风景；欧陆风格的多国建筑；这是座中西合璧'},
                     {pic:'par7',name:'日照',desc:'日照因“日出初光先照”而得名，被称为“亚洲最早出现的城市”。'},
                    ],
                    [{pic:'mount4',name:'尼泊尔',desc:'海拔8000米以上的雪山让人神往，拥有佛教与印度教背景的熏陶及悠久的人文历史'},
                     {pic:'starry1',name:'新疆',desc:'举世闻名的歌舞之乡、瓜果之乡；河流、湖泊、草原、戈壁、沙漠交织，风景风情'},
                     {pic:'starry2',name:'乌鲁木齐',desc:'当你打开西域的大门，那不仅有纯净的天山天池，还有灿烂欢笑的维吾尔族姑娘。'},
                     {pic:'starry3',name:'喀纳斯',desc:'神秘的湖怪、古朴的土瓦人、变换的湖水、眩人的风景，以不可抵挡的魔力召唤着...'},
                     {pic:'starry4',name:'额济纳旗',desc:'额济纳旗是拥有悠久历史和深厚文化底蕴的多民族聚居区，以其独特的文化传统和'},
                    ],
                ]
            }
        },
        methods:{
            gotoDetail(address){
                this.$router.push({
                    path:'/destDetail',
                    query:{
                        address:address
                    }
                })
            }

        },
        created(){
            this.id = this.$route.query.id;
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 70%;
        margin: 0 auto;
    }
    /*头部导航栏*/
    .screen{
        padding: 20px;
        border-bottom: 1px solid #e4e4e4;
        .breadcrumb{
            font-size: 12px;
            .icon{
                padding: 0 5px;
            }
        }
        h2{
            margin: 10px 0;
        }
        .restrict{
            margin: 20px 0;
            display: flex;
            .title{
                flex: 1;
                color: #333;
            }
            .content{
                flex: 8;
                color: #ddd;
                span{
                    display: inline-block;
                    width: 90px;
                    text-align: center;
                    color: #666;
                    cursor: pointer;
                    &:hover{
                        color: #4b61c1;
                        text-decoration: underline;
                    }
                }
                .focus{
                    color: #4b61c1;
                    font-weight: bold;
                }
            }
        }
    }
    /*主要内容*/
    .mainCont{
        background-color: #fafafa;
        ul{
            padding: 30px 10px;
            display: flex;
            list-style: none;
            flex-wrap: wrap;
            li{
                width: 31%;
                margin-right: 30px;
                border: 1px solid #e4e4e4;
                margin-bottom: 40px;
                position: relative;
                cursor: pointer;
                &:nth-of-type(3n){
                    margin-right: 0;
                }
                img{
                    width: 100%;
                }
                .address{
                    position: absolute;
                    left: 40%;
                    top: 120px;
                    color: #fff;
                    font-size: 20px;
                }
                p{
                    padding: 10px 20px;
                    line-height: 20px;
                    color: #333;
                }
            }
        }
    }

</style>