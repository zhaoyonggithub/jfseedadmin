<template>
	<view>
		<uni-list>
			<uni-list-item  :show-arrow="false" title="大类:" @tap="class_big_Change">
                <template v-slot:right="">
                    <view class="">{{class_big_name}}</view>
                </template>
			</uni-list-item>
			<uni-list-item  :show-arrow="false" title="小类:" @tap="class_sub_Change">
			    <template v-slot:right="">
			        <view class="">{{class_sub_name}}</view>
			    </template>
			</uni-list-item>
			<uni-list-item  :show-arrow="false" title="产品名称:">
                <template v-slot:right="">
					 <input type="text" placeholder="点此输入" @input="Inputname" v-model="supp_prod_name"/>
                </template>
			</uni-list-item>
			<uni-list-item  :show-arrow="false" title="包装规格:">
                <template v-slot:right="">
					<view class="spec-merage">
							<uni-number-box :max=10000 @change="Changenum"></uni-number-box>
							<view class="text_ggbz" @tap="spec_gg_Change">{{supp_prod_spec_gg}}</view>
                        <view>/</view>
							<view class="text_ggbz" @tap="spec_bz_Change">{{supp_prod_spec_bz}}</view>
					</view>
                </template>
			</uni-list-item>
		</uni-list>


		<button type="primary" :disabled="savedisabled" @click="prod_addnew">保存</button>
	</view>
</template>

<script>



	export default {

		data() {
			return {
                supp_info:"",
				spec_gg: ['粒','斤','kg', 'g','L','mL','m','cm'],
				spec_bz: ['袋', '包', '瓶', '罐'],
				supp_code:"",
				class_big:[],
				class_big_index: 0,
				class_big_name:"",
				class_sub:["玉米"],
				class_sub_index: 0,
				class_sub_name:"",
				supp_prod_name:"",
				supp_prod_spec_num:"1",
				supp_prod_spec_gg:"粒",
				supp_prod_spec_bz:"袋",
				supp_prod_state:true,
				supp_prod_stage:false,
				supp_prod_description:"",
				savedisabled:false
			}
		},

		onLoad(e) {
			console.log(e)
            this.supp_info=JSON.parse(decodeURIComponent(e.supp_info));

			uni.request({//获取用户可登录状态
				url: "http://www.jfseed.com.cn/appapi/class_api.php",
				data: {
					'action':'get_big_name'
				},
				success: (res) => {
					//console.log(res.data);
					this.class_big=res.data;
					this.class_big_name=this.class_big[0];
					
					uni.request({
						url: "http://www.jfseed.com.cn/appapi/class_api.php",
						data: {
							'action':'appget_sub_class',
							'big_class_name':this.class_big_name
						},
						success: (res) => {
							//console.log(res.data);
							this.class_sub=res.data;
							this.class_sub_name=this.class_sub[0]
						},
						fail: (err) => {
							console.log('request fail', err);
						},
						complete:()=> {
							//this.loading = false
						}
					})
				},
				fail: (err) => {
					console.log('request fail', err);
				},
				complete:()=> {
					//this.loading = false
				}
			})
			
			
		},
		methods: {
			class_big_Change(){
                uni.showActionSheet({
                	itemList: this.class_big,
                	success: (e) => {
                        this.class_big_name=this.class_big[e.tapIndex]
                		console.log();
                        uni.request({
                        	url: "http://www.jfseed.com.cn/appapi/class_api.php",
                        	data: {
                        		'action':'appget_sub_class',
                        		'big_class_name':this.class_big_name
                        	},
                        	success: (res) => {
                        		//console.log(res.data);
                        		this.class_sub=res.data;
                        		this.class_sub_name=this.class_sub[0]
                        	},
                        	fail: (err) => {
                        		console.log('request fail', err);
                        	},
                        	complete:()=> {
                        		//this.loading = false
                        	}
                        })
                	}
                })
			},
			class_sub_Change(e){
				uni.showActionSheet({
				
					itemList: this.class_sub,
					success: (e) => {
				        this.class_sub_name=this.class_sub[e.tapIndex]
						console.log();
				        
					}
				})
			},
            Inputname(e){
            	this.supp_prod_name = e.target.value
            },
            
			Changenum(e){
				this.supp_prod_spec_num=e;
			},
			
			spec_gg_Change(e){
                uni.showActionSheet({
                	itemList: this.spec_gg,
                	success: (e) => {
                        this.supp_prod_spec_gg=this.spec_gg[e.tapIndex]
 
                	}
                })

			},
			spec_bz_Change(e){
                uni.showActionSheet({
                	itemList: this.spec_bz,
                	success: (e) => {
                        this.supp_prod_spec_bz=this.spec_bz[e.tapIndex]
                 
                	}
                })

			},
			prod_addnew(e){
				
				if (this.supp_prod_name==""){
					uni.showToast({
						icon:"none",
						title:"产品名称没输入"
					})
					return;
				}else{
					this.savedisabled=true;
					uni.request({//获取用户可登录状态
						url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
						data: {
							'action':'save_addnew',
							'supp_id':this.supp_info.supp_code,
							"class_big":this.class_big_name,
							"class_sub":this.class_sub_name,
							"supp_prod_name":this.supp_prod_name,
							"supp_prod_specification":this.supp_prod_spec_num+this.supp_prod_spec_gg+'/'+this.supp_prod_spec_bz,
							"supp_prod_state":this.supp_prod_state,
							"supp_prod_stage":this.supp_prod_stage

						},
						success: (res) => {
							console.log(res.data);
							uni.showToast({
								icon:"none",
								title:"添加成功"
							})
							
						},
						fail: (err) => {
							console.log('request fail', err);
						},
						complete:()=> {
							//this.loading = false
						}
					})
				}
			}
		}
	}
	
</script>

<style>
	.spec-merage{
		display: flex;
		flex-direction: row;
        align-items: center;
	}
	.text_ggbz{
		display: flex;
		flex-direction: row;
		align-items: center;
        justify-content: center;
		height: 80upx;
        width: 100upx;
        border-bottom: #0099cc solid;
	}
</style>
