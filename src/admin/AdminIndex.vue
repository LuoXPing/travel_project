<template>
    <a-layout id="components-layout-demo-fixed-sider">
        <!--左边侧边栏目录-->
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
            <div class="logo"></div>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['user']">
                <a-menu-item v-for="item in menuCont" :key="item.key"
                              @click="choseItem(item)">
                    <a-icon :type="item.icon" />
                    <span>{{item.name}}</span>
                </a-menu-item>
                <a-sub-menu v-for="item in menuContSub" :key="item.key">
                    <span slot="title"><a-icon :type="item.icon" />{{item.name}}</span>
                    <a-menu-item v-for="sub in item.subMenu"  :key="sub.key"
                                 @click="chooseSubItem(item,sub)"
                    >{{sub.name}}</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <!--右侧内容-->
        <a-layout :style="{ marginLeft: '200px' }">
            <!--头部内容-->
            <a-layout-header :style="{ background: '#fff', padding: 40}" >
                <span style="font-size: 20px; color: #999;">旅游社管理系统</span>
            </a-layout-header>
            <!--主体内容-->
            <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                <a-breadcrumb style="margin: 5px 0">
                    <a-breadcrumb-item>{{firstBread}}</a-breadcrumb-item>
                    <a-breadcrumb-item v-show="lastBread">{{lastBread}}</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', textAlign: 'center',minHeight:'630px' }">
                    <UserAdmin v-show="nowIndex=='user'"/>
                    <FreeAdmin v-show="nowIndex=='free'"/>
                    <TicketAdmin v-show="nowIndex=='ticket'"/>
                    <PassportAdmin v-show="nowIndex=='passport'"/>
                    <HotelRecomAdmin v-show="nowIndex=='recomd'"/>
                    <HotelComAdmin v-show="nowIndex=='ordinary'"/>
                    <FollowAdmin v-show="nowIndex=='follow'"/>
                    <StrategyExamAdmin v-show="nowIndex=='examine'"/>
                    <StrategyPubAdmin v-show="nowIndex=='published'"/>
                </div>
            </a-layout-content>
            <!--尾部信息处理-->
            <a-layout-footer :style="{ textAlign: 'center' }">
                旅游社管理系统  Created by LuoXiaoPing
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import UserAdmin from '../admin/UserAdmin';
    import FreeAdmin from '../admin/FreeAdmin';
    import TicketAdmin from '../admin/TicketAdmin';
    import PassportAdmin from '../admin/PassportAdmin';
    import HotelRecomAdmin from '../admin/HotelRecomAdmin';
    import HotelComAdmin from '../admin/HotelComAdmin';
    import FollowAdmin from '../admin/FollowAdmin';
    import StrategyExamAdmin from './StrategyExamAdmin';
    import StrategyPubAdmin from './StrategyPubAdmin';
    export default {
        data() {
            return {
                /*侧边栏的目录信息*/
                menuCont:[
                    {icon:'usergroup-add',key:'user',name:'用户管理'},
                    {icon:'rocket',key:'free',name:'自由行管理'},
                    {icon:'flag',key:'follow',name:'跟团游管理'},
                    {icon:'global',key:'passport',name:'签证管理'},
                    {icon:'car',key:'ticket',name:'车票管理'},

                ],
                menuContSub:[
                    {icon:'container',key:'strategy',name:'游记管理',subMenu:[
                            {key:'examine',name:'待审核'},
                            {key:'published',name:'已发布'},
                        ]},
                    {icon:'home',key:'hotel',name:'酒店管理', subMenu:[
                        {key:'recomd',name:'推荐套餐'}, {key:'ordinary',name:'普通套餐'}]},
                ],
                nowIndex:'user',
                firstBread:'用户管理',
                lastBread:'',
            }
        },
        components:{
            UserAdmin,FreeAdmin,TicketAdmin,PassportAdmin,HotelRecomAdmin,HotelComAdmin
            ,FollowAdmin,StrategyExamAdmin,StrategyPubAdmin
        },
        methods:{
            /*侧边栏选中*/
            choseItem(item){
                this.nowIndex = item.key;
                this.firstBread = item.name;
                this.lastBread = '';
            },
            chooseSubItem(item,sub){
                this.nowIndex = sub.key;
                this.firstBread = item.name;
                this.lastBread = sub.name;
            }

        }
    }

</script>
<style lang="scss">
    #components-layout-demo-fixed-sider{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
    }
    #components-layout-demo-fixed-sider .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
</style>