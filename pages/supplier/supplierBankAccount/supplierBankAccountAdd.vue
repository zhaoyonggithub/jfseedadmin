<template>
    <view>
        <u-cell-group>
            <u-field v-model="bank_name"  label="银行名称" label-width="180"></u-field>
            <u-field v-model="bank_deposit"  label="开户行名称" label-width="180"></u-field>
            <u-field v-model="bank_code"  label="开户行缩写" label-width="180"></u-field>
            <u-field v-model="bank_cardcode" label="卡号" label-width="180" @blur="checkcard(bank_cardcode)">
                <u-icon slot="right" name="yinhangkashibie" custom-prefix="jf-icon" size="60" color="#888888"  @click="getIDCard()"></u-icon>
            </u-field>
            <u-field v-model="bank_cardtype" label="卡类型" label-width="180"></u-field>
            <u-field v-model="bank_holder" label="持卡人名称" label-width="180"></u-field>
            
        </u-cell-group>
         <button type="primary" @click="saveBankAccount()">保存</button>
    </view>
</template>

<script>
    const card = uni.requireNativePlugin('DC-CardRecognize');
    export default {
    	data() {
            return {
                supp_info:"",
                bank_code:"",
                bank_name:"",
                bank_deposit:"",
                bank_cardcode:"",
                bank_cardtype:"",
                bank_holder:""
            }
        },
        watch:{
            bank_cardcode:{
                handler(newName, oldName) {
                    
                        this.checkcard(newName);  // ...
                    
                }
            },
        },
        onLoad(e) {
            
             this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
             console.log(this.supp_info)
             uni.setNavigationBarTitle({
                title: this.supp_info.supp_name+"-新增卡号"
             })
        },
        methods:{
            getIDCard() {
                let that=this;
                card.startRecognize({
                    maskType:"BankCard"
                    },result => {
                    console.log(result.result);
                    if(result.result=="success"){
                        let bank_card_number=that.$u.trim(result.bank_card_number, 'all');
                        that.bank_cardcode=bank_card_number;
                        that.bank_name=result.bank_name;
                    }
                });
            },
            checkcard(e){
                uni.request({
                		url: 'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo='+e+'&cardBinCheck=true',
                		success: (res) => {
                            console.log(res.data)
                            if (res.data.validated==true){
                                this.bank_code=res.data.bank;
                                let rescardtype
                                if(res.data.cardType=="DC"){ //#DC(借记卡),  CC(贷记卡),  SCC(准贷记卡), DCC(存贷合一卡), PC(预付卡)
                                    rescardtype="借记卡";
                                }else{
                                    rescardtype="信用卡";
                                }
                                this.bank_cardtype=rescardtype;
                            }
                		}
                })
            },
            saveBankAccount(){
                if(this.bank_code=="" || this.bank_name=="" || this.bank_cardcode=="" || this.bank_cardtype==""){
                    uni.showToast({
                        title:"信息不完整",
                        icon:"none"
                    })
                    
                }else{
                    uni.request({
                        url:"http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/supplier_bankaccount_api.php",
                        data: {
                            'action':'save_BankAccount',
                            'supp_code':this.supp_info.supp_code,
                            'bank_code':this.bank_code,
                            'bank_name':this.bank_name,
                            'bank_deposit':this.bank_deposit,
                            'bank_cardcode':this.bank_cardcode,
                            'bank_cardtype':this.bank_cardtype,
                            'bank_holder':this.bank_holder
                        },
                        success(res) {
                            //console.log(res.data)
                            if (res.data=="success"){
                                
                                uni.navigateBack({
                                    delta: 1
                                })
                            }else if(res.data=="fail"){
                                uni.showToast({
                                    title:"该卡号已经存在",
                                    icon:"none"
                                })
                            }
                        }
                    })
                }
                
            }
        }
    }
</script>

<style>
</style>
