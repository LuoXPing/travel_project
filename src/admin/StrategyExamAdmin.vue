<template>
    <div>
        <a-table bordered :dataSource="dataSource" :columns="columns">
            <!--最后一行操作-->
            <template slot="operation" slot-scope="text, record">
                <a @click="handPublish(record.id)">发布</a>
                <a-divider type="vertical" />
                <a @click="deleteStra(record.id)">删除</a>
                <a-divider type="vertical" />
                <a @click="gotoDetail(record.id)">详情</a>
            </template>
        </a-table>
    </div>
</template>

<script>
    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '所属用户', dataIndex: 'user_id', key: 'user_id'},
        { title: '点赞数量', dataIndex: 'supportNum', key: 'supportNum' },
        { title: '标题', dataIndex: 'mainTitle', key: 'mainTitle',width:200 },
        { title: '旅游地', dataIndex: 'address', key: 'address' },
        { title: '花费', dataIndex: 'cost', key: 'cost'},
        { title: '旅游时间', dataIndex: 'travel_time', key: 'travel_time'},
        { title: '人物', dataIndex: 'person', key: 'person'},
        { title: '时长', dataIndex: 'duration', key: 'duration'},
        { title: '操作', dataIndex: 'operation',key:'operation', scopedSlots: { customRender: 'operation' }},
    ];
    export default {
        name: "StrategyAdmin",
        data(){
            return{
                columns,
                dataSource:[],
                token:'',
                user_Id:''
            }
        },
        methods: {
            /*查看详情*/
            gotoDetail(id){
                this.$router.push( {path:'/strategyDetail',
                    query:{ id:id }
                })
            },
            /*发布文章*/
            handPublish(id){
                this.$https.post('strategy/modify',{id:id,publish:1}).then( res => {
                    if(res.body.success){
                        this.$message.success(res.body.rspDesc)
                        this.updatePage();
                    }
                })
            },
            /*删除该文章*/
            deleteStra(id){
                if(this.user_Id==""||this.token==""){
                    this.$message.error("请登录后再操作");
                }else{
                    this.$https.post('/strategy/delete',{user_Id:this.user_Id,token:this.token,id:id}).then( res => {
                        if(res.body.success){
                            this.$message.success(res.body.rspDesc)
                            this.updatePage();
                        }
                    })
                }
            },
            /*更新数据*/
            updatePage(){
                this.$https.post('strategy/getAll',{publish:0}).then( res => {
                    this.dataSource = res.body.strategyList;
                })
            },
        },
        created(){
            this.user_Id = this.$store.state.account;
            this.token = this.$store.state.token;
            this.updatePage()
        }
    }
</script>

<style scoped>

</style>