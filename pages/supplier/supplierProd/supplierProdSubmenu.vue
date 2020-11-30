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
                    prod_info:"",
                    submenu:[
                        {
                            "menu":"资料",
                            "path":"./ProdInfo/ProdInfo?"
                        },
                        {
                            "menu":"价格设置",
                            "path":"./ProdPrice/ProdPrice?"
                        },
                        {
                            "menu":"设置",
                            "path":"./ProdSetup/ProdSetup?"
                        }
                    ]
                }
            },
            onLoad(e) {
                this.prod_info = JSON.parse(decodeURIComponent(e.prod_info));
                uni.setNavigationBarTitle({
                    title: this.prod_info.supp_prod_name
                })
                
            },
            onReady() {
                
            },
            onNavigationBarButtonTap(e){
    
            },
            methods: {
                tapsubmenu(e,path){
                    uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                        url:path+"prod_info="+encodeURIComponent(JSON.stringify(this.prod_info))
                    })
                }
            }
        }
</script>

<style>
</style>
