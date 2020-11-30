<template>
    <view>
        <u-cell-group>
             <u-cell-item icon="account-fill" :title="item.staff_name" v-for="(item,index) in stafflist" :key="index" @click="staff_edit($event,item)"></u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
    			stafflist:""
    		}
    	},
        onLoad() {
            
        },
        onNavigationBarButtonTap(e){
            if(e.index==0){
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./staffAdd"
                })
            }
        },
        onShow() {
            uni.request({//所有产品数据
            	url: "http://www.jfseed.com.cn/appapi/jfseed_admin/staff/staff_api.php",
            	data: {
            		'action':'get_staff_list',
            	},
            	success: (res) => {
                   this.stafflist=res.data;
                    //console.log(res.data)
            	},
            	fail: (err) => {
            		console.log('错误信息', err);
            	},
            	complete:()=> {
            		//this.loading = false
            	}
            })
        },
    	methods: {
            staff_edit(e,i){
                uni.navigateTo({
                    url:'./staffEdit?staff_info='+ encodeURIComponent(JSON.stringify(i))
                })
            }
        }
    }
</script>

<style scoped>
    .bbt {
        width: 100%;
        position:fixed;
        bottom:0;
    }
</style>
