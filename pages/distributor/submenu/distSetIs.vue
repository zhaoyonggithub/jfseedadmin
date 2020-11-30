<template>
    <view>
        <u-form  ref="uForm">
            <u-form-item label="合作"  label-width="150" label-align="center" style="padding-right: 20upx;">
                <u-switch v-model="allow_cooperation" slot="right" @change="modiy_dist_cooperation"></u-switch>
            </u-form-item>
            <u-form-item label="登录"  label-width="150" label-align="center" style="padding-right: 20upx;">
                <u-switch v-model="allow_login" slot="right" @change="modiy_dist_login"></u-switch>
            </u-form-item>
        </u-form>
    </view>
</template>
    
<script>
    export default {
    	data() {
    		return {
                // module:"设置开启项",
                shop_info:"",
                dist_info:"",
                allow_cooperation:"",
                allow_login:""
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
            uni.request({//获取可销售产品数据
            		url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
            		data: {
            			'action':'get_dist_state',
            			'shopcode':this.shop_info.shopcode,
                        'distcode':this.dist_info.usercode
            		},
            		success: (res) => {
                        //console.log(res.data)
                        this.allow_cooperation=res.data.allow_cooperation;
                        this.allow_login=res.data.allow_login;

                        
            		}
            })
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name
            });
        },
        methods:{
            modiy_dist_login(e){
                let state=e? 1:0;
                //console.log(state);
                uni.request({//获取供货商信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php",
                    data: {
                        'action':'modiy_allow_login',
                        'usercode':this.dist_info.usercode,
                        'allow_login':state
                    },
                    success: (res) => {
                        console.log(res.data);
                    }
                })
            },
            modiy_dist_cooperation(e){
                console.log(e)
                let state=e? 1:0;
                console.log(state)
                uni.request({//获取供货商信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php",
                    data: {
                        'action':'modiy_allow_cooperation',
                        'usercode':this.dist_info.usercode,
                        'allow_cooperation':state
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