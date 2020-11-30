<template>
    <view>
        <u-form  ref="uForm">
            <u-form-item label="启用"  label-width="150" label-align="center" style="padding-right: 20upx;">
                <u-switch v-model="prodbaseinfo.prod_state" slot="right" @change="modiyprod_state"></u-switch>
            </u-form-item>
            <u-form-item label="首页可见"  label-width="150" label-align="center" style="padding-right: 20upx;">
                <u-switch v-model="prodbaseinfo.isshow" slot="right" @change="modiyisshow"></u-switch>
            </u-form-item>
        </u-form>
    </view>
</template>

<script>
    export default {
        	data() {
        		return {
                    prod_info:"",
                    prodbaseinfo:""
                }
            },
            onLoad(e) {
                this.prod_info = JSON.parse(decodeURIComponent(e.prod_info));
                uni.setNavigationBarTitle({
                    title: this.prod_info.supp_prod_name+"选项"
                })
                uni.request({//获取产品信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                    data: {
                        'action':'get_supp_prod_info',
                        'supp_prod_id':this.prod_info.supp_prod_id
                    },
                    success: (res) => {
                        console.log(res.data);
                        this.prodbaseinfo=res.data;
                    }
                })

            },
            onReady() {
                
            },
            methods: {
                modiyprod_state(e){
                    let state=e? 1:0;
                    //console.log(state);
                    uni.request({//获取供货商信息
                        url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                        data: {
                            'action':'modiy_supp_prod_state',
                            'supp_prod_id':this.prod_info.supp_prod_id,
                            'supp_prod_state':state
                        },
                        success: (res) => {
                            console.log(res.data);
                        }
                    })
                },
                modiyisshow(e){
                    
                    uni.request({//获取供货商信息
                        url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                        data: {
                            'action':'modiy_supp_prod_isshow',
                            'supp_prod_id':this.prod_info.supp_prod_id,
                            'supp_prod_isshow':e
                        },
                        success: (res) => {
                            console.log(res.data);
                        }
                    })
                }
            }
        }
</script>

<style>
</style>
