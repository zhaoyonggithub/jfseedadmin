<template>
    <view >
        <view class="bankcardlistcss">
           
            <view v-for="(item,index) in bankcardlist" :key="index">

                <bank-item :bankCode="item.bank_code" :bankName="item.bank_name" :deposit="item.bank_deposit"  :holder="item.bank_holder" :cardCode="item.bank_cardcode"/>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
    	data() {
            return {
                supp_info:"",
                bankcardlist:[]
            }
        },
        onLoad(e) {
             this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
             //console.log(this.supp_info)
             uni.setNavigationBarTitle({
             	title: this.supp_info.supp_name
             })
        },
        onShow() {
            uni.request({
                url:"http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/supplier_bankaccount_api.php",
                data: {
                    'action':'get_BankAccount',
                    'supp_code':this.supp_info.supp_code
                },
                success: (res) => {
                    if (res.data.length>0){
                    this.bankcardlist=res.data
                    }
                }
            })
        },
        onNavigationBarButtonTap(e){
            if(e.index==0){
                uni.navigateTo({  //跳转
                    url:"./supplierBankAccountAdd?supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))
                })
            }
        },
        methods: {
            tapsubmenu(e,path){
                
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:path+"supp_info="+encodeURIComponent(JSON.stringify(this.supp_info))
                })
            },
            look(){
                console.log(this.bankcardlist)
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 750upx;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .bankcardlistcss{
        width: 700upx;
        padding: 20rpx;
        display: flex;
        flex-direction: column;

    }
</style>
