<template>
    <view>
        <jf-card v-for="(item,index) in license_list" :key="index"  :title="item.shoplicense_name" :note="item.shoplicense_endtime" :sthumbnail="item.shoplicense_pic" :thumbnail="item.shoplicense_pic30"></jf-card>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                shop_info:"",
    			license_list:"",
                licenseUrl:""
    		}
    	},
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            uni.setNavigationBarTitle({
            	title: this.shop_info.shopname+"("+this.shop_info.shopnote+")-证照"
            })
            uni.request({//获取门店许可证列表
            	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
            	data: {
            		'action':'get_shoplicense',
                    'shopcode':this.shop_info.shopcode
            	},
            	success: (res) => {
            		console.log(res.data)
            		this.license_list=res.data;
            	},
            	fail: (err) => {
            		console.log('request fail', err);
            	},
            	complete:()=> {
            		//this.loading = false
            	}
            })

        },
    	methods: {


        }
    }
</script>

<style>

</style> 
