<template>
    <div class="user">
        <a-table bordered :dataSource="dataSource" :columns="columns">
            <!--头像显示-->
            <template slot="picture" slot-scope="text,record">
                <img :src="record.picture" alt="" style="width: 80px;">
            </template>
            <!--删除操作-->
            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="dataSource.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.id)"
                >
                       <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
        </a-table>
    </div>
    
</template>

<script>
    export default {
        name: "UserAdmin",
        data(){
            return{
                /*表格数据---*/
                dataSource: [],
                count: 2,
                /*表格内容*/
                columns: [
                    { title: 'id',dataIndex: 'id',key:'id'},
                    { title: '类型',dataIndex: 'type',key:'type'},
                    { title: '昵称',dataIndex: 'nickName',key:'nickName',},
                    { title: '账号',dataIndex: 'account',key:'account',},
                    { title: '密码',dataIndex: 'password',key:'password',},
                    { title: '密保',dataIndex: 'passQues',key:'passQues',},
                    { title: '答案',dataIndex: 'passAns',key:'passAns',},
                    { title: '头像',dataIndex: 'picture',key:'picture', scopedSlots: { customRender: 'picture' },},
                    { title: '性别',dataIndex: 'sex',key:'sex',},
                    { title: '描述',dataIndex: 'des',key:'des',},
                    { title: '地址',dataIndex: 'address',key:'address',},
                    { title: '操作', dataIndex: 'operation',key:'operation', scopedSlots: { customRender: 'operation' },},
                ],
            };
        },
        methods:{
            /*删除某个数据*/
            onDelete(id) {
                this.$https.post('user/delete',{id:id}).then( res => {
                    if(res.body.success){
                        this.$message.success(res.body.rspDesc);
                        this.updaataPage();
                    }
                })
            },
            /*更新数据*/
            updaataPage(){
                this.$https.post('user/getall').then( res => {
                    this.dataSource = res.body.userList;
                    /*重构数据*/
                    this.dataSource.forEach(item=>{
                        if(item.passQues == 'address'){
                            item.passQues = "你的家庭住址？"
                        }else if(item.passQues == 'bir'){
                            item.passQues = "你的生日是什么时候？"
                        }else if(item.passQues == 'school'){
                            item.passQues = "你的小学名字是什么？"
                        }else{
                            item.passQues = "你母亲叫什么？"
                        }
                        item.type = item.type == '1'?"管理员":"普通用户";
                        item.sex = item.sex == '1'?"女":"男";
                    })
                    //数据的个数
                    this.count = this.dataSource.length;
                })
            },
        },
        created(){
            this.updaataPage()
        }
        
    }
</script>
