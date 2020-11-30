<template>
    <view>
        <u-toast ref="uToast" />
        <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" > </map>
        <u-cell-group>
        	<u-cell-item  title="位置信息" :value="curraddress" :arrow="false"></u-cell-item>
        </u-cell-group>
        <view class="opmenu">
            <u-button type="primary" size="medium" @click="getcurrlocation">重新获取</u-button>
            <u-button type="success" size="medium" @click="openmap">打开导航</u-button>
        </view>
        <u-cell-group>
            <u-field border-bottom border-top  v-model="handlat" label="Lat" placeholder=""></u-field>
            <u-field v-model="handlong" label="Long" placeholder=""></u-field>
        </u-cell-group>
        <u-button type="success" size="default" @click="savehandcoordinate">保存</u-button>
        <u-modal v-model="saveshow" content="是否保存新位置" :zoom="false" show-cancel-button @confirm="savenewcoordinate(latitude,longitude)"></u-modal>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                // module:"位置座标设置",
                shop_info:"",
                dist_info:"",
                latitude:"39.",
                longitude:"113.",
                curraddress:"",
                saveshow:false,
                handlat:"39.",
                handlong:"113."
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
            console.log(this.dist_info)
            
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name+"位置"
            });
            //获取当前位置
            uni.request({
                    url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                    data: {
                        'action':"get_dist_gps",
                        'usercode':this.dist_info.usercode
                    },
                    success: (res) => {
                        console.log(res.data)
                        this.latitude=res.data.dist_latitude;
                        this.longitude=res.data.dist_longitude;
                        this.handlat=res.data.dist_latitude;
                        this.handlong=res.data.dist_longitude;
                        this.curraddress=res.data.dist_xian+res.data.dist_xiang+res.data.dist_cun;
                        
                    }
            })
        },
        methods:{
            getcurrlocation(){
                let _this=this;
                uni.getLocation({
                    type: 'gcj02',
                    geocode:true,
                    success: function (res) {
                        _this.latitude=res.latitude;
                        _this.longitude=res.longitude;
                        _this.handlat=res.latitude;
                        _this.handlong=res.longitude;
                        _this.curraddress=res.address.district+res.address.street+res.address.poiName;
                        _this.saveshow=true;
                        
                    }
                });
            },
            openmap(){
                uni.openLocation({
                    name:this.dist_info.name,
                    address:this.curraddress,
                    latitude:parseFloat(this.latitude),
                    longitude:parseFloat(this.longitude),
                    success: function () {
                        console.log('success');
                    }
                });
            },
            savenewcoordinate(lat,long){
               
                uni.request({
                    url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                    data: {
                        'action':"savedistcoordinate",
                        'usercode':this.dist_info.usercode,
                        'latitude':lat,
                        'longitude':long
                    },
                    success: (res) => {
                        this.$refs.uToast.show({
                             title: '已保存',
                             type: 'success',
                             position:'bottom'
                         })
                    }
                })
            },
            savehandcoordinate(){
                uni.request({
                    url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/dist_api.php',
                    data: {
                        'action':"savehandcoordinate",
                        'usercode':this.dist_info.usercode,
                        'latitude':this.handlat,
                        'longitude':this.handlong
                    },
                    success: (res) => {
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
</script>

<style scoped>
    .opmenu{
        margin-top: 20upx;
        margin-bottom: 40upx;
        width: 750upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
