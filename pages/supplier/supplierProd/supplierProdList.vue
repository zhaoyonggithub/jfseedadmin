<template>
    <view>
        <u-cell-group>
             <u-cell-item :title="item.supp_prod_name" v-for="(item,indexs) in prodList" :key="indexs" @click="tapsubmenu($event,item)">
                 <u-icon v-if="item.supp_prod_state==false" slot="icon" size="32" name="lock-fill"></u-icon>
                 <u-icon v-if="item.supp_prod_state==true" slot="icon" size="32" name="lock-open"></u-icon>
                 <u-icon v-if="item.isshow==false" slot="icon" size="32" name="eye-off"></u-icon>
                 <u-icon v-if="item.isshow==true" slot="icon" size="32" name="eye"></u-icon>
             </u-cell-item>
        </u-cell-group>
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
             uni.setNavigationBarTitle({
                 title: this.supp_info.supp_name+"产品"
             })
             uni.request({//获取供货商信息
                 url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                 data: {
                     'action':'get_supp_prod',
                     'supp_code':this.supp_info.supp_code
                 },
                 success: (res) => {
                     console.log(res.data);
                     this.prodList=res.data;
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
            if(e.index==0){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./supplierProdAdd?supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))
                })
            }
        },
        methods: {
            tapsubmenu(e,prod){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./supplierProdSubmenu?prod_info="+encodeURIComponent(JSON.stringify(prod))
                })
            }
        }
    }
</script>

<style>
</style>
