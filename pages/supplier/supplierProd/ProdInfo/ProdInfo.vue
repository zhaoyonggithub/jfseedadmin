<template>
    <view>
        <u-cell-group>
            <u-field  v-model="prodbaseinfo.class_big" :disabled="true"  label="大类" right-icon="arrow-down-fill" @click="bigChange"></u-field>
            <u-field  v-model="prodbaseinfo.class_sub" :disabled="true"  label="小类" right-icon="arrow-down-fill" @click="subChange"></u-field>
            <u-field  v-model="prodbaseinfo.specification"  label="规格"></u-field>
        </u-cell-group>
        <u-button type="primary"  :ripple="true" @click="savesubmit">保存修改</u-button>
        <u-select  :mode="'single-column'" v-model="bigshow" :list="bigclass" @confirm="openbigitem"></u-select>
        <u-select  :mode="'single-column'" v-model="subshow" :list="subclass" @confirm="opensubitem"></u-select>
    </view>
</template>

<script>
    export default {
        	data() {
        		return {
                    bigshow: false,
                    subshow: false,
                    bigclass:[],
                    subclass:[],
                    prod_info:"",
                    prodbaseinfo:""

                }
            },
            async onLoad(e) {
                this.prod_info = JSON.parse(decodeURIComponent(e.prod_info));
                console.log(this.prod_info)
                uni.setNavigationBarTitle({
                    title: this.prod_info.supp_prod_name+"资料编辑"
                })
                uni.request({//获取产品信息
                    url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                    data: {
                        'action':'get_supp_prod_info',
                        'supp_prod_id':this.prod_info.supp_prod_id
                    },
                    success: (res) => {
                        //console.log(res.data);
                        this.prodbaseinfo=res.data;
                        this.getbigclass();
                        this.getsubclass(this.prodbaseinfo.class_big)
                    }
                })
                

            },
            onReady() {
                
            },
            onShow() {
                
            },
            methods: {
                getbigclass(){
                    uni.request({//获取大类
                        url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                        data: {
                            'action':'get_big_class'
                        },
                        success: (res) => {
                            console.log(res.data);
                            this.bigclass=res.data;
                        }
                    })
                },
                getsubclass(big){
                    uni.request({//获取小类
                        url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                        data: {
                            'action':'get_sub_class',
                            'bigclass':big
                        },
                        success: (res) => {
                            console.log(res.data);
                            this.subclass=res.data;
                        }
                    })
                },
                
                
                bigChange(index) {
                	this.bigshow = !index;
                },
                subChange(index) {
                	this.subshow = !index;
                },
                openbigitem(e){
                   console.log(e)
                    e.map((val, index) => {
                        this.prodbaseinfo.class_big=val.label;
                        this.prodbaseinfo.class_sub="";
                        this.getsubclass(val.label)
                    })
                },
                opensubitem(e){
                    this.result = '';
                    e.map((val, index) => {
                    	this.prodbaseinfo.class_sub=val.label;
                    })
                },
                savesubmit(){
                    uni.request({//修改产品基本信息
                        url: "http://www.jfseed.com.cn/appapi/jfseed_admin/suppliers/suppliers_prod_api.php",
                        data: {
                            'action':'modiy_prod_baseinfo',
                            'supp_prod_id':this.prod_info.supp_prod_id,
                            'classbig':this.prodbaseinfo.class_big,
                            'classsub':this.prodbaseinfo.class_sub,
                            'specification':this.prodbaseinfo.specification
                        },
                        success: (res) => {
                            console.log(res.data);
                        }
                    })
                    
                }
            }
        }
</script>

<style>
</style>
