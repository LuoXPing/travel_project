<template>
    <div>
        <div style="width: 100px;margin-bottom: 10px;"><a-button @click="handleAdd">添加</a-button></div>
        <a-table :dataSource="data" :columns="columns">
            <!--搜索的功能-->
            <div slot="filterDropdown"   style="padding: 8px"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                <!--搜索框-->
                <a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                        style="width: 188px; margin-bottom: 8px; display: block;"/>
                <!--搜索按钮-->
                <a-button type="primary" icon="search" size="small" style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)">Search</a-button>
                <!--重置按钮-->
                <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
            </div>
            <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"/>
            <template slot="customRender" slot-scope="text, record, index, column">
                <span v-if="searchText && searchedColumn === column.dataIndex">
                    <template v-for="(fragment, i) in text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                        <mark v-if="fragment === searchText"
                              :key="i" class="highlight">{{fragment}}</mark>
                        <template v-else>{{fragment}}</template>
                    </template>
                </span>
                <template v-else>{{text}}</template>
            </template>
            <!--国家图片的显示-->
            <template slot="desPic" slot-scope="text,record">
                <img :src="record.desPic" alt="" style="width: 80px;">
            </template>
            <template slot="CountryPic" slot-scope="text,record">
                <img :src="record.countryPic" alt="" style="width: 80px;">
            </template>
            <!--最后一行操作-->
            <template slot="action" slot-scope="text, record">
                <a @click="handleEditor(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleDelete(record.id)">删除</a>
            </template>
        </a-table>
        <!--弹框：用于修改和增加-->
        <a-modal :title="modifyTitle" v-model="visible" @ok="handleOk" >
            <div class="smallTip">友情提醒：请保持数据的完整性！</div>
            <div style="display: flex;">
                <div class="left" style="flex: 1;">
                    <div><span class="tip">地址：</span><a-input v-model="ediItem.address"/></div>
                    <div><span class="tip">价格：</span><a-input v-model="ediItem.price"/></div>
                    <div><span class="tip">受理地区：</span><a-textarea :rows="4"  v-model="ediItem.area"/></div>
                    <div><span class="tip">描述图片：</span>
                        <div v-if="desPic" class="picBox">
                            <img :src="desPic">
                            <span class="delete" @click="deletePic('1')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('1')" class="uploadBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload1" @change="handleChange('1',ediItem.desPic)" style="display: none">
                        </div>
                </div>
                </div>
                <div class="middle" style="flex: 1;margin:0 15px;">
                    <div style="margin-bottom: 10px;">
                        <span class="tip">状态：
                            <span v-if="ediItem.recomd=='1'||ediItem.recomd=='热门'">热门</span>
                            <span v-else>普通</span>
                        </span>
                        <a-button @click="ediItem.recomd='1'" style="margin-right: 10px;">设为热门</a-button>
                        <a-button @click="ediItem.recomd='0'">设为普通</a-button>
                    </div>
                    <div><span class="tip">售卖标题：</span><a-textarea :rows="4"  v-model="ediItem.title"/></div>
                    <div><span class="tip">国家图片：</span>
                        <div v-if="countryPic" class="picBox">
                            <img :src="countryPic">
                            <span class="delete" @click="deletePic('2')">X</span>
                        </div>
                        <div  v-else @click="triggerUpload('2')" class="uploadBox">
                            <a-icon type="plus" class="icon"/><br/>
                            <span>选择图片</span>
                            <input type="file" accept='image/*' ref="bgUpload2" @change="handleChange('2',ediItem.CountryPic)" style="display: none">
                        </div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>

</template>

<script>
    const columns = [
        {title: 'id', dataIndex: 'id', key: 'id'},
        { title: '地址', dataIndex: 'address', key: 'address',width:80,
            scopedSlots: {filterDropdown: 'filterDropdown', filterIcon: 'filterIcon',
                customRender: 'customRender',},
            onFilter: (value, record) => record.address.includes(value),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => { this.searchInput.focus();}, 0);
                }
            },
        },
        {title: '售卖标题', dataIndex: 'title', key: 'title',width:200},
        { title: '价格', dataIndex: 'price', key: 'price'},
        { title: '描述图片', dataIndex: 'desPic', key: 'desPic',scopedSlots: { customRender: 'desPic' }},
        { title: '国家图片', dataIndex: 'countryPic', key: 'CountryPic',scopedSlots: { customRender: 'CountryPic' }},
        { title: '受理地区', dataIndex: 'area', key: 'area',width:200},
        { title: '状态', dataIndex: 'recomd', key: 'recomd'},
        {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'action' },
        }];
    export default {
        data() {
            return {
                columns,
                data:[],//数据
                searchText: '',
                searchInput: null,
                searchedColumn: '',
                visible:false,//弹窗可见性
                modifyTitle:'',//弹窗标题
                ediItem:{},//待修改的
                desPic:"",//描述图片
                countryPic:"",//描述图片2
                upLoadfile:[],//待上传的图片
            };
        },
        methods: {
            /*搜索内容*/
            handleSearch(selectedKeys, confirm, dataIndex) {
                confirm();
                this.searchText = selectedKeys[0];
                this.searchedColumn = dataIndex;
            },
            /*重置搜索的内容*/
            handleReset(clearFilters) {
                clearFilters();
                this.searchText = '';
            },
            /*功能：上传图片*/
            handleChange (index,name) {
                var files = index =="1"? this.$refs.bgUpload1.files:this.$refs.bgUpload2.files;
                const _this=this;
                function readAndPreview(file) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        if(index =="1"){
                            _this.desPic = this.result;
                        }else{
                            _this.countryPic = this.result
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
                }else{
                    this.$refs.bgUpload2.dispatchEvent(new MouseEvent("click"));
                }
            },
            /*重新选择图片*/
            deletePic(index){
                this.upLoadfile.some((item,i)=>{
                    if(parseInt(item.name)==index){
                        this.upLoadfile.splice(i,1);
                    }
                })
                if(index =="1"){
                    this.desPic = "";
                }else{
                    this.countryPic = "";
                }
            },
            /*增加机票*/
            handleAdd(){
                this.upLoadfile = [];
                this.visible = true;
                this.modifyTitle = "添加窗口";
                this.ediItem = {address:"",title:"",price:"",desPic:"",countryPic:"",area:"",recomd:""};
            },
            /*功能：编辑操作，跳出弹框，初始化数据*/
            handleEditor(item){
                this.upLoadfile = [];
                this.visible = true;
                this.ediItem = item;
                this.desPic =item.desPic;
                this.countryPic =item.countryPic;
                this.modifyTitle = "修改窗口";
            },
            /*点击弹框的确认按钮*/
            handleOk(){
                var item = this.ediItem;
                if(item.address==""||item.title==""||item.price==""||this.desPic==""||this.countryPic==""||
                    item.area==""||item.recomd==""){
                    this.$message.error("请输入完整的信息！");
                }else {
                    /*处理待上传数据----*/
                    var formData = new FormData();
                    for (var i=0;i<this.upLoadfile.length;i++){
                        formData.append("file",this.upLoadfile[i])
                    }
                    formData.append("id",item.id);
                    formData.append("address",item.address);
                    formData.append("title",item.title);
                    formData.append("price",item.price);
                    formData.append("desPic",item.desPic);
                    formData.append("countryPic",item.countryPic);
                    formData.append("area",item.area);
                    formData.append("recomd",item.recomd);
                    /*修改时*/
                    if(this.modifyTitle == '修改窗口'){
                        this.$https.post('passport/modify',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }else{//添加时
                        this.$https.post('passport/add',formData).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }
                    this.visible = false;
                }
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
                        _this.$https.post('passport/delete',{id:id}).then( res => {
                            if(res.body.success){
                                _this.$message.success(res.body.rspDesc);
                                _this.updatePage();
                            }
                        })
                    },
                });
            },
            /*初始化数据*/
            updatePage(){
                this.$https.post('passport/getAll').then( res => {
                    this.data = res.body.passportList
                    this.data.forEach(item=>{
                        if(item.recomd=='1'){item.recomd="热门";}
                        else{item.recomd="普通";}
                    });
                })
            },
        },
        created(){
            this.updatePage();
        }
    };
</script>
<style scoped lang="scss">
    .highlight {
        background-color: rgb(255, 192, 105);
        padding: 0px;
    }
    .picBox{
        display: inline-block;
        position: relative;
        img{
            width: 300px;
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
    .uploadBox{
        display: inline-block;
    }
</style>
