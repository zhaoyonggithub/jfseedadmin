<template>
    <view>
        <u-gap height="1" bg-color="#bbb"></u-gap>
        <u-form  ref="uForm">
            <u-form-item label="合作"  label-width="150" label-align="center" style="padding-right: 20upx;">
                <u-switch v-model="supp_info.supp_state" slot="right" @change="modiystate"></u-switch>
            </u-form-item>
        </u-form>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                supp_info:"",
                prodList:""

            }
        },
        onLoad(e) {
            this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
            console.log(this.supp_info)
        },
        methods:{
            modiystate(e){
                uni.request({//获取供货商信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_api.php",
                    data: {
                        'action':'modiy_supp_state',
                        'supp_code':this.supp_info.supp_code,
                        'state':e
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
