<template>
   <div>
       <div style="width: 100px;margin-bottom: 10px;"><a-button @click="handleAdd">添加</a-button></div>
       <a-table :columns="columns" :dataSource="data" bordered>
           <!--最后一行操作-->
           <template slot="action" slot-scope="text, record">
               <a @click="handleEditor(record)">编辑</a>
               <a-divider type="vertical" />
               <a @click="handleDelete(record.id)">删除</a>
           </template>
       </a-table>
       <!--添加修改弹框-->
       <a-modal :title="modifyTitle" v-model="visible" @ok="handleOk" >
           <div class="smallTip">友情提醒：请保持数据的完整性！</div>
           <div style="display: flex;">
               <div class="left" style="flex: 1;">
                   <div><span class="tip">出发地：</span><a-input v-model="ediItem.startDes"/></div>
                   <div><span class="tip">到达地：</span><a-input v-model="ediItem.arriveDes"/></div>
                   <div><span class="tip">航空公司：</span><a-input v-model="ediItem.company"/></div>
                   <div><span class="tip">公司代码：</span><a-input v-model="ediItem.companyType"/></div>
                   <div><span class="tip">飞机类型：</span><a-input v-model="ediItem.airtype"/></div>
                   <div><span class="tip">价格：</span><a-input v-model="ediItem.price"/></div>
               </div>
               <div class="middle" style="flex: 1;margin:0 15px;">
                   <div><span class="tip">出发时间：</span><a-input v-model="ediItem.startDate"/></div>
                   <div><span class="tip">出发机场：</span><a-input v-model="ediItem.startAirport"/></div>
                   <div><span class="tip">到达时间：</span><a-input v-model="ediItem.arriveDate"/></div>
                   <div><span class="tip">到达机场：</span><a-input v-model="ediItem.arriveAirport"/></div>
                   <div><span class="tip">时长：</span><a-input v-model="ediItem.duration"/></div>
               </div>
           </div>
       </a-modal>
   </div>
</template>
<script>
    const columns = [
        {title: 'id', dataIndex: 'id'},
        {title: '出发地', dataIndex: 'startDes'},
        {title: '到达地', dataIndex: 'arriveDes'},
        {title: '航空公司', dataIndex: 'company'},
        {title: '公司代码', dataIndex: 'companyType'},
        {title: '飞机类型', dataIndex: 'airtype'},
        {title: '价格', dataIndex: 'price',defaultSortOrder: 'descend', sorter: (a, b) => a.price - b.price,},
        {title: '出发时间', dataIndex: 'startDate'},
        {title: '出发机场', dataIndex: 'startAirport'},
        {title: '到达时间', dataIndex: 'arriveDate'},
        {title: '到达机场', dataIndex: 'arriveAirport'},
        {title: '时长', dataIndex: 'duration'},
        {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'action' },
        },
    ];
    export default {
        data() {
            return {
                columns,
                data:[],
                //待修改的项目
                ediItem:{},
                visible:false,//弹框可见性
                modifyTitle:'',//弹框标题
            };
        },
        methods: {
            /*增加机票*/
            handleAdd(){
                this.visible = true;
                this.modifyTitle = "添加窗口";
                this.ediItem = {startDes:"",arriveDes:"",company:"",companyType:"",startDate:"",startAirport:"",
                    arriveDate:"", arriveAirport:"",duration:"",airtype:"",price:""}
            },
            /*功能：编辑操作，跳出弹框，初始化数据*/
            handleEditor(item){
                this.visible = true;
                this.ediItem = item;
                this.modifyTitle = "修改窗口";
            },
            /*点击弹框的确认按钮*/
            handleOk(){
                var item = this.ediItem;
                if(item.startDes==""||item.arriveDes==""||item.company==""||item.companyType==""||item.startDate==""||item.price==""||
                    item.arriveDate==""||item.arriveAirport==""||item.duration==""||item.airtype==""||item.startAirport==""){
                    this.$message.error("请输入完整的信息！");
                }else {
                    /*修改时*/
                    if(this.modifyTitle == '修改窗口'){
                        this.$https.post('ticket/modify',item).then( res => {
                            if(res.body.success){
                                this.$message.success(res.body.rspDesc);
                                this.updatePage();
                            }
                        })
                    }else{//添加时
                        this.$https.post('ticket/add',item).then( res => {
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
                    title: '是否确认删除该机票?',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        _this.$https.post('ticket/delete',{id:id}).then( res => {
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
                this.$https.post('ticket/getAll').then( res => {
                    this.data = res.body.TicketList;
                })
            },
        },
        created(){
            this.updatePage();
        }
    };
</script>


<style scoped>

</style>