<template>
    <view>
        <u-top-tips ref="uTips"></u-top-tips>
        <u-cell-group>
            <u-field :disabled="true" label="基本批发价"  label-width="200">
                <u-number-box v-model="price.price_wholesale" :min="testbasenumber" bg-color="#FF9900" color="#ffffff" slot="right" @change="valChange"></u-number-box>
            </u-field>
            <u-field :disabled="true" label="最低批发价" label-width="200">
                <u-number-box v-model="price.minprice_wholesale" :min="testbasenumber" :max="maxprice_wholesale" bg-color="#FF9900" color="#ffffff" slot="right" @change="valChange"></u-number-box>
            </u-field>
            <u-field :disabled="true" label="大客户价" label-width="200">
                <u-number-box v-model="price.price_vip" :min="testbasenumber" bg-color="#FF9900" color="#ffffff" slot="right" @change="valChange"></u-number-box>
            </u-field>
            <u-field :disabled="true" label="零售价"  label-width="200">
                <u-number-box v-model="price.price_retail" :min="testbasenumber" bg-color="#FF9900" color="#ffffff" slot="right" @change="valChange"></u-number-box>
            </u-field>
            <u-field :disabled="true" label="最低零售价"  label-width="200">
                <u-number-box v-model="price.minprice_retail" :min="testbasenumber" :max="maxprice_retail" bg-color="#FF9900" color="#ffffff" slot="right" @change="valChange"></u-number-box>
            </u-field>
            <u-field type="number" v-model="curr_coefficient" label="门店提成系数"   label-width="200" ></u-field>
        </u-cell-group>
        <u-gap height="40" bg-color="#fff"></u-gap>
        <u-card title="批发利润" sub-title="subTitle" >
            <view class="" slot="body">234</view>
        </u-card>
        <view class="computer">
            <u-table>
            		<u-tr>
            			<u-th>进货价</u-th><u-th>零售价</u-th><u-th>提成计算</u-th><u-th>利润</u-th>
            		</u-tr>
            		<u-tr>
            			<u-td>{{testbasenumber}}</u-td>
                        <u-td>{{price.price_retail}}</u-td>
                        <u-td>{{price.price_retail*price.price_coefficient/100}}</u-td>
                        <u-td>{{profit}}</u-td>
            		</u-tr>
            	</u-table>
                <u-gap height="40" bg-color="#fff"></u-gap>
                <view>
                    <view>进货价</view>
                    <view><slider :value="testbasenumber" @changing="tprice" min="0" max="30" show-value /></view>
                </view>
                <view>
                    <view>系数</view>
                    <view><slider :value="price.price_coefficient" @changing="mcoefficient" min="0" max="30" show-value /></view>
                </view>
        </view>
        <u-button @click="saveprice">保存</u-button>
    </view>
</template>

<script>
    export default {
        	data() {
        		return {
                    prod_info:"",
                    price:"",
                    testbasenumber:21

                }
            },
            onLoad(e) {
                this.prod_info = JSON.parse(decodeURIComponent(e.prod_info));
                uni.setNavigationBarTitle({
                    title: this.prod_info.supp_prod_name+"价格设置"
                })
                uni.request({//获取产品信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                    data: {
                        'action':'get_prod_price',
                        'supp_prod_id':this.prod_info.supp_prod_id
                    },
                    success: (res) => {
                        console.log(res.data);
                        this.price=res.data;
                    }
                })

            },
            onReady() {
                
            },
            computed:{
                curr_coefficient() {
                   return this.price.price_coefficient/100
                },
                profit(){
                    return this.price.price_retail-this.testbasenumber-this.price.price_retail*this.price.price_coefficient/100
                },
                maxprice_wholesale(){
                    return this.price.price_wholesale;
                },
                maxprice_retail(){
                    return this.price.price_retail;
                }
            },
            methods: {
                valChange(e) {
                				console.log('当前值为: ' + e.value)
                			},
                mcoefficient(e){ //修改提成系数
                    this.price.price_coefficient=e.detail.value;
                },
                tprice(e){ // 修改进货价
                    this.testbasenumber=Number(e.detail.value);
                },
                saveprice(){
                        uni.request({//获取供货商信息
                            url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                            data: {
                                'action':'save_supp_price',
                                'supp_prod_id':this.prod_info.supp_prod_id,
                                'price_wholesale':this.price.price_wholesale,
                                'minprice_wholesale':this.price.minprice_wholesale,
                                'price_vip':this.price.price_vip,
                                'price_retail':this.price.price_retail,
                                'minprice_retail':this.price.minprice_retail,
                                'price_coefficient':this.price.price_coefficient
                            },
                            success: (res) => {
                                console.log(res.data);
                                if(res.data=="SUCESS"){
                                    this.$refs.uTips.show({
                                        title: '价格修改成功',
                                        type: 'success',
                                        duration: '2300'
                                    })
                                }
                            }
                        })
                }
            }
        }
</script>

<style scoped>
    .computer{
        width: 600upx;
        margin: auto;
        display: flex;
        flex-direction: column;

        justify-content: center;
    }
</style>

