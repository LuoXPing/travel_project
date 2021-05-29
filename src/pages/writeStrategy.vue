<template>
    <div class="writeStrategy">
        <div class="topPart">
            <div class="page-background" v-if="imageUrl">
                <img :src="imageUrl">
                <span class="delete" @click="imageUrl=''">X</span>
            </div>
            <div class="uploadBox" v-else>
                <div  class="upload" @click="triggerUpload('1')">
                    <a-icon type="plus" class="icon"/><br/>
                    <span>选择图片</span>
                    <input type="file" accept='image/*' ref="bgUpload" @change="handleChange" style="display: none">
                </div>
                <div class="describe">
                    <h1>设置游记头图</h1>
                    <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
                </div>
            </div>
            <div class="center">
                <a-input size="large" placeholder="填写游记标题"  class="titleInput" v-model="title"/>
                <span class="tips">可输入<span class="num">40</span>个字</span>
            </div>
        </div>
        <div class="center">
            <!--信息栏-->
            <ul class="messageBox">
                <li class="item">
                    <span class="iconfont icon-stragegyDetail-time"></span>
                    <span>出发时间</span><span class="interval">：</span>
                    <a-date-picker @change="onChange" placeholder="选择日期"  class="dataPicker" />
                </li>
                <li class="item">
                    <span class="iconfont icon-stragegyDetail-days"></span>
                    <span>出行天数</span><span class="interval">：</span>
                    <a-input placeholder="天数" class="money" v-model="day"/><span>天</span>
                </li>
                <li class="item">
                    <span class="iconfont icon-location"></span>
                    <span>地点</span><span class="interval">：</span>
                    <a-input placeholder="地址" class="money" v-model="address"/>
                </li>
                <li class="item">
                    <span class="iconfont icon-stragegyDetail-people"></span>
                    <span>人物</span><span class="interval">：</span>
                    <a-input placeholder="旅行的人" class="money" v-model="person"/>
                </li>
                <li class="item">
                    <span class="iconfont icon-stragegyDetail-price"></span>
                    <span>人均费用</span><span class="interval">：</span>
                    <a-input placeholder="费用" class="money" v-model="cost"/><span>RMB</span>
                </li>
           </ul>
            <!--文章-->
            <div class="article" v-for="(item,index) in message" :key="index">
                <h3>{{item.itemTitle}}</h3>
                <p>{{item.itemContent}}</p>
                <div><img :src="item.picture"></div>
            </div>
            <!--添加 段落 文本框-->
            <div class="paragraph" v-show="isAddPar">
                <h3>段落 {{message.length+1}}</h3>
                <a-input placeholder="请输入标题" class="title" v-model="itemTitle"/>
                <a-textarea placeholder="请输入内容" :rows="10" v-model="itemContent"/>
                <div class="pic_list" v-show="paragraphPicUrl">
                    <img :src="paragraphPicUrl">
                    <span class="delete" @click="paragraphPicUrl=''">X</span>
                </div>
                <div class="btns">
                    <span class="uploadImg" v-show="paragraphPicUrl==''" @click="triggerUpload('2')">添加图片</span>
                    <input type="file" accept='image/*' @change="handleUploadImg"  ref="avatarInput" style="display: none;">
                    <span class="save" @click="savePar">保存</span>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <span class="addPar" @click="addPar">添加段落</span>
            <span class="btn" @click="publishArticle">发表游记</span>
        </div>
        <smallFoot></smallFoot>
    </div>
</template>

<script>
    import smallFoot from '../components/smallFoot'
    export default {
        name: "writeStrategy",
        components:{smallFoot},
        data(){
            return{
                account:'',
                token:'',
                imageUrl: '',//头图链接
                title:'',//大标题
                day:'',/*天数*/
                person:'',/*人物*/
                cost:'', /*费用*/
                address:'',//地址
                dataString:'',//时间
                message:[], // 用于暂存段落的信息
                isAddPar:true,//是否显示添加段落 {itemTitle，itemContent,picture}
                itemTitle:'',//段落的标题
                itemContent:'',//段落的内容
                paragraphPicUrl:"",//段落的图片链接
                paragraphPic:"",//段落图片
                pictureData:[],//待上传的图片
            }
        },
        methods:{
            /*背景图片上传的方法---------------------*/
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
                //背景图片的存放
                this.pictureData.push(files[0]);
            },
            /*日期选择方法--------------------------*/
            onChange(date, dateString) {
                this.dataString=dateString;
            },
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
            /*段落中上传图片*/
            handleUploadImg(){
                var files = this.$refs.avatarInput.files;
                var that = this;
                function readAndPreview(file) {
                    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                        var reader = new FileReader();
                        reader.onload = function() {
                            that.paragraphPicUrl = this.result;
                        };
                        reader.readAsDataURL(file);
                    }
                }
                if (files) {
                    [].forEach.call(files, readAndPreview);
                }else{
                    return;
                }
                this.paragraphPic = files[0];
            },
            /*保存段落的内容*/
            savePar(){
                if(this.itemTitle == ''||this.itemContent==''){
                    this.$message.error('请输入内容后在保存');
                }else{
                    var item={};
                    item.itemTitle = this.itemTitle;
                    item.itemContent = this.itemContent;
                    item.picture = this.paragraphPicUrl;
                    item.picflag = '0';
                    if(this.paragraphPicUrl){
                        this.pictureData.push(this.paragraphPic);
                        item.picflag  = '1';
                    }
                    this.message.push(item);
                    this.isAddPar=false;
                    this.paragraphPicUrl = this.itemTitle =  this.itemContent ='';
                }
            },
            // 功能：触发上传图片按钮
            triggerUpload(id) {
                if(id==1){
                    this.$refs.bgUpload.dispatchEvent(new MouseEvent("click"));
                }else{
                    this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
                }
            },
            /*添加心的段落*/
            addPar(){
                if(this.isAddPar){
                    this.savePar()
                }else if(this.message.length>=5){
                    this.isAddPar=false;
                    this.$message.warning('长度受限，不能继续添加');
                }else{
                    this.isAddPar=true;
                }
            },
            /*发表文章*/
            publishArticle(){
                if (this.day==''||this.person==''||this.cost==''||this.address==''||this.dataString==''){
                    this.$message.warning('请填写完整信息框的内容');
                }else if(this.title == ''){
                    this.$message.warning('请填写标题');
                }else if(this.isAddPar){
                    this.$message.warning('请保存段落内容后再发表');
                }else if(this.imageUrl==''){
                    this.$message.warning('请设置背景图');
                }else{
                    this.showConfirm("是否确认发表？",()=>{
                        var formData = new FormData();
                        for (var i=0;i<this.pictureData.length;i++){
                            formData.append("file",this.pictureData[i])
                        }
                        formData.append("token",this.token);
                        formData.append("nickName",this.$store.state.nickName);
                        formData.append("user_id",this.account);
                        formData.append("headPic",this.$store.state.headPic);

                        formData.append("mainTitle",this.title);
                        formData.append("address",this.address);
                        formData.append("cost",this.cost);
                        formData.append("travel_time",this.dataString);
                        formData.append("person",this.person);
                        formData.append("duration",this.day);
                        for (var j=1;j<=5;j++){
                            var title = "title"+j;
                            var cont = "cont"+j;
                            var picflag = "pic"+j;
                            if(j>this.message.length){
                                formData.append(title,'');
                                formData.append(cont,'');
                                formData.append(picflag,'0');
                            }else{
                                formData.append(title,this.message[j-1].itemTitle);
                                formData.append(cont,this.message[j-1].itemContent);
                                formData.append(picflag,this.message[j-1].picflag);
                            }
                        }
                        this.$https.post('/strategy/add',formData).then( res =>{
                            if(res.body.success){
                                var _this=this;
                                this.$message.success(res.body.rspDesc);
                                setTimeout(()=>{
                                    _this.$router.push({
                                        path: '/person',
                                        query:{
                                            navIndex:2,
                                        }})
                                },500)
                                this.paragraphPic = this.imageUrl = '';
                                this.pictureData = [];
                            }else{
                                this.$message.error(res.body.rspDesc);
                            }
                        })
                    })
                }
            }
        },
        created(){

            this.$store.commit('setNavigation',-1);//导航栏选中的样式修改
            this.account = this.$store.state.account;
            this.token = this.$store.state.token;
        }
    }
</script>

<style lang="scss">
    .writeStrategy{
        .center{
            width: 70%;
            margin: 0 auto;
        }
        .topPart{
            width: 100%;
            height: 430px;
            background-size: cover;
            position: relative;
            background-image: url('../assets/page_bg.jpg');
            .page-background{
                height: 431px;
                z-index: -1;
                border-bottom: 1px solid #ccc;
                img{
                    width:  100%;
                    height: 430px;
                }
                .delete{
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    text-align: center;
                    line-height: 20px;
                    display: block;
                    width: 20px;
                    background-color: rgba(0,0,0,.3);
                    color: #fff;
                    cursor: pointer;
                }
            }
            .titleInput{
                position: absolute;
                bottom: 50px;
                width: 70%;
                &:focus{
                    border-color: #4b61c1;
                }
            }
            .tips{
                position: absolute;
                bottom: 60px;
                right: 220px;
                color: #999;
                font-size: 12px;
                .num{
                    color: #f00;
                }
            }
            .uploadBox{
                .upload{
                    width: 100px;
                    height: 100px;
                    padding: 20px;
                    text-align: center;
                    background-color: #fafafa;
                    border: 1px dashed #ddd;
                    position: absolute;
                    top: 150px;
                    left: 35%;
                    cursor: pointer;
                    .icon{
                        font-size: 30px;
                        color: #999;
                    }
                }
                .describe{
                    position: absolute;
                    top: 160px;
                    left: 45%;
                    p{
                        color: #666;
                    }
                }
                img{
                    width: 100%;
                }
            }
        }
        /*信息栏*/
        .messageBox{
            width: 100%;
            height: 120px;
            margin: 20px 0;
            border: 1px dashed #ccc;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            .item{
                width: 32%;
                line-height: 30px;
                margin-bottom: 15px;
                margin-right: 10px;
                .iconfont{
                    color: #ff9e00;
                    font-size: 20px;
                    padding-right: 5px;
                }
                .interval{
                    color: #ff9e00;
                    font-size: 12px;
                    padding:0 5px;
                }
                .dataPicker,.money{
                    width: 130px;
                    margin-right: 5px;
                }
            }
        }
        /*文章*/
        .article{
            padding: 10px;
            padding-bottom: 30px;
            margin-bottom: 40px;
            border-bottom: 1px dashed #eee;
            h3{
                text-align: center;
            }
            img{
                width: 80%;
            }

        }
        /*段落*/
        .paragraph{
            background-color: #fafafa;
            padding: 20px 20px 60px 20px;
            .title{
                margin-bottom: 10px;
            }
            /*图片*/
            .pic_list{
                margin: 20px;
                position: relative;
                img{
                    width: 100%;
                }
                .delete{
                    color: #fff;
                    background-color: rgba(0,0,0,0.3);
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    display: inline-block;
                    padding: 2px 5px;
                    border-radius: 2px;
                    cursor: pointer;
                }
            }
            .btns{
                float: right;
                margin: 10px;
                .save,.uploadImg{
                    display: inline-block;
                    width: 80px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 5px;
                    text-align: center;
                    cursor: pointer;
                    background-color: #ff9d00;
                    color: #fff;
                    margin-right: 10px;
                }
            }
        }
        /*发表按钮*/
        .btnBox{
            padding: 20px;
            text-align: center;
            .btn,.addPar{
                margin-right: 20px;
                display: inline-block;
                width: 180px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 20px;
                color: #fff;
                background-color: #ff9d00;
                border-radius: 25px;
                cursor: pointer;
            }
        }
    }
</style>