<template>
    <view>
        <u-cell-group>
            <u-field  v-model="suppbaseinfo.supp_address"  label="地址" placeholder="请填写手机号"></u-field>
            <u-field  v-model="suppbaseinfo.supp_site"  label="网站" placeholder="请填写验证码"></u-field>
            <u-field type="textarea" v-model="suppbaseinfo.supp_note" label="备注"></u-field>
        </u-cell-group>
        <u-button type="primary"  :ripple="true" @click="savesubmit">保存修改</u-button>
        
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                supp_info:"",
                suppbaseinfo:""
            }
        },
        onLoad(e) {
            this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
            console.log(this.supp_info)
            uni.setNavigationBarTitle({
                title: this.supp_info.supp_name+"基本信息"
            })
            uni.request({//获取供货商信息
                url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_api.php",
                data: {
                    'action':'get_base_info',
                    'supp_code':this.supp_info.supp_code
                },
                success: (res) => {
                    console.log(res.data);
                    this.suppbaseinfo=res.data;
                },
                fail: (err) => {
                    console.log('request fail', err);
                },
                complete:()=> {
                    //this.loading = false
                }
            })
        },
        onReady() {
            
        },
        onNavigationBarButtonTap(e){

        },
        methods: {
            savesubmit(){
                uni.request({//获取供货商信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_api.php",
                    data: {
                        'action':'modiy_supp_baseinfo',
                        'supp_code':this.supp_info.supp_code,
                        'supp_address':this.suppbaseinfo.supp_address,
                        'supp_site':this.suppbaseinfo.supp_site,
                        'supp_note':this.suppbaseinfo.supp_note
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
