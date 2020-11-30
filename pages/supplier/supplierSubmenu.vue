<template>
    <view>
        <u-cell-group>
             <u-cell-item :title="item.menu" v-for="(item,indexs) in submenu" :key="indexs" @click="tapsubmenu($event,item.path)"></u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                supp_info:"",
                submenu:[
                    {
                        "menu":"基本资料",
                        "path":"./supplierInfo/supplierInfo?"
                    },
                    {
                        "menu":"产品",
                        "path":"./supplierProd/supplierProdList?"
                    },
                    {
                        "menu":"业务员",
                        "path":"./supplierClerk/supplierClerkList?"
                    },
                    {
                        "menu":"开户行",
                        "path":"./supplierBankAccount/supplierBankAccountList?"
                    },
                    {
                        "menu":"设置",
                        "path":"./supplierSetup/supplierSetup?"
                    }
                ]
            }
        },
        onLoad(e) {
               this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
            uni.setNavigationBarTitle({
                title: this.supp_info.supp_name
            })
        },
        onReady() {
            
        },
        onNavigationBarButtonTap(e){

        },
        methods: {
            tapsubmenu(e,path){
                
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:path+"supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))
                })
            }
        }
    }
</script>

<style>
</style>
