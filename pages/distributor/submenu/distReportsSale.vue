<template>
    <view>
        <u-top-tips ref="uTips"></u-top-tips>
        <view class="qiun-charts">
        <canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts"  @touchstart="touchColumn"></canvas>
        </view>
    </view>
</template>
    
<script>
    import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
    var _self;
    var canvaColumn=null;
    export default {
    	data() {
    		return {
                // module:"销售报表",
                shop_info:"",
                dist_info:"",
                
                pixelRatio:1,
                cWidth:'',
                cHeight:'',
                serverData:''
            }
        },
        onLoad(e) {
            this.shop_info = JSON.parse(decodeURIComponent(e.shop_info));
            this.dist_info = JSON.parse(decodeURIComponent(e.dist_info));
            console.log(this.dist_info)
            _self = this;
            this.cWidth=uni.upx2px(750);
            this.cHeight=uni.upx2px(500);
        },
        onReady(){
            uni.setNavigationBarTitle({
            	title: this.dist_info.name+"销售图"
            });
            this.getServerData();
        },
        methods:{
            getServerData(){
                uni.request({
                    //url: 'https://www.ucharts.cn/data.json',
                    url: 'http://www.jfseed.com.cn/appapi/jfseed_admin/dist/distReportsSale_api.php',
                    data:{
                        action:'distcharts',
                        usercode:this.dist_info.usercode
                    },
                    success: function(res) {
                        console.log(res.data)
                        if(res.data.flag=="success"){
                            //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
                            _self.serverData=res.data;
                            let ColumnStack={categories:[],series:[]};
                            //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                            ColumnStack.categories=res.data.categories;
                            ColumnStack.series=res.data.series;
                            _self.showColumnStack("canvasColumnStack",ColumnStack);
                        }else{
                            _self.$refs.uTips.show({title: '未找到数据',type: 'error',duration: '1500'})
                        }
                        
                    },
                    fail: () => {
                        _self.tips="网络错误，小程序端请检查合法域名";
                    },
                });
            },
            showColumnStack(canvasId,chartData){
                canvaColumn=new uCharts({
                					$this:_self,
                					canvasId: canvasId,
                					type: 'column',
                					legend:{show:true},
                					fontSize:11,
                					background:'#FFFFFF',
                					pixelRatio:_self.pixelRatio,
                					animation: true,
                					categories: chartData.categories,
                					series: chartData.series,
                					xAxis: {
                						disableGrid:true,
                					},
                					yAxis: {
                                        min:0,
                                        max:Math.max(...chartData.series[0].data)+100
                					},
                					dataLabel: true,
                					width: _self.cWidth*_self.pixelRatio,
                					height: _self.cHeight*_self.pixelRatio,
                					extra: {
                						column: {
                							type:'meter',
                							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length,
                							meter:{
                								//这个是外层边框的宽度
                								border:0,
                								//这个是内部填充颜色
                								fillColor:'#30AEFA'
                							}
                						}
                					  }
                				});
            				
            },
            touchColumn(e){
                canvaColumn.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data 
                    }
                });
            }
        }
    }
</script>

<style>

.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{margin-top: 20upx;  width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
