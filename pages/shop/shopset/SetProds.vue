<template>
    <view>
        <view class="prod-list">
        	<view class="class-box" v-for="(item,index) in all_prod" :key="index" >
                <view class="class-title">{{item.class_sub}}</view>
                <view class="supp-box">
                    <view v-for="(supp,sindex) in item.supp" :key="sindex">
                        <view class="supp-title">
                            <view class="supp-title-line"></view>
                            <view class="supp-title-text">{{supp.supp_name}}</view>
                        </view>
                        <view class="prod-box">
                            <view v-for="(prod,pindex) in supp.prod" :key="pindex">
                                <view v-bind:class='[prod.checked ? "prod-item-checked" : "prod-item"]'  @click="changerole(prod.supp_prod_id,index,sindex,pindex)">{{prod.supp_prod_name}}</view>
                            
                            </view>
                        </view>
                        
                    </view>
                    
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                shop_info:"",
 
                all_prod:[],
                issale:[],
                changeAction:""
    		}
    	},
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            uni.setNavigationBarTitle({
            	title: this.shop_info.shopname+"("+this.shop_info.shopnote+")"
            })
            uni.request({//获取可销售产品数据
            		url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php',
            		data: {
            			'action':'get_shop_sale',
            			'shopcode':this.shop_info.shopcode
            		},
            		success: (res) => {
            				console.log(res.data);
            				this.all_prod=res.data
            		}
            })
        },
    	methods: {
            // 选中任一checkbox时，由checkbox-group触发
            changerole(supp_prod_id,index,sindex,pindex){

            	if (this.all_prod[index]["supp"][sindex]["prod"][pindex]["checked"]){
                    this.changeAction="isdel";
            		this.all_prod[index]["supp"][sindex]["prod"][pindex]["checked"]=false;
            	}else{
                    this.changeAction="isadd";
            		this.all_prod[index]["supp"][sindex]["prod"][pindex]["checked"]=true;
            	}

            	var i=0;
            	this.issale=[];
            	for(let a of this.all_prod) {
                    for(let b of a.supp) {
                        for(let c of b.prod) {
                            if (c.checked){
                                //console.log(v.supp_prod_id);
                                this.issale[i]=c.supp_prod_id
                                i++
                            }
                        }
                    }
            	};
            	// console.log(this.issale);
            	uni.request({//保存店铺可销售产品列表
            		url: "http://www.jfseed.com.cn/appapi/jfseed_admin/shop/shop_api.php",
            		data: {
            			'action':'modify_shop_issale',
            			'shopcode':this.shop_info.shopcode,
            			'issale':this.issale,
                        'changeAction':this.changeAction,
                        'supp_prod_id':supp_prod_id
            		},
            		success: (res) => {
            			console.log(res.data)
            		},
            		fail: (err) => {
            			console.log('request fail', err);
            		},
            		complete:()=> {
            			//this.loading = false
            		}
            	})
            }
        }
    }
</script>

<style>

    .class-box{
        display: flex;
        flex-direction: column;
        width: 750upx;
    }
    .class-title{
        width: 750upx;
        height: 80upx;
        background-color: #19be6b;
        color: #FFFFFF;
        font-size: 18px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .supp-box{
        display: flex;
        flex-direction: column;
        width: 750upx;
    }
    .supp-title{
        width: 750upx;
        height: 80upx;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items:center;
        justify-content:  flex-start;
    }
    .supp-title-line{
        width: 10upx;
        height: 30upx;
        background-color: #007AFF;
        margin-left: 30upx;
        
    }
    .supp-title-text{
        font-size: 16px;
        margin-left: 15upx;
        
    }
    .prod-box{
        margin-left: 40upx;
        display: flex ;
        flex-direction: row;
        flex:1;
        flex-wrap:wrap;
        width: 710upx;
        align-items: center;
        justify-content: flex-start;
        margin-top: 0upx;
        margin-bottom: 30upx;
        background-color: #FFFFFF;
        
        border-radius: 3px;
        font-size: 30upx;
    }
    .prod-item{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        
    	box-sizing: border-box;
    	border: 1upx solid #E40045;
        border-radius: 8px;
        
    	margin-right: 6upx;
    	margin-left: 6upx;
    	margin-top: 15upx;
        
    	padding-top: 8upx;
    	padding-bottom: 8upx;
    	padding-left: 10upx;
    	padding-right: 10upx;
    	width:215upx ;
    	overflow: hidden;
    }
    .prod-item-checked{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        
        box-sizing: border-box;
    	border: 1upx solid #E40045;
    	border-radius: 8px;
        
    	margin-right: 6upx;
    	margin-left: 6upx;
    	margin-top: 15upx;
        
    	padding-top: 8upx;
    	padding-bottom: 8upx;
    	padding-left: 10upx;
    	padding-right: 10upx;
    	background: #E40045;
    	color: #ffffff;
        width:215upx;
        overflow: hidden;
    }
</style> 
