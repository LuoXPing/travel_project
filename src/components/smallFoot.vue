<template>
    <div class="foot">
        <div class="center">
            <div class="information">
                <div class="logo">
                    <img src="../assets/foot.png" alt="">
                </div>
                <div class="link">
                     <span>© 2020.05.05 京ICP备000号 京公网安备00000号 京ICP证000号  违法和不良信息举报电话:
                         <span style="color: #4b61c1;">010-87560895 </span>举报邮箱:
                         <span style="color: #4b61c1;">hello@163.com</span></span>
                     <span>部分图片源自网络，版权归原作者所有，如有侵权，请告知将立即删除！</span>
                    <div class="pic">
                        <img src="../assets/smallfoot1.png" alt="">
                        <img src="../assets/smallfoot2.png" alt="">
                        <img src="../assets/smallfoot3.png" alt="">
                    </div>

                </div>
             </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "smallFoot"
    }
</script>

<style scoped lang="scss">
    .foot{
        background-color: #444;
        padding: 20px 0 0 0;
        .center{
            width: 70%;
            margin:0 auto;
            .information {
                display: flex;
                .logo{
                    flex: 1.5;
                    img{
                        width: 100%;
                    }
                }
                .link {
                    color: #888;
                    flex: 6;
                    padding: 20px 30px;
                    font-size: 12px;
                }
                .pic{
                    padding-left: 50px;
                    img{
                        width: 100px;
                        margin: 10px;
                    }
                }
            }
        }
    }
</style>