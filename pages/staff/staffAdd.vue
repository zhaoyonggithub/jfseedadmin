<template>
    <view>
        <u-cell-group>
            <u-field label="姓名" v-model="staff_name"  required></u-field>
            <u-field label="电话" v-model="staff_tel"  type="number" required></u-field>
            <u-field label="可登录" :disabled="onlyread">
                <u-switch slot="right" v-model="staff_islogin" @change="changeislogin"></u-switch></u-field>
            <u-field label="加入日期" v-model="staff_joiningtime" :disabled="onlyread" @click="openSowingdate" right-icon="calendar-fill" ></u-field>
            <u-field label="年薪" v-model="staff_yearlysalary"  type="number"  right-icon="rmb"></u-field>
            
        </u-cell-group>
        <u-button type="success" :disabled="isdisabled" :ripple="true" ripple-bg-color="#909399" @click="savestaff">保存</u-button>
         <u-picker @confirm="chooseSowingdate" mode="time" v-model="Sowingdateshow" :params="dateparams"></u-picker>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                onlyread:true,
                isdisabled:false,
                Sowingdateshow: false,
                dateparams: {year: true,month: true,day: true,hour: false,minute: false,second: false},
                staff_name:"",
                staff_tel:"",
                staff_islogin:false,
                staff_joiningtime:"",
                staff_yearlysalary:"",
                staff_note:"",
                
                
    		}
    	},
        onReady() {
            
        },
        onLoad() {
            uni.setNavigationBarTitle({
            	title: "添加新员工"
            })
        },
    	methods: {
            openSowingdate(){
                this.Sowingdateshow=true;
            },
            chooseSowingdate(e){
                this.staff_joiningtime=e.year+"-"+e.month+"-"+e.day;
            },
            changeislogin(index){
                this.staff_islogin = !!index;
                
            },
            savestaff(){
                if (this.staff_name!="" && this.staff_tel!=""){
                    uni.request({//保存新员工
                    	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/staff/staff_api.php",
                    	data: {
                    		'action':'save_staff',
                            'staff_name':this.staff_name,
                            'staff_tel':this.staff_tel,
                            'staff_islogin':this.staff_islogin,
                            'staff_joiningtime':this.staff_joiningtime,
                            'staff_yearlysalary':this.staff_yearlysalary,
                            'staff_note':this.staff_note,
                            'staff_id':this.$u.guid(16,false,62)
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
