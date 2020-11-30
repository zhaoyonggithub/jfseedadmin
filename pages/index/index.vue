<template>
    <view class="jf-container" >
        <view class="jf-blocks jf-menugroup top">
            <u-grid :col="3" :border="false">
                <u-grid-item v-for="(item,index) in menuList1" :key="index"  @click="menulik(item)">
                    <view class="jf-grid-menu">
                        <u-icon :name="item.icon" custom-prefix="jf-icon" size="60" color="#888888"></u-icon>
                        
                    </view>
                    <text class="jf-grid-label">{{item.title}}</text>
                </u-grid-item>
            </u-grid>
        </view>
        <view class="jf-blocks jf-menugroup">
            <u-grid :col="3" :border="false">
                <u-grid-item v-for="(item,index) in menuList2" :key="index"  @click="menulik(item)">
                    <view class="jf-grid-menu">
                        <u-icon :name="item.icon" custom-prefix="jf-icon" size="60" color="#888888"></u-icon>
                        
                    </view>
                    <text class="jf-grid-label">{{item.title}}</text>
                </u-grid-item>
            </u-grid>
        </view>
        <view class="jf-blocks jf-menugroup">
            <u-grid :col="3" :border="false">
                <u-grid-item v-for="(item,index) in menuList3" :key="index"  @click="menulik(item)">
                    <view class="jf-grid-menu">
                        <u-icon :name="item.icon" custom-prefix="jf-icon" size="60" color="#888888"></u-icon>
                        
                    </view>
                    <text class="jf-grid-label">{{item.title}}</text>
                </u-grid-item>
            </u-grid>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				menuList1: [{
				        title:"供货厂家",
				        icon:"gongyingshang",
				        havebadge:false,
				        url:"../supplier/supplierList"
					}, 
                    {
				        title:"门店",
				    	icon:"dianpuguanli",
				        havebadge:false,
				        url:"../shop/shopList"
				    },
                    {
				        title:"分销商",
						icon:"navicon-jsgl",
				        havebadge:true,
				        url:"../distributor/distributorList"
					},

                    {
                        title:"员工",
                    	icon:"icon-yuangongguanli",
                        havebadge:false,
                        url:"../staff/staffList"
                    },
                    {
                        title:"试验田",
                    	icon:"nongtian_",
                        havebadge:false,
                        url:"../demonstration/demonstrationList"
                    }
				],
                menuList2: [
                    {
                        title:"仓库盘点",
                        icon:"cangkuguanli",
                        havebadge:false,
                        url:"../building"
                	}, {
                        title:"销售统计",
                    	icon:"xiaoshoubaobiao",
                        havebadge:false,
                        url:"../Report/ReportSales"
                    }
                ],
                menuList3: [{
                        title:"监控",
                		icon:"jiankong",
                        havebadge:true,
                        url:"../building"
                	},
                    {
                        title:"设置",
                    	icon:"icon-yuangongguanli",
                        havebadge:false,
                        url:"../building"
                    },
                    {
                        title:"财务报表",
                    	icon:"ccgl-sunyiguanli-4",
                        havebadge:false,
                        url:"../Report/ReportFinancial"
                    },
                    {
                        title:"营销活动",
                    	icon:"yuangongfuli",
                        havebadge:false,
                        url:"../building"
                    },
                    {
                        title:"扫码",
                    	icon:"tiaomachaxun2",
                        havebadge:false,
                        url:"../building"
                    },
                    {
                        title:"大客户",
                    	icon:"17003",
                        havebadge:false,
                        url:"../building"
                    },
                    {
                        title:"常用APP",
                    	icon:"APP",
                        havebadge:false,
                        url:"../building"
                    }
                ]
			}
		},
        onReady() {
            
        },
		methods: {
            menulik(e){
                uni.vibrateShort({
                    success: function () {
                        //console.log('success');
                    }
                });
                uni.navigateTo({
                    url:e.url,
                    success: () => {
                        
                    }
                })
            }
		}
	}
</script>

<style scoped lang="scss">
    .jf-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 750upx;
        background: #EDEDED;
    }
    .jf-blocks{
        width: 750upx;
        margin-bottom: 20upx;
    }
    .top{
        margin-top: 20upx;
    }
    .jf-menugroup{
        background-color: #FFFFFF;
        width: 720upx;
        border-radius: 20upx;
        padding: 20upx 0upx;
    }
    .jf-grid-menu {
        width: 64rpx;
        height: 64rpx;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
    }
    .jf-grid-icon{
        width: 64rpx;
        height: 64rpx;
        margin: 50 0;
        text-align: center;
        vertical-align: middle;
    }
    .jf-grid-label {
        display: block;
        text-align: center;
        font-weight: 400;
        color: #333;
        font-size: 28rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10rpx;
    }  

</style>
