<template>
    <view>
        <u-cell-group>
            
            <u-field v-model="clerk_name" :border-bottom="true" :border-top="true" label="姓名" >
                    <u-button type="primary" slot="right" size="mini" :ripple="true" @click="visitContacts()">手机通讯录</u-button>
            </u-field>
            <u-field v-model="clerk_mobile" label="手机号"  type="number"></u-field>
            <u-field v-model="clerk_post" label="职位" :disabled="true" @click="showpost" @right-icon-click="showpost" right-icon="arrow-down-fill"></u-field>
        </u-cell-group>
        <u-button type="primary"  :ripple="true" @click="saveclerk()">保存联系人</u-button>
        <u-action-sheet @click="setpost" :list="clerk_postList" v-model="clerk_postshow"></u-action-sheet>
        
    </view>
</template>

<script>
    import nativeCommon from '@/utils/native.common';
    export default {
    	data() {
    		return {
                supp_info:"",
                clerk_name:"",
                clerk_mobile:"",
                clerk_post:"",
                
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
            console.log(this.supp_info.supp_code)
            uni.setNavigationBarTitle({
                title: this.supp_info.supp_name+"-新增联系人"
            })
            
        },
        
        onReady() {
            
        },

        methods: {
            //调用通讯录
            visitContacts() {
                let that=this;
            	nativeCommon.contacts.getContact(function(name, number){
                    let clerkmobile=that.$u.trim(number, 'all');
                    that.clerk_name=name;
                    that.clerk_mobile=parseInt(clerkmobile);
            		
            	});
            },
            //职务选择
            showpost() {
            	this.clerk_postshow = true;
            },
            setpost(index) {
                this.clerk_post = this.clerk_postList[index].text;
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
                            'action':'save_clerk',
                            'supp_code':this.supp_info.supp_code,
                            'clerk_name':this.clerk_name,
                            'clerk_mobile':this.clerk_mobile,
                            'clerk_post':this.clerk_post,
                            'clerk_id':this.$u.guid(16,false,62)
                        },
                        success: (res) =>{
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
