<template>
    <view>
        <u-cell-group>
            <u-field label="姓名" v-model="staff_info.staff_name" :disabled="onlyread"></u-field>
            <u-field label="电话" v-model="staff_info.staff_tel"  type="number" ></u-field>
            <u-field label="可登录" :disabled="onlyread">
                <u-switch  slot="right" v-model="staff_info.staff_islogin" @change="changeislogin"></u-switch></u-field>
            <u-field label="加入日期" v-model="staff_info.staff_joiningtime" :disabled="onlyread" right-icon="calendar-fill" ></u-field>
            <u-field label="年薪" v-model="staff_info.staff_yearlysalary"  type="number"  right-icon="rmb"></u-field>
        </u-cell-group>
        <u-button type="success" :disabled="isdisabled" :ripple="true" ripple-bg-color="#909399" @click="savestaffedit">保存</u-button>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                onlyread:true,
                staff_info:"",
                isdisabled:false
    		}
    	},
        onReady() {
            
        },
        onLoad(e) {
            this.staff_info = JSON.parse(decodeURIComponent(e.staff_info));
            this.staff_info.staff_islogin=(this.staff_info.staff_islogin=="1") ?true:false;
            uni.setNavigationBarTitle({
            	title: "修改员工资料"
            })
        },
    	methods: {
            changeislogin(index){
                this.staff_info.staff_islogin = !!index;
                
            },
            savestaffedit(){
                if (this.staff_name!="" && this.staff_tel!=""){
                    uni.request({//保存修改
                    	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/staff/staff_api.php",
                    	data: {
                    		'action':'save_staff_edit',
                            'staff_id':this.staff_info.staff_id,
                            'staff_tel':this.staff_info.staff_tel,
                            'staff_islogin':this.staff_info.staff_islogin,
                            'staff_yearlysalary':this.staff_info.staff_yearlysalary

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
