<template>
    <view>
        
    </view>
</template>
    
<script>
    export default {
    	data() {
    		return {
                // module:"使用记录",
                shop_info:"",
                dist_info:""
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name
            });
        },
        methods:{
            
        }
        
        
    }
</script>

<style>
    
</style>