<template>
    <view>
        <u-checkbox-group class="chkboxflex">
            <u-checkbox @change="checkboxChange($event,item.staff_id,item.staff_tel)" :iconSize="chkboxsize" :labelSize="chkboxsize" v-model="item.checked" :disabled="item.disabled" v-for="(item, index) in stafflist" :key="index" :name="item.name">{{item.name}}</u-checkbox>
        </u-checkbox-group>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                shop_info:"",
                
                chkboxsize:36,
                stafflist: []
    		}
    	},
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            uni.setNavigationBarTitle({
            	title: this.shop_info.shopname+"("+this.shop_info.shopnote+")"
            })


            uni.request({//获取门店员工
            	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
            	data: {
            		'action':'get_stafflist',
                    'shopcode':this.shop_info.shopcode
            	},
            	success: (res) => {
            		console.log(res.data)
            		this.stafflist=res.data;
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
            // 选中某个复选框时，由checkbox时触发
            checkboxChange(e,f,tel) {

                let isselected=e.value?"true" : "false";
                console.log(isselected)
                uni.request({//获取用户可登录状态
                	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
                	data: {
                		'action':'modify_shop_staffs',
                		'shopcode':this.shop_info.shopcode,
                		'shopname':this.shop_info.shopname,
                        'shopnote':this.shop_info.shopnote,
                		'staff_id':f,
                        'staff_name':e.name,
                        'staff_tel':tel,
                        'staff_isselected':isselected
                        
                	},
                	success: (res) => {
                		console.log(res.data)
                	},
                	fail: (err) => {
                		console.log('request fail', err);
                	},
                	complete:()=> {
                		//this.loading = false
                	}
                })
            }
        }
    }
</script>

<style>
    .chkboxflex{
        display: flex ;
        flex-direction: row;
        flex:1;
        flex-wrap:wrap;
        width: 720upx;
        align-items: center;
        justify-content:flex-start;
        margin-top: 20upx;
        margin-left: 15upx;
        background-color: #FFFFFF;
        padding: 25upx;
        border-radius: 3px;

    }

</style> 
