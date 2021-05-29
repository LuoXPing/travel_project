<template>
    <div class="personRoute">
        <div class="center">
            <div class="leftPart">
                <img :src="headPic" alt="">
                <div class="line">
                    <a-timeline mode="right">
                        <a-timeline-item v-for="(item,index) in routeDate"
                                         :key="index" class="line-item" >{{item.destination}}</a-timeline-item>
                    </a-timeline>
                </div>
            </div>
            <div class="rightPart">
                <div class="top">
                    <div class="describe">
                        走过 <span class="num">{{routeDate.length}}</span>个城市，
                        留下了<span class="num">{{routeDate.length}}</span>个足迹
                    </div>
                    <div class="addBtn" @click="isShowAddBox=true">
                        <span class="iconfont icon-write"></span>添加足迹
                    </div>
                </div>
                <div class="routeCont">
                    <!--没有内容时显示-->
                    <div class="noneDate" v-if="routeDate.length == 0&&!isShowAddBox">
                        暂无足迹
                    </div>
                    <!--显示内容-->
                    <ul class="routeContent" v-else>
                        <li class="routeBox" v-for="(item,index) in routeDate" :key="index" >
                            <div class="picture">
                                <img :src="item.picture" alt="">
                            </div>
                            <div class="describe">
                                <span class="title">{{item.des}}</span>
                                <div class="mess">
                                    <span class="iconfont icon-person-delete" @click="deleteRoute(item.id)"></span>
                                    <span class="time">{{item.happen_time}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!--添加文本框-->
                    <div class="writeRouteBox" v-show="isShowAddBox">
                        <div class="picture">
                            <div class="page-background" v-if="imageUrl">
                                <img :src="imageUrl">
                                <span class="delete" @click="imageUrl=''">X</span>
                            </div>
                            <div  v-else @click="triggerUpload" class="uploadBox">
                                <a-icon type="plus" class="icon"/><br/>
                                <span>选择图片</span>
                                <input type="file" accept='image/*' ref="bgUpload" @change="handleChange" style="display: none">
                            </div>
                        </div>
                        <div class="contBox">
                            <a-input placeholder="请输入描述" class="desc" v-model="describe"/>
                            <div class="messageBox">
                                <a-input placeholder="旅游地点" v-model="address" class="address"/>
                                <a-date-picker placeholder="请选择时间" @change="onChange" v-model="travel_time" class="date"/>
                            </div>
                            <div class="btn" @click="saveRoute">保存</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personRoute",
        data(){
            return{
                routeDate:[],
                isShowAddBox:false,
                /*添加框--------*/
                picfile:null,//上传的图片文件
                address:'',//地点
                describe:'',//描述
                dateString:'',//时间
                travel_time:null,
                imageUrl:'',//图片
                account:'',//用户的账户
            }
        },
        computed: {
            headPic: function () {//用户头像地址
                return this.$store.state.headPic;
            }
        },
        methods:{
            onChange(date, dateString) {
                this.dateString = dateString;
            },
            /*功能：上传图片*/
            handleChange () {
                var files = this.$refs.bgUpload.files;
                const _this=this;
                function readAndPreview(file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        _this.imageUrl = this.result;
                    };
                    reader.readAsDataURL(file);
                }
                if (files) {
                    [].forEach.call(files, readAndPreview);
                }else{
                    return;
                }
                this.picfile = files[0];
            },
            triggerUpload(){
                this.$refs.bgUpload.dispatchEvent(new MouseEvent("click"));
            },
            /*功能：保存添加的足迹*/
            saveRoute(){
                if (this.describe==''||this.address==''||this.dateString=='') {
                    this.$message.warning('请填写完整的信息');
                }else{
                    var formData = new FormData();
                    formData.append("file", this.picfile);
                    formData.append("user_id", this.account);
                    formData.append("destination", this.address);
                    formData.append("des", this.describe);
                    formData.append("happen_time", this.dateString);
                    formData.append("token", this.token);
                    this.$https.post('user/addRoute', formData).then( res => {
                        if(res.body.success){
                            this.getAllRoute();
                            this.isShowAddBox = false;
                            this.describe = this.address = this.dateString = this.imageUrl='';
                            this.travel_time=this.picfile=null;
                        }
                    })
                }
            },
            /*功能：删除足迹*/
            deleteRoute(id){
                var data = {id:id,token:this.token,user_id:this.account};
                this.$https.post('use/deleteRoute',data).then( res => {
                    if(res.body.success){
                        //this.routeDate = res.body.msg;
                        this.getAllRoute();
                    }
                })
            },
            /*功能：获取所有的足迹*/
            getAllRoute(){
                this.$https.post('user/getRoute', {userId:this.account}).then( res => {
                    if(res.body.success){
                        this.routeDate = res.body.msg;
                    }
                })
            }
        },
        created(){
            this.token = this.$store.state.token;
            this.account = this.$store.state.account;
            this.getAllRoute();
        }
    }
</script>

<style scoped lang="scss">
    .personRoute{
        padding: 20px;
        margin-bottom: 80px;
        .center{
            width: 75%;
            margin: 0 auto;
            display: flex;
        }
        .leftPart {
            flex: 1;
            margin-right: 30px;
            border-right: 3px solid #d6d6d6;
            position: relative;
            text-align: center;
            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                position: absolute;
                left: 25%;
                top: -140px;
                background-color: hotpink;
            }
            .line{
                padding-top: 60px;
                .line-item{
                    margin-top: 170px;
                }
            }
        }
        .rightPart {
            flex: 3;
            .top{
                margin-bottom: 20px;
                width: 100%;
                height: 80px;
                background-color: #fff;
                padding: 10px 20px;
                .describe{
                    font-size: 18px;
                    float: left;
                    .num{
                        font-size: 25px;
                        color: #444;
                        padding: 0 5px;
                        font-weight: bold;
                    }
                }
                .addBtn{
                    float: right;
                    margin-top: 10px;
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
                }
            }
            /*没有内容时*/
            .noneDate{
                width: 100%;
                min-height: 300px;
                text-align: center;
                font-size: 40px;
                color: #ccc;
                padding: 40px;
            }
            .routeContent{
                list-style: none;
                padding-left: 0;
                .routeBox{
                    height: 200px;
                    padding: 20px;
                    background-color: #fff;
                    margin-bottom: 20px;
                    display: flex;
                    position: relative;
                    .picture{
                        flex: 1;
                        img{
                            width: 100%;
                            height:  100%;
                        }
                    }
                    .describe{
                        flex: 1;
                        padding-left: 20px;
                        .title{
                            font-size: 20px;
                            color: #ff9d00;
                        }
                        .mess{
                            position: absolute;
                            bottom: 25px;
                            right: 30px;
                            color: #bbb;
                            .icon-person-delete{
                                padding-right: 15px;
                                cursor: pointer;
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
            /*添加文本框---------*/
            .writeRouteBox{
                width: 100%;
                height: 200px;
                background-color: #fff;
                padding: 20px;
                display: flex;
                .picture{
                    flex: 1;
                    margin-right: 10px;
                    .page-background{
                        height: 100%;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .delete{
                            display: block;
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            color: #fff;
                            font-size: 12px;
                            background-color: rgba(0,0,0,.3);
                            padding: 1px 3px;
                            cursor: pointer;
                        }
                    }
                    .uploadBox{
                        width: 150px;
                        height: 130px;
                        background-color: #efefef;
                        border: 1px dashed #ccc;
                        text-align: center;
                        padding-top: 40px;
                        margin-left:100px;
                        cursor: pointer;
                    }
                }
                .contBox{
                    flex: 1;
                    .desc,.address,.date{
                        width: 100%;
                        margin-bottom: 10px;
                    }
                    .btn{
                        width: 100px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        color: #fff;
                        background-color: #ff9e00;
                        border-radius: 5px;
                        float: right;
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>