<template>
    <view>
        <u-top-tips ref="uTips"></u-top-tips>
        <u-cell-group>
            <u-field label="位置" v-model="address" required @click="openaddresslist" :disabled="onlyread" right-icon="arrow-down-fill"></u-field>
            <u-field label="姓名" v-model="distname" required  type="text" @blur="getInitials">
                <text slot="right">{{dist_indexletter}}</text>
            </u-field>
            <u-field label="电话" v-model="disttel" required type="number" ></u-field>
            <u-field label="备注" v-model="distnote" type="textarea" :auto-height="true" ></u-field>
        </u-cell-group>
        <u-button type="success" @click="savenewdist()">保存</u-button>
        <u-picker @confirm="chooseaddress" :disabled="btndisabled" :loading="btnloading" mode="region" v-model="addressshow" ></u-picker>
    </view>
</template>

<script>
    import ZhToPinYin from '@/components/thorui/node_modules/thorui-uni/lib/common/tui-zh-pinyin/tui-zh-pinyin.js';
    export default {
    	data() {
    		return {
                zhToPinYin: null, //取姓氏首字的首字母
                onlyread:true,
                btndisabled:false,//提效按钮默认可用
                btnloading:false, //默认关闭按钮加载效果
                shop_info:"",
                address:"",
                addressshow:false,
                distname:"",
                dist_indexletter:"",
                disttel:"",
                distnote:""
            }
        },
        onLoad(e) {
            this.shop_info=JSON.parse(decodeURIComponent(e.shop_info))
        },
        onReady() {
            
        },
        methods: {
            openaddresslist() {
            	this.addressshow = true;
            },
            // 选择地址
            chooseaddress(e) {
                this.address=e.province.label+"-"+e.city.label+"-"+e.area.label;
            },
            getInitials(){
                this.zhToPinYin = new ZhToPinYin(true);
                if (this.distname!=""){
                    let userSurname=this.distname.substr(0,1);

                    let Surnameletter = this.zhToPinYin.surnamePolyphone(userSurname);

                    if (Surnameletter){
                        this.dist_indexletter=Surnameletter.substr(0,1)
                    }else{
                        this.dist_indexletter=this.zhToPinYin.getInitials(userSurname,false);
                    }
                    
                    
                    console.log(this.dist_indexletter);
                }
                
            },
            savenewdist(){

                if (this.$u.test.isEmpty(this.address)){
                    this.$refs.uTips.show({title: '地址未选择',type: 'error',duration: '1500'})
                }else if(this.$u.test.isEmpty(this.distname)){
                    this.$refs.uTips.show({title: '名字未输入',type: 'error',duration: '1500'})
                }else if(!(this.$u.test.mobile(this.disttel))){
                    this.$refs.uTips.show({title: '手机号不正确',type: 'error',duration: '1500'})
                }else{
                    this.btndisabled=true;
                    this.btnloading=true; 
                    let distaddress=this.address.split("-")
                    uni.request({
                        url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                        data: {
                            'action':'save_newdist',
                            'shopcode':this.shop_info.shopcode,
                            'shopanme':this.shop_info.shopanme,
                            'shopnote':this.shop_info.shopnote,
                            'usercode':this.$u.guid(16,false,62),
                            'username':this.distname,
                            'usertel':this.disttel,
                            'user_xian':distaddress[0],
                            'user_xiang':distaddress[1],
                            'user_cun':distaddress[2],
                            'dist_indexletter':this.dist_indexletter,
                            'distnote':this.distnote
                        },
                        success: (res) => {
                            console.log(res.data)
                            if (res.data=="success"){
                                this.$refs.uTips.show({title: '添加成功',type: 'success',duration: '1500'})
                                this.btndisabled=false;
                                this.btnloading=false; 
                                this.clearform();
                            }else{
                                this.$refs.uTips.show({title: '分销商已存在',type: 'error',duration: '1500'})
                            }
                        }
                    })
                }
            },
            clearform(){
                this.distname="";
                this.disttel="";
                this.address="";
                this.dist_indexletter="";
            }

        }
    }
</script>

<style>
    
</style>