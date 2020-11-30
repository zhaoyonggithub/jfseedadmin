<template>
    <view>
        <tui-list-view>
            <tui-list-cell v-for="(item,index) in submenu" :key="index" @click="godetail(item)"  :arrow="true">
            	<view class="tui-item-box">
                    <u-icon :name="item.icon" custom-prefix="jf-icon" size="30" color="#888888"></u-icon>
            		<text class="tui-list-cell_name">{{item.title}}</text>
            	</view>
            </tui-list-cell>
        </tui-list-view>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                shop_info:"",
                dist_info:"",

                submenu:[
                    {title:"位置设置",url:"./submenu/distcoordinate",icon:"shujubaobiao1"},//这个未完成
                    {title:"销售报表",url:"./submenu/distReportsSale",icon:"shujubaobiao1"},
                    {title:"账务报表",url:"./submenu/distReportsAccounting",icon:"zijinliushui"},
                    {title:"产品设置",url:"./submenu/distSetProd",icon:"wuliaoguanli1"},
                    {title:"设置开启",url:"./submenu/distSetIs",icon:"xitongshezhi"},
                    {title:"操作记录",url:"./submenu/distUsageRecord",icon:"caozuojilu"},
                     

                ]
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
            console.log(this.dist_info)
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name
            });
        },
        methods: {
            callphone(){
                uni.makePhoneCall({
                    phoneNumber: this.distinfo.mobile 
                });
                //plus.device.dial( this.distinfo.mobile, false);  这个方法需要先获取权限
            },
            openmap(){
                // uni.openLocation({

                //     latitude:res.data.dist_latitude,
                //     longitude:res.data.dist_longitude,
                //     success: function () {
                //         console.log('success');
                //     }
                // });
                // uni.request({
                //         url: 'http://www.jfseed.com.cn/appapi/shop_admin/distributor_api.php',
                //         data: {
                //             'action':"get_dist_latlong",
                //             'usercode':this.dist_info.usercode
                //         },
                //         success: (res) => {
                //             console.log(res.data)
                //             uni.openLocation({
                //                 name:res.data.dist_xian+res.data.dist_xiang+res.data.dist_cun,
                //                 latitude:parseFloat(res.data.dist_latitude),
                //                 longitude:parseFloat(res.data.dist_longitude),
                //                 success: function () {
                //                     console.log('success');
                //                 }
                //             });
                //         }
                // })
                

            },
            godetail(e) {
            	uni.navigateTo({
            	    url:e.url+"?shop_info="+encodeURIComponent(JSON.stringify(this.shop_info))+"&dist_info="+encodeURIComponent(JSON.stringify(this.dist_info))
            	})
            }
        }
    }
</script>

<style>
    
    .tui-item-box {
    	width: 100%;
    	display: flex;
    	align-items: center;
    }
    .tui-list-cell_name {
    	padding-left: 20rpx;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    }
    .tui-ml-auto {
    	margin-left: auto;
    }
    .tui-right {
    	margin-left: auto;
    	margin-right: 34rpx;
    	font-size: 26rpx;
    	color: #999;
    }

</style>
