<template>
    <div>
        <!--添加按钮-->
        <div style="width: 100px;margin-bottom: 10px;"><a-button @click="handleAdd">添加</a-button></div>
        <!--表格-->
        <a-table :columns="columns" :dataSource="data" class="components-table-demo-nested"
                 @expand="open" :expandedRowKeys="expandedRowKeys" rowKey= " row => row.id" borded>
            <!--图片的显示-->
            <template slot="mainPicture" slot-scope="text,record">
                <img :src="record.mainPicture" alt="" style="width: 100px;">
            </template>
            <!--最后一行操作-->
            <template slot="operation" slot-scope="text, record">
                <a @click="handleEditor(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleDelete(record.id)">删除</a>
            </template>
            <!--子表格-->
            <a-table slot="expandedRowRender" :columns="innerColumns" :dataSource="innerData"
                     :pagination="false">
                <template slot="desPic" slot-scope="text,record">
                    <img :src="record.desPic" alt="" style="width: 100px;">
                </template>
            </a-table>
        </a-table>
        <!--弹框：用于修改和增加-->
        <a-modal :title="modifyTitle" v-model="visible" @ok="handleOk" >
            <div class="smallTip">友情提醒：请保持数据的完整性！</div>
            <div style="display: flex;">
                <div class="left" style="flex: 1;">
                    <div><span class="tip">酒店名称：</span><a-input v-model="ediItem.name"/></div>
                    <div><span class="tip">英文名：</span><a-input v-model="ediItem.ename"/></div>
                    <div><span class="tip">所在城市：</span><a-input v-model="ediItem.locate"/></div>
                    <div><span class="tip">具体位置：</span><a-input v-model="ediItem.detail_loacte"/></div>
                    <div ><span class="tip">类型：</span>
                        <span v-if="ediItem.recomd=='1'">推荐</span>
                        <span v-else>普通</span>
                        <a-button style="margin: 5px;" @click="ediItem.recomd='1'">设为推荐</a-button>
                        <a-button @click="ediItem.recomd='0'">设为普通</a-button>
                    </div>
                    <div><span class="tip">评分：</span><a-input v-model="ediItem.count"/></div>
                    <div><span class="tip">描述：</span><a-textarea :rows="4"  v-model="ediItem.describe"/></div>
                    <div ><span class="tip">主要图片：</span>
                        <div v-if="mainPic" class="pictBox">
                            <img :src="mainPic">
                            <span class="delete" @click="deletePic('7')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('7')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload7" @change="handleChange('7',ediItem.mainPicture)" style="display: none">
                        </div>
                    </div>
                    <div><span class="tip">酒店描述图片6：</span>
                        <div v-if="desPic6" class="pictBox">
                            <img :src="desPic6">
                            <span class="delete" @click="deletePic('6')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('6')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload6" @change="handleChange('6',ediItem.pic6)" style="display: none">
                        </div>
                    </div>
                </div>
                <div class="middle" style="flex: 1">
                    <div><span class="tip">酒店描述图片1：</span>
                        <div v-if="desPic1" class="pictBox">
                            <img :src="desPic1">
                            <span class="delete" @click="deletePic('1')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('1')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload1" @change="handleChange('1',ediItem.pic1)" style="display: none">
                        </div>
                    </div>
                    <div><span class="tip">酒店描述图片2：</span>
                        <div v-if="desPic2" class="pictBox">
                            <img :src="desPic2">
                            <span class="delete" @click="deletePic('2')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('2')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload2" @change="handleChange('2',ediItem.pic2)" style="display: none">
                        </div>
                    </div>
                    <div><span class="tip">酒店描述图片3：</span>
                        <div v-if="desPic3" class="pictBox">
                            <img :src="desPic3">
                            <span class="delete" @click="deletePic('3')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('3')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload3" @change="handleChange('3',ediItem.pic3)" style="display: none">
                        </div>
                    </div>
                    <div><span class="tip">酒店描述图片4：</span>
                        <div v-if="desPic4" class="pictBox">
                            <img :src="desPic4">
                            <span class="delete" @click="deletePic('4')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('4')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload4" @change="handleChange('4',ediItem.pic4)" style="display: none">
                        </div>
                    </div>
                    <div><span class="tip">酒店描述图片5：</span>
                        <div v-if="desPic5" class="pictBox">
                            <img :src="desPic5">
                            <span class="delete" @click="deletePic('5')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('5')" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload5" @change="handleChange('5',ediItem.pic5)" style="display: none">
                        </div>
                    </div>
                </div>
                <div class="right" style="flex: 1;margin:0 15px;">
                    <div class="platform"><span class="tip">平台：</span>Booking.com</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type1"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price1"/></div>
                    <div class="platform"><span class="tip">平台：</span>马蜂窝优选</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type2"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price2"/></div>
                    <div class="platform"><span class="tip">平台：</span>agoda</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type3"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price3"/></div>
                    <div class="platform"><span class="tip">平台：</span>有鱼订房</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type4"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price4"/></div>
                    <div class="platform"><span class="tip">平台：</span>艺龙</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type5"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price5"/></div>
                    <div class="platform"><span class="tip">平台：</span>携程</div>
                    <div><span class="tip">房型：</span><a-input v-model="ediItem.type6"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price6"/></div>
                </div>
            </div>
        </a-modal>
    </div>

</template>
<script>
    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '酒店名称', dataIndex: 'name', key: 'name',width:100  },
        { title: '英文名', dataIndex: 'ename', key: 'ename',width:130 },
        { title: '所在城市', dataIndex: 'locate', key: 'locate' },
        { title: '具体位置', dataIndex: 'detail_loacte', key: 'detail_loacte',width:130  },
        { title: '评分', dataIndex: 'count', key: 'count' },
        { title: '描述', dataIndex: 'describe', key: 'describe',width:200 },
        { title: '主要图片', dataIndex: 'mainPicture', key: 'mainPicture',scopedSlots: { customRender: 'mainPicture' } },
        { title: '操作', dataIndex: 'operation',key:'operation', scopedSlots: { customRender: 'operation' }},
    ];
    const innerColumns = [
        { title: '平台', dataIndex: 'platform', key: 'platform' },
        { title: '房型', dataIndex: 'roomType',key: 'roomType' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '酒店描述图片', dataIndex: 'desPic', key: 'desPic',scopedSlots: { customRender: 'desPic' } },
    ];

    export default {
        data() {
            return {
                data:[],
                columns,
                innerColumns,//子表格的行
                innerData:[],//子表格数据
                expandedRowKeys:[],//展开的rowkey
                upLoadfile:"",//待上传的图片
                //图片，用于显示
                mainPic:"",
                desPic1:"",
                desPic2:"",
                desPic3:"",
                desPic4:"",
                desPic5:"",
                desPic6:"",
                visible:false,//弹窗的可见性
                modifyTitle:"",
                ediItem:""
            };
        },
        methods:{
            //点击展开嵌套表格
            open(expanded,record){
                var key = "";
                this.data.some((item,index)=>{
                    if(item.id == record.id){
                        key = index;
                    }
                })
                if(expanded){
                    this.expandedRowKeys = [];
                    this.expandedRowKeys.push(key);
                }else{
                    this.expandedRowKeys = [];
                }
                this.innerData = [
                    { platform:"Booking.com",roomType:record.type1,price:record.price1,desPic:record.pic1},
                    { platform:"马蜂窝优选",roomType:record.type2,price:record.price2,desPic:record.pic2},
                    { platform:"agoda",roomType:record.type3,price:record.price3,desPic:record.pic3},
                    { platform:"有鱼订房",roomType:record.type4,price:record.price4,desPic:record.pic4},
                    { platform:"艺龙",roomType:record.type5,price:record.price5,desPic:record.pic5},
                    { platform:"携程",roomType:record.type6,price:record.price6,desPic:record.pic6},
                ];
            },
            /*功能：上传图片*/
            handleChange (index,name) {
                var files = [];
                switch(index){
                    case "1":{ files=this.$refs.bgUpload1.files;break;}
                    case "2":{ files=this.$refs.bgUpload2.files;break;}
                    case "3":{ files=this.$refs.bgUpload3.files;break;}
                    case "4":{ files=this.$refs.bgUpload4.files;break;}
                    case "5":{ files=this.$refs.bgUpload5.files;break;}
                    case "6":{ files=this.$refs.bgUpload6.files;break;}
                    default: { files=this.$refs.bgUpload7.files;break;}
                }
                const _this=this;
                function readAndPreview(file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        switch(index){
                            case "1":{ _this.desPic1=this.result;break;}
                            case "2":{ _this.desPic2=this.result;break;}
                            case "3":{ _this.desPic3=this.result;break;}
                            case "4":{ _this.desPic4=this.result;break;}
                            case "5":{ _this.desPic5=this.result;break;}
                            case "6":{ _this.desPic6=this.result;break;}
                            default: { _this.mainPic=this.result;break;}
                        }
                    };
                    reader.readAsDataURL(file);
                }
                if (files) {
                    [].forEach.call(files, readAndPreview);
                }else{
                    return;
                }
                if(name){var names = name.slice( name.lastIndexOf('/')+1,-1);}
                var newfile = new File([files[0]],index+names,{type:"image/jpeg"});
                this.upLoadfile.push(newfile);
            },
            triggerUpload(index){
                switch(index){
                    case "1":{ this.$refs.bgUpload1.dispatchEvent(new MouseEvent("click"));break;}
                    case "2":{ this.$refs.bgUpload2.dispatchEvent(new MouseEvent("click"));break;}
                    case "3":{ this.$refs.bgUpload3.dispatchEvent(new MouseEvent("click"));break;}
                    case "4":{ this.$refs.bgUpload4.dispatchEvent(new MouseEvent("click"));break;}
                    case "5":{ this.$refs.bgUpload5.dispatchEvent(new MouseEvent("click"));break;}
                    case "6":{ this.$refs.bgUpload6.dispatchEvent(new MouseEvent("click"));break;}
                    default: { this.$refs.bgUpload7.dispatchEvent(new MouseEvent("click"));break;}
                }
            },
            /*重新选择图片*/
            deletePic(index){
                //删除图片重新选择
                this.upLoadfile.some((item,i)=>{
                    if(parseInt(item.name)==index){
                        this.upLoadfile.splice(i,1);
                    }
                });
                switch(index){
                    case "1":{ this.desPic1="";break;}
                    case "2":{ this.desPic2="";break;}
                    case "3":{ this.desPic3="";break;}
                    case "4":{ this.desPic4="";break;}
                    case "5":{ this.desPic5="";break;}
                    case "6":{ this.desPic6="";break;}
                    default:{ this.mainPic="";break;}
                }
            },
            /*增加机票*/
            handleAdd(){
                this.upLoadfile = [];
                this.visible = true;
                this.modifyTitle = "添加窗口";
                this.mainPic=this.desPic1=this.desPic2=this.desPic3=this.desPic4=this.desPic5=this.desPic6="";
                this.ediItem = {name:"",recomd:'0',detail_loacte:"",locate:"", ename:"",count:"",describe:"",mainPicture:"",
                    pic1:"", pic2:"", pic3:"", pic4:"",pic5:"",pic6:"",type1:"",type2:"",type3:"",type4:"", type5:"",
                    type6:"", price1:"", price2:"", price3:"", price4:"", price5:"", price6:""};
            },
            handleEditor(item){
                this.upLoadfile = [];
                this.visible = true;
                this.ediItem = item;
                this.mainPic =item.mainPicture;
                this.desPic1 =item.pic1;this.desPic2 =item.pic2;this.desPic3 =item.pic3;
                this.desPic4 =item.pic4;this.desPic5 =item.pic5;this.desPic6 =item.pic6;
                this.modifyTitle = "修改窗口";
            },
            /*点击弹框的确认按钮*/
            handleOk(){
                var item = this.ediItem;
                if(item.name==""||item.detail_loacte==""||item.locate==""||item.ename==""||item.count==""||item.describe==""||
                    this.mainPic==""||this.desPic1==""||this.desPic2==""||this.desPic3==""||this.desPic4==""||this.desPic5==""||
                    this.desPic6==""||item.type1==""||item.type2==""||item.type3==""||item.type4==""||item.type5==""||
                    item.type6==""||item.price1==""||item.price2==""||item.price3==""||item.price4==""||item.price5==""||item.price6==""){
                    this.$message.error("请输入完整的信息！");
                }else {
                    /*处理待上传数据----*/
                    var formData = new FormData();
                    for (var i=0;i<this.upLoadfile.length;i++){
                        formData.append("file",this.upLoadfile[i])
                    }
                    formData.append("id",item.id);formData.append("name",item.name);formData.append("detail_loacte",item.detail_loacte);
                    formData.append("locate",item.locate);formData.append("ename",item.ename);formData.append("count",item.count);
                    formData.append("des",item.describe);formData.append("mainPicture",item.mainPicture);formData.append("recomd",item.recomd);
                    formData.append("pic1",item.pic1);formData.append("pic2",item.pic2);formData.append("pic3",item.pic3);
                    formData.append("pic4",item.pic4);formData.append("pic5",item.pic5);formData.append("pic6",item.pic6);
                    formData.append("type1",item.type1);formData.append("type2",item.type2);formData.append("type3",item.type3);
                    formData.append("type4",item.type4);formData.append("type5",item.type5);formData.append("type6",item.type6);
                    formData.append("price1",item.price1);formData.append("price2",item.price2);formData.append("price3",item.price3);
                    formData.append("price4",item.price4);formData.append("price5",item.price5);formData.append("price6",item.price6);
                    /*修改时*/
                    if(this.modifyTitle == '修改窗口'){
                        this.$https.post('hotel/modify',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }else{//添加时
                        this.$https.post('hotel/add',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }
                    this.visible = false;
                    this.mainPic=this.desPic1=this.desPic2=this.desPic3=this.desPic4=this.desPic5=this.desPic6="";
                    this.upLoadfile = [];
                }
            },
            /*删除操作*/
            handleDelete(id){
                var _this=this;
                this.$confirm({
                    title: '是否确认删除该酒店数据?',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        _this.$https.post('hotel/delete',{id:id}).then( res => {
                            if(res.body.success){
                                _this.$message.success(res.body.rspDesc);
                                _this.updatePage();
                            }
                        })
                    },
                });
            },
            /*更新数据*/
            updatePage(){
                this.$https.post('hotel/getHotels',{index:0}).then( res => {
                    this.data = res.body.hotelList;
                })
            },
        },
        created(){
            this.updatePage()
        }
    };
</script>
<style scoped lang="scss">
    .left,.right{
        .ant-input{
            width: 220px!important;
        }
        .platform{
            margin-bottom: 7px;
        }
    }
    .pictBox{
        display: inline-block;
        position: relative;
        margin-bottom: 10px;
        img{
            width: 200px;
            height: 200px;
        }
        .delete {
            display: block;
            font-size: 12px;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            background-color: rgba(0, 0, 0, .4);
            color: #fff;
            position: absolute;
            top: 7px;
            right: 7px;
            cursor: pointer;
        }
    }
    .middle{
        margin-left: 10px;
        >div{
            margin-bottom: 5px;
        }
        .tip{
            width: 90px;
        }
        .pictBox{
            img{
                width: 170px;
                height: 150px;
            }
        }
    }
    .uploadsBox{
        display: inline-block;
        width: 190px;
        height: 190px;
        margin: 5px 10px;
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
</style>
