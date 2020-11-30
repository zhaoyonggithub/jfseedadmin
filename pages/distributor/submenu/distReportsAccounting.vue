<template>
    <view>
        <u-top-tips ref="uTips" z-index="10175"></u-top-tips>
        <u-cell-group>
            <u-cell-item v-for="(item,index) in disttransferlist" :key="index" :value-style="item.CountType?isadd:isreduce"  :title="item.transfertype" :label="item.currdate" :value="item.transfervalue"  :center="true" :arrow="false" @click="opennote(item.transfernote)">
                <u-icon v-if="item.transfernote!=''" slot="right-icon" name="info-circle" color="#ffffc7" size="54"></u-icon>
                <u-icon v-else slot="right-icon" name="info-circle" color="#ffffff" size="54"></u-icon>
            </u-cell-item>
        </u-cell-group>
        <u-toast ref="uToast" />
        <u-back-top :scroll-top="scrollTop" top="600"></u-back-top>
        <u-popup v-model="addnewshow"  mode="top"  border-radius="14"  :height="'600'">
            <u-gap height="20" bg-color="transparent"></u-gap>
            <u-divider half-width="0">新增账务</u-divider>
            <u-gap height="20" bg-color="transparent"></u-gap>
            <u-subsection :list="list" :current="0"  @change="sectionChange"></u-subsection>
            <u-cell-group>
                <u-field :disabled="true" input-align="center" border-bottom border-top  v-model="transfertype" :label="transfertypelabel" right-icon="arrow-down-fill" @click="transfertypeshow = true" ></u-field>
                <u-field v-model="transfervalue" input-align="center" label="金额"></u-field>
                <u-field v-model="transfernote" type="textarea" label="备注:"></u-field>
            </u-cell-group>
            <u-gap height="30" bg-color="transparent"></u-gap>
            <view class="savestyle"><u-button size="medium"  type="success" @click="addtransfer">保存</u-button></view>
        </u-popup>
        <u-action-sheet :list="actionSheetList" v-model="transfertypeshow" @click="selecttype"></u-action-sheet>
        <u-modal v-model="shownote" :content="notecontent"></u-modal>
    </view>
</template>
    
<script>
    export default {
    	data() {
    		return {
                // module:"账务报表",
                list: [
                    {name: '转入'}, 
                    {name: '转出'}
                    ],
                current: 1,
                shop_info:"",
                dist_info:"",
                addnewshow:false,
                transfertypeshow:false,
                transfertypelabel:"转入方式",
                CountType:"add",
                transfertype:"现金",
                actionSheetList: [
                    {text: '现金'},
                    {text: '微信'},
                    {text: '支付宝'}
                ],

                transfervalue:"",
                transfernote:"",
                scrollTop: 0,
                disttransferlist:[],
                isadd:{
                    'margin-right': '20upx',
                    "font-size":"40upx",
                    "color":"#008d00"
                },
                isreduce:{
                    'margin-right': '20upx',
                    "font-size":"40upx",
                    "color":"#ff6905"
                },
                shownote:false,
                notecontent:"无备注"
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name+"往来账"
            });
            this.get_dist_transfer();
        },
        onPageScroll(e) {
            this.scrollTop = e.scrollTop;
        },
        onNavigationBarButtonTap(e){
            if(e.index==0){
                this.addnewshow=!this.addnewshow
            }
            
        },
        methods:{
            sectionChange(index) {
                this.transfertypelabel=(index==0)?"转入方式":"转出方式"
                this.CountType=(index==0)?"add":"reduce"
            },
            selecttype(i){
                this.transfertype= this.actionSheetList[i].text;
            },
            opennote(e){
                this.notecontent=e!=""?e:"无备注";
                this.shownote=true
            },
            get_dist_transfer(){
                
                uni.request({
                    url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                    data: {
                        'action':"get_dist_transfer",
                        'distcode':this.dist_info.usercode
                    },
                    success: (res) => {
                        this.disttransferlist = res.data;
                        console.log(res.data)
                    }
                })
            },
            addtransfer(){
                //加入为空判断，关闭弹窗失效
                if(this.transfervalue==""){
                    this.$refs.uTips.show({
                        title: '金额为空',
                        type: 'error',
                        duration: '2300'
                    })
                    return
                }else{
                    uni.request({
                        url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                        data: {
                            'action':"addnewtransfer",
                            'distcode':this.dist_info.usercode,
                            'transfertype':this.transfertype,
                            'transfervalue':this.transfervalue,
                            'transfernote':this.transfernote,
                            'CountType':this.CountType,
                            'curryear':this.$u.timeFormat(new Date().getTime(), 'yyyy'),
                            'currdate':this.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd')
                        },
                        success: (res) => {
                            this.addnewshow = false;
                            this.get_dist_transfer();
                            this.$refs.uToast.show({
                                 title: '已保存',
                                 type: 'success',
                                 position:'bottom'
                             })
                        }
                    })
                }
                
            }
        }
        
        
    }
</script>

<style scoped>
    .savestyle{
        width: 750upx;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
</style>