<template>
    <div>
        <div style="width: 100px;margin-bottom: 10px;"><a-button @click="handleAdd">添加</a-button></div>
        <!--表格显示数据-->
        <a-table :columns="columns" :dataSource="data" :scroll="{ x: 2335 }" >
            <!--图片显示处理-->
            <template slot="desPic1" slot-scope="text,record">
                <img :src="record.desPic1" alt="" style="width: 120px;">
            </template>
            <template slot="proPic1" slot-scope="text,record">
                <img :src="record.proPic1" alt="" style="width: 100px;height: 100px;">
            </template>
            <template slot="proPic2" slot-scope="text,record">
                <img :src="record.proPic2" alt="" style="width: 100px;height: 100px;">
            </template>
            <template slot="hotelPic" slot-scope="text,record">
                <img :src="record.hotelPic" alt="" style="width: 120px;">
            </template>
            <!--最后一行操作-->
            <template slot="action" slot-scope="text, record">
                <a @click="handleEditor(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleDelete(record.id)">删除</a>
            </template>
        </a-table>
        <!--修改框-->
        <a-modal :title="modifyTitle" v-model="visible" @ok="handleOk" >
            <div class="smallTip">友情提醒：除最后一列外，其余数据不能为空!!!</div>
           <div style="display: flex;">
               <div class="left" style="flex: 2;">
                   <div><span class="tip">出发地：</span><a-input v-model="ediItem.startAdd"/></div>
                   <div><span class="tip">到达地：</span><a-input v-model="ediItem.arrivedAdd"/></div>
                   <div><span class="tip">售卖标题：</span>
                       <a-textarea :rows="4"  v-model="ediItem.mainTitle"/>
                   </div>
                   <div><span class="tip">价格：</span><a-input v-model="ediItem.price"/></div>
                   <div><span class="tip">出发时间：</span><a-input v-model="ediItem.deptime"/></div>
                   <div><span class="tip">酒店名称：</span><a-input v-model="ediItem.hotelName"/></div>
                   <div><span class="tip">酒店描述：</span>
                       <a-textarea :rows="4"  v-model="ediItem.hotelDes"/>
                   </div>
                   <div><span class="tip">酒店地址：</span><a-input v-model="ediItem.hotelLocate"/></div>
               </div>
               <div class="middle" style="flex: 1.5;margin:0 15px;">
                   <div class="picture">
                       <span class="tip">描述图片：</span>
                       <div v-if="desPic1">
                           <img :src="desPic1" >
                           <span class="delete" @click="deletePic('1')">X</span>
                       </div>
                       <div  v-else @click="triggerUpload('1')" class="uploadBox">
                           <a-icon type="plus" class="icon"/><br/>
                           <span>选择图片</span>
                           <input type="file" accept='image/*' ref="bgUpload1" @change="handleChange('1',ediItem.desPic1)" style="display: none">
                       </div>
                   </div>
                   <div  class="picture">
                       <span class="tip">酒店图片：</span>
                       <div v-if="hotelPic">
                           <img :src="hotelPic">
                           <span class="delete" @click="deletePic('4')">X</span>
                       </div>
                       <div  v-else @click="triggerUpload('4')" class="uploadBox">
                           <a-icon type="plus" class="icon"/><br/>
                           <span>选择图片</span>
                           <input type="file" accept='image/*' ref="bgUpload4" @change="handleChange('4',ediItem.hotelPic)" style="display: none">
                       </div>
                   </div>
               </div>
               <div class="right" style="flex: 1">
                   <div class="picture">
                       <span class="tip">产品描述1：</span>
                       <div v-if="proPic1">
                           <img :src="proPic1" >
                           <span class="delete" @click="deletePic('2')">X</span>
                       </div>
                       <div  v-else @click="triggerUpload('2')" class="uploadBox">
                           <a-icon type="plus" class="icon"/><br/>
                           <span>选择图片</span>
                           <input type="file" accept='image/*' ref="bgUpload2" @change="handleChange('2',ediItem.proPic1)" style="display: none">
                       </div>
                   </div>
                   <div class="picture"><span class="tip">产品描述2：</span>
                       <div v-if="proPic2">
                           <img :src="proPic2">
                           <span class="delete" @click="deletePic('3')">X</span>
                       </div>
                       <div  v-else @click="triggerUpload('3')" class="uploadBox">
                           <a-icon type="plus" class="icon"/><br/>
                           <span>选择图片</span>
                           <input type="file" accept='image/*' ref="bgUpload3" @change="handleChange('3',ediItem.proPic2)" style="display: none">
                       </div>
                   </div>
               </div>
           </div>
        </a-modal>
    </div>

</template>
<script>
    const columns = [
        {title: 'id', dataIndex: 'id', key: 'id',fixed: 'left'},
        {title: '出发地', dataIndex: 'startAdd', key: 'startAdd',fixed: 'left'},
        {title: '到达地', dataIndex: 'arrivedAdd', key: 'arrivedAdd',fixed: 'left'},
        {title: '售卖标题', dataIndex: 'mainTitle', key: 'mainTitle',width: 500},
        {title: '描述图片', dataIndex: 'desPic1', key: 'desPic1',scopedSlots: { customRender: 'desPic1' },},
        {title: '价格', dataIndex: 'price', key: 'price',},
        {title: '出发时间', dataIndex: 'deptime', key: 'deptime',width: 100},
        {title: '产品描述', dataIndex: 'proPic1', key: 'proPic1',scopedSlots: { customRender: 'proPic1' },},
        {title: '产品描述', dataIndex: 'proPic2', key: 'proPic2',scopedSlots: { customRender: 'proPic2' },},
        {title: '酒店图片', dataIndex: 'hotelPic', key: 'hotelPic',scopedSlots: { customRender: 'hotelPic' },},
        {title: '酒店名称', dataIndex: 'hotelName', key: 'hotelName',width: 200},
        {title: '酒店描述', dataIndex: 'hotelDes', key: 'hotelDes',width: 300},
        {title: '酒店地址', dataIndex: 'hotelLocate', key: 'hotelLocate'},
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
        },
    ]
    export default {
        data() {
            return {
                data:[],//表格数据
                columns,//表头内容
                visible:false,
                modifyTitle:'',
                ediItem:{},//待编辑的项目
                desPic1:'',//描述图片
                proPic1:'',//产品描述图片
                proPic2:'',//产品描述图片
                hotelPic:'',//酒店图片
                upLoadfile:[],//待上传的图片
            };
        },
        methods:{
            /*功能：上传图片*/
            handleChange (index,name) {
                var files ="";
                switch (index) {
                    case "1": { files = this.$refs.bgUpload1.files; break;}
                    case "2": { files = this.$refs.bgUpload2.files; break;}
                    case "3": { files = this.$refs.bgUpload3.files; break;}
                    default:  {files = this.$refs.bgUpload4.files; break;}
                }
                const _this=this;
                function readAndPreview(file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        switch (index) {
                            case "1": { _this.desPic1 = this.result; break;}
                            case "2": { _this.proPic1 = this.result; break;}
                            case "3": { _this.proPic2 = this.result; break;}
                            default:  { _this.hotelPic =this.result; break;}
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
                if(index== "1"){
                    this.$refs.bgUpload1.dispatchEvent(new MouseEvent("click"));
                }else if(index== "2"){
                    this.$refs.bgUpload2.dispatchEvent(new MouseEvent("click"));
                }else if(index== "3"){
                    this.$refs.bgUpload3.dispatchEvent(new MouseEvent("click"));
                }else{
                    this.$refs.bgUpload4.dispatchEvent(new MouseEvent("click"));
                }

            },
            /*重新选择图片*/
            deletePic(index){
                this.upLoadfile.some((item,i)=>{
                    if(parseInt(item.name)==index){
                        this.upLoadfile.splice(i,1);
                    }
                })
                switch (index) {
                    case "1": { this.desPic1 = ''; break;}
                    case "2": { this.proPic1 = ''; break;}
                    case "3": { this.proPic2 = ''; break;}
                    default:  { this.hotelPic = ''; break;}
                }
            },
            /*功能：编辑操作，跳出弹框，初始化数据*/
            handleEditor(item){
                this.upLoadfile = [];
                this.visible = true;
                this.ediItem = item;
                this.desPic1 =item.desPic1;
                this.proPic1 =item.proPic1;
                this.proPic2 =item.proPic2;
                this.hotelPic=item.hotelPic;
                this.modifyTitle = "修改窗口";
            },
            /*添加操作*/
            handleAdd(){
                this.desPic1 = this.proPic1 = this.proPic2 = this.hotelPic="";
                this.upLoadfile = [];
                this.visible = true;
                this.modifyTitle = "添加窗口";
                this.ediItem = { mainTitle:"",arrivedAdd:"",startAdd:"",deptime:"",price:"",hotelName:"",
                    hotelDes:"",hotelLocate:"",desPic1:"",hotelPic:""};
            },
            /*确认上传修改*/
            handleOk() {
                var item = this.ediItem;
                if(item.mainTitle==""||item.arrivedAdd==""||item.startAdd==""||item.deptime==""||item.price==""
                    ||item.hotelName==""||item.hotelDes==""||item.hotelLocate==""||this.desPic1==""||this.hotelPic==""){
                    this.$message.error("请输入完整的信息！");
                }else{
                    /*处理待上传数据----*/
                    var formData = new FormData();
                    for (var i=0;i<this.upLoadfile.length;i++){
                        formData.append("file",this.upLoadfile[i])
                    }
                    formData.append("proPic1",this.proPic1===""?"":item.proPic1);
                    formData.append("proPic2",item.proPic2==""?"":item.proPic2);
                    formData.append("id",item.id);
                    formData.append("desPic1",item.desPic1);
                    formData.append("hotelPic",item.hotelPic);
                    formData.append("mainTitle",item.mainTitle);
                    formData.append("startAdd",item.startAdd);
                    formData.append("arrivedAdd",item.arrivedAdd);
                    formData.append("price",item.price);
                    formData.append("deptime",item.deptime);
                    formData.append("hotelName",item.hotelName);
                    formData.append("hotelDes",item.hotelDes);
                    formData.append("hotelLocate",item.hotelLocate);
                    /*修改时*/
                    if(this.modifyTitle == '修改窗口'){
                        this.$https.post('selfguid/modify',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }else{//添加时
                        this.$https.post('selfguid/add',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }
                }
                this.desPic1 = this.proPic1 = this.proPic2 = this.hotelPic="";
                this.visible = false;
                this.upLoadfile = [];
            },
            /*删除操作*/
            handleDelete(id){
                var _this=this;
                this.$confirm({
                    title: '是否确认删除该套餐?',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        _this.$https.post('selfguid/delete',{id:id}).then( res => {
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
                this.$https.post('selfguid/getAll').then( res => {
                    this.data = res.body.selfGuidList;
                })
            },
        },
        created(){
            this.updatePage();
        }
    };
</script>
<style lang="scss">
    /*编辑框的样式*/
    .ant-modal{
        width: 1000px!important;
    }

    .smallTip{
        color: red;
        font-size: 12px;
        margin-bottom: 5px;
    }
    .tip{
        display: inline-block;
        width: 80px;
        font-size: 14px;
        color: #666;
    }
    .middle{
        .picture{
            img{
                width: 300px;
                height: 200px;
            }
        }
    }
    .right{
        .picture{
            img{
                width: 200px;
                height: 200px;
            }

        }
    }
    .left,.middle,.right{
        .ant-input{
            width: 300px;
            margin-bottom: 10px;
        }
    }
    .picture{
        margin-bottom: 10px;
        position: relative;
        .delete{
            display: block;
            font-size: 12px;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            background-color: rgba(0,0,0,.4);
            color: #fff;
            position: absolute;
            top: 30px;
            right: 15px;
            cursor: pointer;
        }
    }
    /*图片上传框*/
    .uploadBox{
        width: 200px;
        height: 200px;
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
