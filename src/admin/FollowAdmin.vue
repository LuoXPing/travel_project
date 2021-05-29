<template>
    <div>
        <!--添加按钮-->
        <div style="width: 100px;margin-bottom: 10px;"><a-button @click="handleAdd">添加</a-button></div>
        <!--表格-->
        <a-table :columns="columns" :dataSource="data" class="components-table-demo-nested"
                 @expand="open" :expandedRowKeys="expandedRowKeys" rowKey= " row => row.id" borded>
            <!--图片的显示-->
            <template slot="desPic" slot-scope="text,record">
                <img :src="record.desPic" alt="" style="width: 100px;">
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
            </a-table>
        </a-table>
        <!--弹框：用于修改和增加-->
        <a-modal :title="modifyTitle" v-model="visible" @ok="handleOk" >
            <div class="smallTip">友情提醒：请保持数据的完整性！</div>
            <div style="display: flex;">
                <div class="left" style="flex: 1;">
                    <div><span class="tip">出发地：</span><a-input v-model="ediItem.startAdd"/></div>
                    <div><span class="tip">到达地：</span><a-input v-model="ediItem.arriveAdd"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price"/></div>
                    <div ><span class="tip">描述图片：</span>
                        <div v-if="desPic" class="pictureBox">
                            <img :src="desPic">
                            <span class="delete" @click="desPic=''">X</span>
                        </div>
                        <div  v-else @click="triggerUpload()" class="uploadsBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload" @change="handleChange()" style="display: none">
                        </div>
                    </div>
                    <div class="platform"><span class="tip">天数：</span>第一天</div>
                    <div><span class="tip">地点：</span><a-input v-model="ediItem.address1"/></div>
                    <div><span class="tip">宾馆：</span><a-input v-model="ediItem.hotel1"/></div>
                    <div><span class="tip">饮食：</span><a-input v-model="ediItem.meal1"/></div>
                    <div class="platform"><span class="tip">天数：</span>第三天</div>
                    <div><span class="tip">地点：</span><a-input v-model="ediItem.address3"/></div>
                    <div><span class="tip">宾馆：</span><a-input v-model="ediItem.hotel3"/></div>
                    <div><span class="tip">饮食：</span><a-input v-model="ediItem.meal3"/></div>
                </div>
                <div class="right" style="flex: 1;margin:0 15px;">
                    <div><span class="tip">日期：</span><a-input v-model="ediItem.date"/></div>
                    <div ><span class="tip">当前特色：</span>
                        <span v-for="(item,index) in ediItem.fea" :key="index">
                            <span v-if="item=='1'">全程无自费 |</span>
                            <span v-if="item=='2'">含自由活动 |</span>
                            <span v-if="item=='3'">纯玩无购物 |</span>
                        </span><br/>
                        <a-button style="margin: 8px 8px 8px 80px;" v-if="hasFeature('1')"
                                  @click="handFeaDelete('1')">取消无自费</a-button>
                        <a-button style="margin: 8px 8px 8px 80px;" v-else @click="addFeature('1')">设为无自费</a-button>

                        <a-button style="margin-right: 8px;" v-if="hasFeature('2')"
                                  @click="handFeaDelete('2')">取消自由活动</a-button>
                        <a-button style="margin-right: 8px;" v-else @click="addFeature('2')">设为自由活动</a-button>

                        <a-button v-if="hasFeature('3')"  @click="handFeaDelete('3')" >取消无购物</a-button>
                        <a-button v-else @click="addFeature('3')">设为无购物</a-button>
                    </div>
                    <div><span class="tip">标题：</span> <a-textarea :rows="4"  v-model="ediItem.mainTitle"/></div>
                    <div class="platform"><span class="tip">天数：</span>第二天</div>
                    <div><span class="tip">地点：</span><a-input v-model="ediItem.address2"/></div>
                    <div><span class="tip">宾馆：</span><a-input v-model="ediItem.hotel2"/></div>
                    <div><span class="tip">饮食：</span><a-input v-model="ediItem.meal2"/></div>
                    <div class="platform"><span class="tip">天数：</span>第四天</div>
                    <div><span class="tip">地点：</span><a-input v-model="ediItem.address4"/></div>
                    <div><span class="tip">宾馆：</span><a-input v-model="ediItem.hotel4"/></div>
                    <div><span class="tip">饮食：</span><a-input v-model="ediItem.meal4"/></div>
                    <div class="platform"><span class="tip">天数：</span>第五天</div>
                    <div><span class="tip">地点：</span><a-input v-model="ediItem.address5"/></div>
                    <div><span class="tip">宾馆：</span><a-input v-model="ediItem.hotel5"/></div>
                    <div><span class="tip">饮食：</span><a-input v-model="ediItem.meal5"/></div>
                </div>
            </div>
        </a-modal>
    </div>

</template>
<script>
    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },

        { title: '价格', dataIndex: 'price', key: 'price'},
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '出发地', dataIndex: 'startAdd', key: 'startAdd' },
        { title: '到达地', dataIndex: 'arriveAdd', key: 'arriveAdd' },
        { title: '标题', dataIndex: 'mainTitle', key: 'mainTitle',width:250  },
        { title: '特色', dataIndex: 'feature', key: 'feature',width:180},
        { title: '描述图片', dataIndex: 'desPic', key: 'desPic',scopedSlots: { customRender: 'desPic' },width:120 },
        { title: '操作', dataIndex: 'operation',key:'operation', scopedSlots: { customRender: 'operation' }},
    ];
    const innerColumns = [
        { title: '天数', dataIndex: 'day', key: 'day' },
        { title: '地点', dataIndex: 'address',key: 'address' },
        { title: '宾馆', dataIndex: 'hotel', key: 'hotel' },
        { title: '饮食', dataIndex: 'meal', key: 'meal'},
    ];
    export default {
        data() {
            return {
                data:[],
                columns,
                innerColumns,//子表格的行
                innerData:[],//子表格数据
                expandedRowKeys:[],//展开的rowkey
                upLoadfile:[],//待上传的图片
                desPic:"", //图片，用于显示
                visible:false,//弹窗的可见性
                modifyTitle:"",
                ediItem:{fea:[]}
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
                    { day:"第一天",address:record.address1,hotel:record.hotel1,meal:record.meal1},
                    { day:"第二天",address:record.address2,hotel:record.hotel2,meal:record.meal2},
                    { day:"第三天",address:record.address3,hotel:record.hotel3,meal:record.meal3},
                    { day:"第四天",address:record.address4,hotel:record.hotel4,meal:record.meal4},
                    { day:"第五天",address:record.address5,hotel:record.hotel5,meal:record.meal5},
                ];
            },
            /*功能：上传图片*/
            handleChange () {
                var files = this.$refs.bgUpload.files;
                const _this=this;
                function readAndPreview(file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        _this.desPic=this.result
                    };
                    reader.readAsDataURL(file);
                }
                if (files) {
                    [].forEach.call(files, readAndPreview);
                }else{
                    return;
                }
                if(this.ediItem.desPic){
                    var names = this.ediItem.desPic.slice( this.ediItem.desPic.lastIndexOf('/')+1,-1);
                }
                var newfile = new File([files[0]],names+'1',{type:"image/jpeg"});
                this.upLoadfile = newfile;
            },
            triggerUpload(){
                this.$refs.bgUpload.dispatchEvent(new MouseEvent("click"));
            },
            /*增加机票*/
            handleAdd(){
                this.visible = true;
                this.modifyTitle = "添加窗口";
                this.desPic="";
                this.ediItem = {mainTitle:"",desPic:"",price:"",date:"",startAdd:"",arriveAdd:"",feature:"",address1:"",hotel1:"",meal1:"",
                    fea:[],address2:"",hotel2:"",meal2:"",address3:"",hotel3:"",meal3:"",address4:"",hotel4:"",meal4:"",address5:"",hotel5:"",meal5:""};
            },
            handleEditor(item){
                this.visible = true;
                this.modifyTitle = "修改窗口";
                this.ediItem = item;
                this.desPic =item.desPic;
            },
            /*特色删除*/
            handFeaDelete(item){
                this.ediItem.fea.some((feature,index)=>{
                    if(feature==item){
                        this.ediItem.fea.splice(index,1);
                    }
                })
                this.ediItem.fea =   [...new Set(this.ediItem.fea)];
            },
            /*特色增加*/
            addFeature(index){
                this.ediItem.fea.push(index);
                this.ediItem.fea =   [...new Set(this.ediItem.fea)];
            },
            /*判断是否包含这个特色*/
            hasFeature(index){
                var feaList = this.ediItem.fea;
                for(var i=0;i<feaList.length;i++){
                    if(index==feaList[i]){ return true;}
                }
                return false;
            },
            /*点击弹框的确认按钮*/
            handleOk(){
                var item = this.ediItem;
                if(item.mainTitle==""||this.desPic==""||item.price==""||item.date==""||item.startAdd==""||item.arriveAdd==""||
                    item.address1==""||item.hotel1==""||item.meal1==""||item.address2==""||item.hotel2==""||item.meal2==""||item.address3==""||
                    item.hotel3==""|| item.meal3==""||item.address4==""||item.hotel4==""||item.meal4==""||item.address5==""||item.hotel5==""||
                    item.meal5==""){
                    this.$message.error("请输入完整的信息！");
                }else {
                    /*处理待上传数据----*/
                    var formData = new FormData();
                    var feas =[...new Set(item.fea)];
                    var feaWord="";
                    feas.forEach(item=>{feaWord+= item+'-'});
                    feaWord = feaWord.substr(0, feaWord.length - 1);
                    formData.append("file",this.upLoadfile);
                    formData.append("id",item.id);
                    formData.append("mainTitle",item.mainTitle);formData.append("desPic",item.desPic);
                    formData.append("price",item.price);formData.append("date",item.date);formData.append("startAdd",item.startAdd);
                    formData.append("arriveAdd",item.arriveAdd);formData.append("feature",feaWord);formData.append("address1",item.address1);
                    formData.append("hotel1",item.hotel1);formData.append("meal1",item.meal1);formData.append("address2",item.address2);
                    formData.append("hotel2",item.hotel2);formData.append("meal2",item.meal2);formData.append("address3",item.address3);
                    formData.append("hotel3",item.hotel3);formData.append("meal3",item.meal3);formData.append("address4",item.address4);
                    formData.append("hotel4",item.hotel4);formData.append("meal4",item.meal4);formData.append("address5",item.address5);
                    formData.append("hotel5",item.hotel5);formData.append("meal5",item.meal5);
                    /*修改时*/
                    if(this.modifyTitle == '修改窗口'){
                        this.$https.post('follow/modify',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }else{//添加时
                        this.$https.post('follow/add',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }
                    this.visible = false;
                    this.desPic="";
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
                        _this.$https.post('follow/delete',{id:id}).then( res => {
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
                this.$https.post('follow/getAll').then( res => {
                    this.data = res.body.followList;
                    this.data.forEach(item=>{
                        var feature = item.feature.split('-');
                        var featureWord = "";
                        item.fea = feature
                        feature.forEach(item=>{
                            if(item == '1'){featureWord+='全程无自费 | '}
                            else if(item == '2'){
                                featureWord+='含自由活动 | ';
                            }else if(item == '3'){
                                featureWord+='纯玩无购物 | ';
                            }
                        })
                        item.feature = featureWord;
                    });

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
            width: 280px!important;
        }
        .platform{
            margin-bottom: 8px;
        }
    }
    .pictureBox{
        display: inline-block;
        position: relative;
        margin-bottom: 10px;
        img{
            width: 220px;
            height: 220px;
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
    .uploadsBox{
        display: inline-block;
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
