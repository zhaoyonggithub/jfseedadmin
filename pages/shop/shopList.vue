<template>
    <view>
        <u-cell-group>
             <u-cell-item  :title="item.shopname" :value="item.shopnote" v-for="(item,index) in shoplist" :key="index" @click="shop_detail($event,item)"></u-cell-item>
        </u-cell-group>

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
            	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
            	data: {
            		'action':'get_shop'
            	},
            	success: (res) => {
            		console.log(res.data)
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
        onNavigationBarButtonTap(e){
            if(e.index==0){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./shopAdd"
                })
            }
        },
    	methods: {
            shop_detail(e,shopinfo){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                        url:"./shopsubmenu?shop_info="+encodeURIComponent(JSON.stringify(shopinfo))
                })
            }
        },
    }
</script>

<style>
    .bbt {
        width: 100%;
        position:fixed;
        bottom:0;
    }
</style>
