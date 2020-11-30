<template>
    <view>
        <uni-card class="land-card" v-for="(item,index) in sytdata" :key="index" :title="item.dkbh"  thumbnail="/static/landid.png" :extra="'种植日期:'+item.Sowingdate"  :note="item.address">
            <view class="cardbtn-group">
                <view class="cardbtn" @click="info(item)"><image class="miniicon" src="/static/daohang.png"></image>设置</view>
                <view class="cardbtn" @click="calltel(item.wardentel)"><image class="miniicon" src="../../static/phone.png"></image>{{item.warden}}</view>
                <view class="cardbtn" @click="prodsdetail(item)"><image class="miniicon" src="../../static/xiangqing.png"></image>管理</view>
            </view>
        </uni-card>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
    			shop_code:"",
    			shop_name:"",
    			curr_year:"",
    			sytdata:[{name:"abc",id:"123",year:"2020"},{name:"def",id:"123",year:"2019"}]
    		}
    	},
        onLoad(e) {
            this.shop_code=e.shop_code
            this.shop_name=e.shop_name
            let date=new Date();
            this.curr_year = date.getFullYear()
            uni.setNavigationBarTitle({
            	title: e.shop_name+"-布点"
            })
            uni.request({//所有产品数据
            	url: "http://www.jfseed.com.cn/appapi/app_admin/app_admin_testland_api.php",
            	data: {
            		'action':'get_sytland_list',
                    'shop_code':this.shop_code,
                    'curr_year':this.curr_year
            	},
            	success: (res) => {
                    //console.log(res.data);
                    this.sytdata=res.data;
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
            info(item){
                console.log("编辑基本信息")
                
            },
            calltel(tel){
                uni.makePhoneCall({
                    phoneNumber: tel
                });
            },
            prodsdetail(item){
                
                let shopinfo={'shopcode':this.shop_code,'shopname':this.shop_name};
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                //encodeURIComponent(JSON.stringify(this.defshop))
                        url:"./modelfielddetail?shopinfo="+encodeURIComponent(JSON.stringify(shopinfo))+"&sytlandinfo="+encodeURIComponent(JSON.stringify(item))
                })
            }
        }
    }
</script>

<style scoped>
    .land-card{
        background-color: #FFFFFF;
    }
    .cardbtn-group{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        
    }
    .cardbtn{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 15upx;
        padding-left: 25upx;
        padding-right: 25upx;
        font-size: 35upx;
        /* background-color: #CC3300; */
        color: #333333;
        border-radius:55upx;
    }
    .miniicon{
        width: 50upx;
        height: 50upx;
        padding-right: 20upx;
    }
    .bbt {
        width: 100%;
        position:sticky;
        bottom:0;
    }
</style>
