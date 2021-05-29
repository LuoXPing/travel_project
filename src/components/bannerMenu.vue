<template>
    <div class="bannerMenu">
        <ul>
            <li @click="gotothat('/free',0)">
                <span :class="{active:nowActive==0}">自由行</span>
            </li>
            <li @click="gotothat('/follow',2)">
                <span :class="{active:nowActive==1}">跟团游</span>
            </li>
            <li  @click="gotothat('/passport',3)">
                <span :class="{active:nowActive==2}">签证</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "bannerMenu",
        props:['nowActive'],
        methods:{
            gotothat(path,index){
                this.$router.push({
                    path: path,
                    query:{
                        id:index
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .bannerMenu{
        width: 100%;
        height: 40px;
        background-color: #fff;
        position: relative;
        ul{
            position: absolute;
            left: 500px;
            top: 8px;
            list-style: none;
            width: 35%;
            display: flex;
            li{
                flex: 1;
                color: #666;
                height: 20px;
                text-align: center;
                border-left: 1px solid #ddd;
                cursor: pointer;
                &:first-of-type{
                    border: none;
                }
                &:hover{
                    color: #4b61c1;
                }
            }
            .active{
                color: #4b61c1;
                height: 27px;
                display: inline-block;
                border-bottom: 2px solid #4b61c1;
            }
        }
    }
</style>