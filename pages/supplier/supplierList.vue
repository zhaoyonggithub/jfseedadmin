<template>
    <viwe>
        <u-cell-group>
            <u-cell-item  :title="item.supp_name" v-for="(item,indexs) in suppliers" :key="indexs" @click="tapsupplier($event,item)">
                <u-icon v-if="item.supp_state==false" slot="icon" name="state-close" custom-prefix="jf-icon" size="32" color="#888888" style="margin-right: 20upx;"></u-icon>
                <u-icon v-if="item.supp_state==true" slot="icon" name="state-open" custom-prefix="jf-icon" size="32" color="#888888" style="margin-right: 20upx;"></u-icon>

            </u-cell-item>
       </u-cell-group>
    </viwe>
</template>

<script>
    export default {
    	data() {
    		return {
                suppliers:""
            }
        },
        onLoad() {
            uni.request({//获取供货商列表
                url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_api.php",
                data: {
                    'action':'get_suppliers'
                },
                success: (res) => {
                    console.log(res.data);
                    this.suppliers=res.data;
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
                    url:"./supplierAdd"
                })
            }
        },
        methods: {
            tapsupplier(e,i){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./supplierSubmenu?supp_info="+encodeURIComponent(JSON.stringify(i))
                })
            }
        }
    }
</script>

<style>
    
</style>