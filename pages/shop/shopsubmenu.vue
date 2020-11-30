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
                    shop_info:"",
                    submenu:[
                        {
                            "menu":"员工",
                            "path":"./shopset/SetStaff?"
                        },
                        {
                            "menu":"可销售产品",
                            "path":"./shopset/SetProds?"
                        },
                        {
                            "menu":"证件",
                            "path":"./shopset/SetLicense?"
                        }
                    ]
                }
            },
            onLoad(e) {
                this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
                console.log(this.shop_info)
                uni.setNavigationBarTitle({
                    title: this.shop_info.shopname+this.shop_info.shopnote
                })
                
            },
            onReady() {
                
            },
            onNavigationBarButtonTap(e){
    
            },
            methods: {
                tapsubmenu(e,path){
                    uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                        url:path+"shop_info="+encodeURIComponent(JSON.stringify(this.shop_info))
                    })
                }
            }
        }
</script>

<style>
</style>
