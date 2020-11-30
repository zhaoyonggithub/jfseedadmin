<template>
    <view class="cpage">
        <view class="landinfo-card">
            <view>共计{{prodtotal}}个品种</view>
            <view>起向：{{this.sytlandinfo.Startingdirection}}</view>
            <view>行向：{{this.sytlandinfo.Sowingdirection}}</view>
        </view>
        <view v-for="(item,index) in sytlandprodlist" :key="index">
                <uni-section :title="'第'+item.rowid+'排'" type="line" class="row-title"></uni-section>
                <u-cell-group v-for="(item2,index2) in item.rowlist" :key="index2" @click="godetail(item2)">

                		<u-cell-item  :value="item2.testland_prods_lines+'行'" :arrow="true">

                            <view slot="title">
                                
                                <text>{{item2.testland_prods_Customnumber+"　"}}</text><text :class="{'isdsrealname':item2.dsrealname}">〔{{item2.testland_prods_name}}〕</text> 
                            </view>
                        </u-cell-item>
                </u-cell-group>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                sytlandinfo:"",
                shopinfo:"",
                prodtotal:"",
                sytlandprodlist:""
            }
        },
        onReady() {
           
        },
        onNavigationBarButtonTap(e){
            if(e.index==0){
                //console.log("新增表单")
                uni.navigateTo({  //跳转到相应页，在数据库另设一个和PAGE.json对应的路径字段
                    url:"./syt_admin_addnew?sytlandinfo="+encodeURIComponent(JSON.stringify(this.sytlandinfo))
                })
            }
        },
        onLoad(e) {
            this.sytlandinfo = JSON.parse(decodeURIComponent(e.sytlandinfo))
            //console.log(this.sytlandinfo)
            this.shopinfo = JSON.parse(decodeURIComponent(e.shopinfo))

            uni.setNavigationBarTitle({
           	    title: "实验产品列表"
                })
            uni.request({//实验田产品列表
                url: "http://www.jfseed.com.cn/appapi/shop_admin/modelfield_api.php",
                data: {
                    'action':'get_sytland_prod_list',
                    'sytlandcode':this.sytlandinfo.sytlandcode,
                    'dkbh':this.dkbh
                },
                success: (res) => {
                    this.sytlandprodlist=res.data;
                    //console.log(this.sytlandprodlist)
                    let cumline=0;
                    this.sytlandprodlist.forEach((item1, index1) => {
                        item1.rowlist.forEach((item2, index2) => {
                           cumline++;
                        })
                    })
                    this.prodtotal=cumline;
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
            godetail(e){ //
                uni.navigateTo({  
                       url:"/pages/modelfield/modelfieldedit?prodinfo="+encodeURIComponent(JSON.stringify(e))+"&shopinfo="+encodeURIComponent(JSON.stringify(this.shopinfo))+"&sytlandinfo="+encodeURIComponent(JSON.stringify(this.sytlandinfo))
                })
            }
       }
   } 
</script>

<style scoped>
    .cpage{
        width: 750upx;
    }

    .landinfo-card {
        
        background-color: #FFFFFF;
        padding: 30upx;
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
    }
    .content-detail{
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 60upx;
        /* border-bottom: 1px solid #eaeef1; */
    }
    .tui-list-cell_name {
    	padding-left: 20rpx;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    }
    .isdsrealname{
        color: #D74620;
    }
</style>
