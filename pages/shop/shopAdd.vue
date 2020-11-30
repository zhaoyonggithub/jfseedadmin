<template>
    <view>
        <u-cell-group>
            <u-field label="店铺名称" v-model="shopname"  required></u-field>
            <u-field label="区域" v-model="shopnote"  required @click="openarealist" :disabled="onlyread" right-icon="arrow-down-fill"></u-field>
        </u-cell-group>
        <u-button type="success" :disabled="isdisabled" :ripple="true" ripple-bg-color="#909399" @click="saveshop">保存</u-button>
        <u-select v-model="showarea" mode="single-column" :list="area" @confirm="choosearea"></u-select>
    </view>
</template>

<script>

    import provinces from "@/components/uview-ui/libs/util/province.js"
    export default {
    	data() {
    		return {
                onlyread:true,
                isdisabled:false,
                showarea: false,
              
                shopname:"",
                shopnote:"",
                area:provinces
                
    		}
    	},
        onReady() {
            
        },
        onLoad() {
            uni.setNavigationBarTitle({
            	title: "添加店铺"
            })
        },
    	methods: {
            openarealist(){
                this.showarea=true;
            },
            choosearea(e){
                console.log(e)
                this.shopnote=e[0].label;
            },
            saveshop(){
                if (this.shopname!="" && this.shopnote!=""){
                    uni.request({//保存新店铺
                    	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
                    	data: {
                    		'action':'save_shop',
                            'shopname':this.shopname,
                            'shopnote':this.shopnote,
                            'shopcode':this.$u.guid(16,false,62)
                    	},
                    	success: (res) => {
                    		if(res.data=="success"){
                                this.isdisabled=true;
                                uni.navigateBack({
                                    delta: 1
                                })
                            }
                    	},
                    	fail: (err) => {
                    		console.log('错误信息', err);
                    	},
                    	complete:()=> {
                    		//this.loading = false
                    	}
                    })
                }else{
                    uni.showToast({
                        title:"信息不完整",
                        icon:"none"
                    })
                }
                
            }
        }
    } 
</script>

<style>
</style>
