<template>
    <view>
        <u-cell-group>
            
            <u-field v-model="clerk_info.clerk_name" :border-bottom="true" :border-top="true" label="姓名" type="text"></u-field>
            <u-field v-model="clerk_info.clerk_mobile" label="手机号" type="number"></u-field>
            <u-field v-model="clerk_info.clerk_post" label="职位" :disabled="true" @click="showpost" @right-icon-click="showpost" right-icon="arrow-down-fill"></u-field>
            <u-field  :border-bottom="true" :border-top="true" label="允许登录">
                <u-switch v-model="clerk_info.clerk_state" slot="right" @change="modiystate"></u-switch>
            </u-field>
            
        </u-cell-group>
        <u-button type="primary"  :ripple="true" @click="saveclerk()">保存修改</u-button>
        <u-action-sheet @click="setpost" :list="clerk_postList" v-model="clerk_postshow"></u-action-sheet>
        
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                supp_info:"",
                clerk_info:"",
                clerk_postList: [
                    {
                        text: '业务经理',
                    },
                    {
                        text: '大区经理'
                    },
                    {
                        text: '销售总监'
                    },
                    {
                        text: '总经理'
                    }
                ],
                clerk_postshow: false

            }
        },
        onLoad(e) {
            
            this.supp_info = JSON.parse(decodeURIComponent(e.supp_info));
            this.clerk_info = JSON.parse(decodeURIComponent(e.clerk_info));
            //console.log(e.clerk_info)
            uni.setNavigationBarTitle({
                title: this.supp_info.supp_name+"-"+this.clerk_info.clerk_name
            })
            
        },
        
        onReady() {
            
        },

        methods: {
            //职务选择
            showpost() {
            	this.clerk_postshow = true;
            },
            setpost(index) {
                this.clerk_info.clerk_post = this.clerk_postList[index].text;
            },
            //修改允许登录状态
            modiystate(e){
                this.clerk_info.clerk_state=e;
            },
            //保存厂家联系人
            saveclerk(){
                if(this.clerk_mobile=="" || this.clerk_name==""){
                    uni.showToast({
                        title:"内容不完整",
                        icon:"none"
                    })
                }else{
                    let that=this;
                    uni.request({
                        url:"http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/supplier_clerk_api.php",
                        data: {
                            'action':'save_modiy_clerk',
                            'supp_code':this.supp_info.supp_code,
                            'clerk_name':this.clerk_info.clerk_name,
                            'clerk_mobile':this.clerk_info.clerk_mobile,
                            'clerk_post':this.clerk_info.clerk_post,
                            'clerk_id':this.clerk_info.clerk_id,
                            'clerk_state':this.clerk_info.clerk_state
                        },
                        success(res) {
                            console.log(res.data)
                            if (res.data=="success"){
                                
                                uni.navigateBack({
                                    delta: 1
                                })
                            }else if(res.data=="fail"){
                                uni.showToast({
                                    title:"该员工已经存在",
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
