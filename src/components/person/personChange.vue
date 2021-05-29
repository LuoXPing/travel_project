<template>
    <div class="personChange">
        <div class="center">
            <ul class="sidebar">
                <li :class="{item:true,active:navIndex==0}" @click="navIndex=0">
                    <span class="iconfont icon-information"></span>
                    我的信息
                </li>
                <li :class="{item:true,active:navIndex==1}" @click="navIndex=1">
                    <span class="iconfont icon-head"></span>
                    我的头像
                </li>
                <li :class="{item:true,active:navIndex==2}" @click="navIndex=2">
                    <span class="iconfont icon-person-security" style="font-size: 20px"></span>
                    账号安全
                </li>
            </ul>
            <div class="changeCont" v-show="navIndex==0">
                <h2>我的信息</h2>
                <div class="name">
                    <span class="title">名号：</span>
                    <input type="text" v-model="nickName">
                </div>
                <div class="sex">
                    <span class="title">性别：</span>
                    <span :class="{btn:true, active:sex==0}" @click="sex=0"></span>男
                    <span :class="{btn:true, active:sex==1}" @click="sex=1"></span>女
                </div>
                <div class="address">
                    <span class="title">居住城市：</span>
                    <input type="text" v-model="address">
                </div>
                <div class="introduce">
                    <span class="title">个人简介：</span>
                    <a-textarea placeholder="例：摄影师/旅居澳洲/潜水爱好者"
                                :rows="5"  class="introInput" v-model="introduce"/>
                </div>
                <div class="saveChange" @click="saveInfoChange">保存</div>
            </div>
            <div class="changePic" v-show="navIndex==1">
                <h2>我的头像</h2>
                <div class="page-background" v-if="imageUrl">
                    <img :src="imageUrl">
                    <span class="delete" @click="imageUrl=''">X</span>
                </div>
                <div  v-else @click="triggerUpload" class="uploadBox">
                    <a-icon type="plus" class="icon"/><br/>
                    <span>选择图片</span>
                    <input type="file" accept='image/*' ref="bgUpload"
                           @change="handleChange($event)" style="display: none">
                </div>
                <div class="saveChange" @click="saveHeadChange">保存</div>
            </div>
            <div class="accountSecurity" v-show="navIndex==2">
                <h2>账户安全</h2>
                <div class="changePas">
                    <div class="title">修改密码:</div>
                    <div class="content"><input type="password" placeholder="请输入新密码" v-model="password">
                        <input type="password" placeholder="请确认新密码" v-model="repassword"></div>
                </div>
                <div class="question">
                    <div class="title">密保问题：</div>
                    <div class="content">
                        <select required class="select"  v-model="question">
                            <option style="display: none;" disabled selected>请选择密保问题</option>
                            <option value ="address">你的家庭住址？</option>
                            <option value ="bir">你的生日是什么时候？</option>
                            <option value="school">你的小学名字是什么？</option>
                            <option value="mother">你母亲叫什么？</option>
                        </select>
                        <input type="text" placeholder="请输入密保答案" v-model="answer">
                    </div>
                </div>
                <div class="confirmBtn" @click="savaPassChange">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personChange",
        data(){
            return{
                /*导航栏目标*/
                navIndex:0,
                account:'',//用户的账号
                token:'',//登录的标志
                sex:'',//0表示男，1表示女
                introduce:'',//个人简介
                address:'',//居住的城市
                nickName:'',//名称
                imageUrl: '',//头像上传的修改
                file:'',//头像文件
                password:'',//密码
                repassword:'',//确认密码
                question:'',//密保问题
                answer:'',//密保答案
            }
        },
        methods: {
            /*对话框确认封装*/
            showConfirm(message,callback) {
                this.$confirm({
                    title: message,
                    okText:'确认',
                    cancelText:'取消',
                    onOk() {
                        callback();
                    },
                })
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
                this.file = files[0];
            },
            triggerUpload(){
                this.$refs.bgUpload.dispatchEvent(new MouseEvent("click"));
            },
            /*保存更改头像--------------*/
            saveHeadChange(){
                if(this.imageUrl==''){
                    this.$message.error('请选择图片');
                }else{
                    this.showConfirm('是否确认修改头像',()=>{
                        var formData = new FormData();
                        formData.append("file", this.file);
                        formData.append("account", this.account);
                        this.$https.post('headPic/upload',formData).then( res => {
                            if(res.body.success){
                                this.$store.commit('sethHeadPic',res.body.headPic);
                                this.imageUrl='';
                            }
                            this.$message.success(res.body.rspDesc);
                        })
                    })
                }
            },
            /*保存信息的修改-----*/
            saveInfoChange(){
                var params={account:this.account, nickName:this.nickName, sex:this.sex,
                     address:this.address, describe:this.introduce, token:this.token};
                this.showConfirm('是否确认修改信息',()=>{
                    this.$https.post('user/modifyInfo',params).then( res => {
                        if(res.body.success){
                            this.$message.success(res.body.rspDesc);
                            this.nickName=this.address=this.introduce='';
                        }else{
                            this.$message.error(res.body.rspDesc);
                        }
                    })
                })
            },
            /*保存密码的修改-------*/
            savaPassChange(){
                if(this.password==''||this.repassword==''||this.question==''||this.answer==''){
                    this.$message.error('请输入完整的信息');
                }else if(this.password!==this.repassword){
                    this.$message.error('两次密码输入不一致');
                    this.password = this.repassword ='';
                } else {
                    this.showConfirm('是否确认修改密码', () => {
                        this.$https.post('user/restPassword', {
                            account: this.account,
                            password: this.password,
                            passQues: this.question,
                            passAns: this.answer
                        }).then(res => {
                            if (res.body.success) {
                                this.$message.success('修改成功');
                            } else {
                                this.$message.error(res.body.rspDesc);
                            }
                            this.password = this.repassword = this.question = this.answer = '';
                        })
                    })
                }}
        },
        created(){
            this.account = this.$store.state.account;
            this.token = this.$store.state.token;
            this.$https.post('user/init', {account:this.account}).then( res => {
                var data = res.body;
                if (data.success) {
                    this.account = data.user.account;
                    this.introduce = data.user.des;
                    this.address = data.user.address;
                    this.nickName = data.user.nickName;
                    this.sex = data.user.sex;
                }
            })
        },
    }
</script>

<style  lang="scss">
    .personChange{
        background-color: #fff;
        .center{
            width: 75%;
            margin: 0 auto;
            display: flex;
        }
        .sidebar{
            flex: 1;
            margin-right: 30px;
            list-style: none;
            text-align: center;
            padding: 20px 0;
            .item{
                height: 50px;
                line-height: 50px;
                border-radius: 5px;
                cursor: pointer;
                .iconfont{
                    padding-right: 5px;
                }
                &:hover{
                    background-color: #eee;
                }
            }
            .active{
                background-color: #ffa800!important;
                color: #fff;
            }
        }
        .changeCont{
            min-height: 400px;
            flex: 4;
            padding: 20px;
            color: #999;
            h2{
                border-bottom: 1px solid #eee ;
                padding-bottom: 10px;
            }
            .sex{
                .btn{
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 15px;
                    border: 2px solid #ffa800;
                    background-color: #fff;
                    margin: 0 5px 0 20px;
                    position: relative;
                    top: 3px;
                    cursor: pointer;
                }
                .active::after{
                    content:'';
                    display: block;
                    background-color: #ffa800;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            div{
                margin-top: 20px;
                .title{
                    display: inline-block;
                    width: 80px;
                    text-align: right;
                    margin-right: 15px;
                }
                input{
                    border: 1px solid #d3d3d3;
                    width: 210px;
                    height: 34px;
                    border-radius: 5px;
                    padding: 0 10px;
                    &:focus{
                        border: 1px solid #d3d3d3;
                        outline: none;
                    }
                }
            }
            .introduce{
                .introInput{
                    width: 350px;
                    height: 100px;
                }
            }
            .saveChange{
                width: 100px;
                height: 34px;
                line-height: 34px;
                margin: 40px 200px;
                color: #fff;
                background-color: #ffa800;
                cursor: pointer;
                text-align: center;
                border-radius: 5px;
            }
        }
        .changePic,.accountSecurity {
            min-height: 400px;
            flex: 4;
            padding: 20px;
            color: #999;
            h2 {
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
        }
        .accountSecurity{
            input,.select{
                width: 380px;
                height: 40px;
                border: 1px solid #d3d3d3;
                border-radius: 5px;
                padding: 5px 5px 5px 10px;
                margin-top: 20px;
                outline: none;
                &:focus {
                    border: 1px solid #ffa800;
                }
            }
            .changePas,.question{
                height: 150px;
                display: flex;
                .title{
                    flex: 1;
                    line-height: 90px;
                }
                .content{
                    flex: 6;
                }

            }
            .confirmBtn{
                width:150px;
                height: 34px;
                line-height: 34px;
                margin: 40px 200px;
                color: #fff;
                background-color: #ffa800;
                cursor: pointer;
                text-align: center;
                border-radius: 5px;
            }
        }
        .changePic{
            .page-background{
                width: 200px;
                height: 200px;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                .delete{
                    display: block;
                    position: absolute;
                    top: 10px;
                    right: 7px;
                    color: #fff;
                    font-size: 11px;
                    background-color: rgba(0,0,0,.3);
                    padding: 0 3px;
                    cursor: pointer;
                }
            }
            .uploadBox{
                width: 200px;
                height: 200px;
                padding-top: 80px;
                text-align: center;
                background-color: #fafafa;
                border: 1px dashed #ddd;
                cursor: pointer;
                .icon{
                    font-size: 30px;
                    color: #999;
                }
            }
            .saveChange{
                width: 100px;
                height: 34px;
                line-height: 34px;
                margin: 60px 100px;
                color: #fff;
                background-color: #ffa800;
                cursor: pointer;
                text-align: center;
                border-radius: 5px;
            }
        }
    }

</style>