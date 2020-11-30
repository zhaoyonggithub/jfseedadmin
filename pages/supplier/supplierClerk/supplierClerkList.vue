<template>
    <view>
        <u-cell-group>
             <u-cell-item :title="item.clerk_name" v-for="(item,indexs) in clerklist" :key="indexs" @click="tapsubmenu($event,item)"></u-cell-item>
        </u-cell-group>
         <u-divider v-if="nodata">未找到数据</u-divider>
         
    </view>
</template>

<script>
    
    export default {
    	data() {
    		return {
                supp_info:"",
                clerklist:"",
                nodata:false
            }
        },
        onLoad(e) {
            this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
            //console.log(this.supp_info.supp_code)
            uni.setNavigationBarTitle({
                title: this.supp_info.supp_name+"-员工列表"
            })
        },
        onShow() {
            uni.request({//获取供货商信息
                url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/supplier_clerk_api.php",
                data: {
                    'action':'get_clerk_list',
                    'supp_code':this.supp_info.supp_code
                },
                success: (res) => {
                    //console.log(res.data);
                    if (res.data.length==0){
                        this.nodata=true;
                    }else{
                        this.clerklist=res.data;
                    }
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
                uni.navigateTo({  //跳转
                    url:"./supplierClerkADD?supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))
                })
            }
        },
        methods: {
            tapsubmenu(e,clerk){
               // console.log(clerk)
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./supplierClerkSetup?supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))+"&clerk_info="+encodeURIComponent(JSON.stringify(clerk))
                })
            }
            
        }
    }
</script>

<style>
</style>
