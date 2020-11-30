<template>
    <view >
        <view v-for="(item,index) in shoplist" :key="index" class="page">
            <uni-section  :title="item.shopname+'('+item.shopnote+')'" type="line"></uni-section>

            <view class="submenu">
                <view class="menutext" @click="to_syt(item.shopcode,item.shopname+'('+item.shopnote+')')"><text>试验田</text></view>
                <view class="menutext" @click="to_sft(item.shopcode,item.shopname+'('+item.shopnote+')')"><text>布点示范</text></view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
    			shoplist:""
    		}
    	},
        onLoad() {
            uni.request({//获取门店列表
            	url: "http://www.jfseed.com.cn/appapi/app_admin/app_admin_shop_api.php",
            	data: {
            		'action':'get_shop'
            	},
            	success: (res) => {
            		//console.log(res.data)
            		this.shoplist=res.data;
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
            to_syt(code,name){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    animationType: 'slide-in-bottom',
                    url:"./syt_admin?shop_name="+name+"&shop_code="+code
                })
            },
            to_sft(code,name){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                        url:"./sft_admin?shop_name="+name+"&shop_code="+code
                })
            }
        },
    }
</script>

<style>
    .page{

        width: 750upx;

    }
    .submenu{
        margin-top: 20upx;
        display: flex;
        width: 750upx;
        flex-direction: row;
        align-items: center;
        justify-content:space-around;
    }
    .menutext{
        height: 100upx;
        width: 300upx;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        font-size: 38upx;
        font-weight: 900;
        background-color: #0099CC;
        color: #EFEFF4;
    }
</style>
