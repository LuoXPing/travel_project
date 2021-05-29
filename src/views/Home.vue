<template>
  <div class="home">
    <!--轮播图-->
    <div class="carousel">
      <a-carousel autoplay>
        <div class="item" v-for="(item,index) in carouselData" :key="index">
          <div class="desc">
            <span><span style="font-size: 30px">5</span>{{item.date}}</span><br/>
            <span>{{item.desc}}</span>
          </div>
          <!--来源-->
          <div class="author">
            <span>本图片来源于</span>
            <span style="color: #4b61c1;">{{item.address}}</span>
            <span>，由</span>
            <span style="color: #4b61c1;">{{item.author}}</span>
            <span>拍摄</span>
          </div>
          <img :src="item.src"/>
        </div>
      </a-carousel>
      <!--搜索框-->
      <div class="search">
        <div class="searchMenu">
          <div :class="{btn:true, active:searchBtn=='dest'}" @click="searchBtn='dest'"></div>目的地
          <div :class="{btn:true, active:searchBtn=='hotel'}" @click="searchBtn='hotel'"></div>酒店
          <div :class="{btn:true, active:searchBtn=='ticket'}" @click="searchBtn='ticket'"></div>机票
        </div>
        <div class="serchBox">
          <span class="dest" v-show="searchBtn=='dest'">
            <input type="text" placeholder="旅游目的地" v-model="startAddress">
          </span>
          <span class="hotel"  v-show="searchBtn=='hotel'">
            <input type="text" placeholder="北京" v-model="startAddress">
            <a-range-picker @change="onChange" class="dataInput"/>
          </span>
          <span class="ticket"  v-show="searchBtn=='ticket'">
            <input type="text" placeholder="出发地" v-model="startAddress">
            <input type="text" placeholder="到达地" v-model="endAddress">
            <a-date-picker placeholder="选择时间" @change="onChanges" v-model="startTime"/>
          </span>
          <a-button icon="search" class="searchBtn" @click="searchThing"></a-button>
        </div>
      </div>
    </div>
    <!--菜单-->
    <div class="menu">
      <ul class="centerContent">
        <li class="item" @click="handleNavigate(3)">
          <div class="word">
            <router-link class="title" to="/free">自由行</router-link><br/>
            <span class="detail">旅行就要更自在</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-free"></span>
          </div>
        </li>
        <li class="item" @click="handleNavigate(3)">
          <div class="word">
            <router-link class="title" to="/follow">跟团游</router-link><br/>
            <span  class="detail">行程透明省心游</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-flag"></span>
          </div>
        </li>
        <li class="item" @click="handleNavigate(2)">
          <div class="word">
            <router-link class="title" to="/strategy">攻略</router-link><br/>
            <span  class="detail">最地道的玩法和体验</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-balloon"></span>
          </div>
        </li>
        <li class="item" @click="handleNavigate(4)">
          <div class="word">
            <router-link to="/ticket" class="title">机票</router-link><br/>
            <span  class="detail">特惠一折起</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-plane"></span>
          </div>
        </li>
        <li class="item" @click="handleNavigate(5)">
          <div class="word">
            <router-link class="title" to="/hotel">订酒店</router-link><br/>
            <span  class="detail">一键全网比价</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-hotel"></span>
          </div>
        </li>
        <li class="item" @click="handleNavigate(3)">
          <div class="word">
            <router-link to="/passport" class="title">签证</router-link><br/>
            <span  class="detail">出签率高服务佳</span>
          </div>
          <div class="icon">
            <span class="iconfont icon-menu-passport"></span>
          </div>
        </li>
      </ul>
    </div>
    <!--推荐购买-->
    <div class="centerContent">
      <div class="hot" v-for="(item,index) in recomend" :key="index">
        <h2>{{item.title}}</h2>
        <ul>
          <li v-for="(cont,i) in item.content" :key="i"
              class="item" @click="gotoDeatil(cont.id)">
            <div class="picture">
              <img :src="cont.desPic1">
            </div>
            <div class="box">
              <div class="describe">{{cont.mainTitle}}</div>
              <div class="price"><b>￥{{cont.price}}</b>起</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--保障-->
    <div class="guarantee">
      <ul class="centerContent">
        <li><span class="iconfont icon-home-sun"></span> <br/><span class="describe">眼光保证</span></li>
        <li><span class="iconfont icon-home-square"><br/></span> <span class="describe">产品丰富</span></li>
        <li><span class="iconfont icon-home-support"></span> <br/><span class="describe">卓越服务</span></li>
        <li><span class="iconfont icon-home-money"></span> <br/><span class="describe">预定价格保障</span></li>
        <li><span class="iconfont icon-home-hotel"></span> <br/><span class="describe">酒店升级保障</span></li>
        <li><span class="iconfont icon-home-plane"></span> <br/><span class="describe">航班延误保障</span></li>
        <li><span class="iconfont icon-home-clip"></span> <br/><span class="describe">特殊原因退订保障</span></li>
        <li><span class="iconfont icon-home-thunder"></span> <br/><span class="describe">不可抗力退订保障</span></li>
        <li><span class="iconfont icon-home-fire"></span><br/> <span class="describe">重大灾害保障</span></li>
      </ul>
    </div>
    <travelFoot></travelFoot>
  </div>
</template>

<script>
    import travelFoot from '../components/travelFoot';
    export default {
        name: 'home',
        components: {
            travelFoot
        },
        data(){
            return{
                /*dest：搜索旅游，hotel：搜索酒店，ticket：搜索门票*/
                searchBtn:'dest',
                /*轮播图内容--*/
                carouselData:[
                    {date:'5/Feb.2020',desc:'北海道，一场刻骨铭心的徒步赏雪之旅，感受心灵的涤荡！',
                         address:'北海道',author:'小明',src: require('../assets/car1.png')},
                    {date:'14/Feb.2020',desc:'最是那一抹白色的温柔',
                        address:'格陵兰岛',author:'小明',src: require('../assets/car2.jpg')},
                    {date:'7/Feb.2020',desc:'格陵兰岛',
                        address:'格陵兰岛',author:'小明',src: require('../assets/car3.png')},
                    {date:'2/Feb.2020',desc:'隐秘的面纱',
                        address:'格陵兰岛',author:'小明',src: require('../assets/car4.jpg')},
                ],
                /*推荐的内容*/

                recomend:[
                    {title:'热销榜',content:[]},
                    {title:'休假好去处',content:[]},
                    {title:'看海圣地',content:[]},
                    {title:'扫货圣地',content:[]},
                ],
                /*搜索框的内容*/
                startAddress:'',
                endAddress:'',
                startTime:null,
                dateString:'',
                endTime:null
            }
        },
         methods:{
            /*改变导航栏的样式，改变全局变量*/
             handleNavigate(index){
                 this.$store.commit('setNavigation',index);
             },
             /*日期*/
            onChange(date) {
                this.startTime=date[0];
                this.endTime=date[1];
             },
             onChanges(date,dateString){
                 this.dateString = dateString;
             },
             /*进行搜索*/
             searchThing(){
                 if(this.searchBtn=='dest'){
                     this.$router.push({
                         path:'/follow',
                         query:{address:this.startAddress}
                     })
                     this.handleNavigate(3);
                 }else if(this.searchBtn=='hotel'){
                     if(this.startAddress){
                         localStorage.setItem('startTime',this.startTime);
                         localStorage.setItem('endTime',this.endTime);
                         this.$router.push({
                             path:'/hotelScreen',
                             query:{
                                 address:this.startAddress,
                             }
                         })
                         this.handleNavigate(5);//改变样式
                     }else{
                         this.$message.error('请输入目的地');
                     }
                 }else{
                     if(this.startAddress==''||this.endAddress==''||this.startTime==''){
                         this.$message.warning('请输入完整的搜索信息');
                     }else{
                         localStorage.setItem('ticketDate',this.startTime);
                         this.$router.push({
                             path:'ticketDetail',
                             query:{
                                 beginDes:this.startAddress,
                                 arriveDes:this.endAddress,
                                 dateString:this.dateString
                             }
                         })
                     }
                     this.handleNavigate(4);
                 }
             },
             /*查看内容跳转到详情页面，参数：id作为标志*/
             gotoDeatil(id){
                 this.$router.push({
                     path:'freeDetail',
                     query:{id:id,
                         from:'index'
                     }
                 })
             },
             /*初始化数据*/
             initData(){
                 this.$https.get('/selfguid/init').then( res =>{
                     if(res.body.success){
                         this.recomend[0].content = res.body.selfGuidList.slice(12,16);
                         this.recomend[1].content = res.body.selfGuidList.slice(0,4);
                         this.recomend[2].content = res.body.selfGuidList.slice(4,8);
                         this.recomend[3].content = res.body.selfGuidList.slice(8,12);
                     }
                 })
             }
          },
        created(){
            this.handleNavigate(0);
            this.initData();
        }
    }
</script>
<style scoped lang="scss">
  /*居中公共样式--------*/
  .centerContent {
    width: 80%;
    margin: 0 auto;
  }
  /*轮播图--------------*/
  .carousel{
    width: 100%;
    position: relative;
    min-width: 1000px;
    .item{
      position: relative;
    }
    img{
        width: 100%;
      }
    /*i描述*/
    .desc{
        position: absolute;
        top: 50px;
        left: 230px;
        color: #fff;
        font-size: 18px;
        font-weight: bolder;
        text-shadow: 2px 2px 3px #000;
        span:first-of-type{
          font-size: 20px;
        }
      }
    /*来源*/
    .author{
      position: absolute;
      left: 50%;
      top: 90%;
      transform: translateX(-50%);
      font-weight: bold;
    }
  }
  /*搜索框--------------*/
  .search{
    width: 540px;
    height:90px;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,.6);
    border-radius: 10px;
    padding: 10px 5px;
    color: #fff;
    /*搜索框的选择按钮----*/
    .searchMenu{
      display: flex;
      .btn{
        width: 15px;
        height: 15px;
        border-radius: 15px;
        border: 2px solid #4b61c1;
        background-color: #fff;
        margin: 3px 5px 3px 20px;
        position: relative;
        cursor: pointer;
      }
      .active::after{
        content:'';
        display: block;
        background-color: #4b61c1;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .serchBox{
      margin: 7px 0 0 15px;
      input{
        color: #000;
        height: 36px;
        border: none;
        border-radius: 5px;
        &:focus{
          outline: none;
        }
      }
      /*目的地*/
      .dest{
        input{
          width: 460px;
          padding: 2px 20px;
        }
      }
      /*酒店*/
      .hotel{
        input{
          height: 32px;
          width: 200px;
          padding-left: 10px;
        }
        .dataInput{
          width: 250px;
          height: 38px;
          margin-left: 5px;
        }
      }
      /*机票*/
      .ticket{
        input{
          width: 130px;
          height: 32px;
          margin:0 5px;
          padding-left: 10px;
          &:first-of-type{
            margin-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &:nth-of-type(2) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
      /*搜索按钮*/
      .searchBtn{
        width: 40px;
        height: 36px;
        background-color: #4b61c1;
        margin-left: 10px;
        border: none;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  /*菜单选项------------*/
  .menu{
    width:100%;
    list-style: none;
    padding: 20px 0;
    .centerContent{
      display: flex;
      list-style: none;
      li{
        flex: 1;
        display: flex;
        margin-right: 25px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        padding: 5px 10px 3px 5px ;
        cursor: pointer;
        &:hover{
          box-shadow:  0 4px 12px 0 rgba(0,0,0,0.08);
          .word{
            position: relative;
            .title:after{
              content: '';
              background-color: rgb(110, 128, 204);
              width: 45px;
              height: 3px;
              position: absolute;
              left: 1px;
              top: 20px;
              border-bottom-right-radius: 5px;
              border-bottom-left-radius: 5px;
            }
          }
        }
        &:nth-of-type(3){
          flex: 1.1;
        }
        &:nth-of-type(4){
          flex: 0.8;
        }
        .word{
          flex: 2.6;
          .title{
            font-size: 16px;
            font-weight: 600;
            color: #333;
            line-height: 22px;
          }
          .detail{
            font-size: 11px;
            color: #9d9d9d;;
          }
        }
        .icon{
          flex: 1;
          .iconfont{
            font-size: 30px;
          }
        }
      }
    }
  }
  /*热门推荐------------*/
  .hot{
    margin: 30px 0 ;
    h2{
      color: #4b61c1;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    ul{
      width: 100%;
      display: flex;
      list-style: none;
      padding-left: 0;
      padding-top: 5px;
      .item{
        flex: 1;
        margin-right: 20px;
        position: relative;
        cursor: pointer;
        &:last-of-type{
          margin-right: 0;
        }
        img{
          width: 100%;
        }
        .box{
          border: 1px solid #ddd;
          padding: 5px 10px;
          .describe{
            overflow: hidden;
            color: #000;
            line-height: 20px;
            font-size: 13px;
            position: absolute;
            left: 1px;
            top: 140px;
            padding: 0 10px;
            background-color: #fff;
            height: 40px;
            width: 99%;
          }
          .price{
            color: #ff9d00;
            font-size: 14px;
            z-index: 6;
            margin-top: 40px;
            b{
              font-size: 22px;
            }
          }

        }
        &:hover{
          .describe{
            top: 100px;
            height: 80px;
          }
        }
      }
    }
  }
  /*保证----------------*/
  .guarantee{
    width: 100%;
    padding: 20px 0;
    background-color: #f5f5f5;
    .centerContent{
      display: flex;
      list-style: none;
      li{
        flex: 1;
        margin-righst: 15px;
        text-align: center;
        &:nth-of-type(7),&:nth-of-type(8){
          flex: 1.2;
        }
        .iconfont{
          color: #4b61c1;
          font-size: 25px;
        }
        .describe{
          font-size: 12px;
        }
      }
    }

  }
</style>
