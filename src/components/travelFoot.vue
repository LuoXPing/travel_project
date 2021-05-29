<template>
    <div class="foot">
        <div class="center">
            <div class="information">
                <div class="logo">
                    <img src="../assets/foot.png" alt="">
                </div>
                <ul class="problem">
                    <li>常见问题</li>
                    <li>如何预定旅游产品？</li>
                    <li>旅游合同如何签订？</li>
                </ul>
                <ul class="about">
                    <li>关于我们</li>
                    <li>联系我们</li>
                    <li>服务协议</li>
                    <li>隐私政策</li>
                    <li>加入我们</li>
                </ul>
                <ul class="pay">
                    <li>关于支付</li>
                    <li>怎么网上支付？</li>
                    <li>付款方式有哪些？</li>
                </ul>
                <ul class="chat">
                    <li>服务热线</li>
                    <li>0595-87560895</li>
                    <li>个人微信 ：02000200001</li>
                    <li>电子邮箱：1249470994@qq.com</li>
                </ul>
            </div>
            <div class="link">
                <span>© 2020.05.05 违法和不良信息举报电话:
                    <span style="color: #4b61c1;">010-87560895 </span>举报邮箱:
                    <span style="color: #4b61c1;">hello@163.com</span></span><br/>
                <span>部分图片源自网络，版权归原作者所有，如有侵权，请告知将立即删除！</span>
                <div class="friend">
                    <span>友情链接：</span>
                    <span>泉州宝中旅行社</span>
                    <span>天气预报查询</span>
                    <span>飞机票查询预订</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "travelFoot"
    }
</script>

<style scoped lang="scss">
    .foot{
        background-color: #444;
        padding: 30px 0;
        .center{
            width: 75%;
            margin:0 auto;
            .information{
                padding-bottom: 10px;
                border-bottom: 1px solid #fff;
                color: #fff;
                display: flex;
                .problem,.pay,.about{
                    li{
                        color: #ccc;
                        list-style: none;
                        text-align: left;
                        &:hover{
                            color: #4b61c1;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                        &:nth-of-type(-n+1){
                            text-decoration: none;
                            color: #ccc;
                        }
                    }

                }
                .problem,.pay{
                    flex:2;
                }
                .about{
                    flex: 1;
                }
                .logo,.chat{
                    flex: 3;
                    list-style: none;
                    color: #ccc;
                    img{
                        width: 115%;
                    }
                }
            }
            .link{
                padding-top: 10px;
                color: #888;
                text-align: center;
                font-size: 12px;
                .friend{
                    span{
                        padding: 0 5px;
                        cursor: pointer;
                        &:hover{
                            color: #4b61c1;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>