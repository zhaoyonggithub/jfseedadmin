<template>
    <view>
        <u-top-tips ref="uTips"></u-top-tips>
        <uni-section  :title="sytlandinfo.dkbh" type="line"></uni-section>
        <u-cell-group>
            <u-field  label="选择公司" v-model="suppname" :disabled="onlyread" @click="suppsshow=!suppsshow"  required></u-field><!-- :type="select" -->
            <u-select v-model="suppsshow" :list="supps" @confirm="changeSupp"></u-select>
            
            <u-field v-if="eninput" label="选择产品" v-model="prods_name" :disabled="onlyread" @click="prodssshow=!prodssshow"  required></u-field>
            <u-field v-else label="输入产品" v-model="prods_name"  required></u-field>
            <u-select v-model="prodssshow" :list="prods" @confirm="changeProd"></u-select>
            
            <u-field  label="种植序号" v-model="testland_prods_sn" :disabled="onlyread" @click="prods_snsshow=!prods_snsshow" right-icon="arrow-down-fill"> required></u-field>
            <u-select v-model="prods_snsshow" :list="prods_snlist" @confirm="changeprods_sn"></u-select>
            
            <u-field  label="自定名称" v-model="testland_prods_Customnumber"  required></u-field>
            
            <u-field  label="所在排数" v-model="testland_prods_rowid" :disabled="onlyread" @click="prods_rowidshow=!prods_rowidshow" required></u-field>
            <u-select v-model="prods_rowidshow" :list="rowid_list" @confirm="changerowid"></u-select>
            <u-field  label="种植行数" v-model="testland_prods_lines" :disabled="onlyread" @click="prods_linesshow=!prods_linesshow" required></u-field>
            <u-select v-model="prods_linesshow" :list="lines_list" @confirm="changelines"></u-select>
            <u-field label="分销商可看真实名称" :label-width="270">
                        <u-switch slot="right" v-model="dsrealname"></u-switch>
            		</u-field>
        </u-cell-group>
        <u-button type="success" :disabled="btndisabled" @click="save_testpord()" :ripple="true" ripple-bg-color="#909399">保存</u-button>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                sytlandinfo:"",
                onlyread:true,
                eninput:true,
                suppsshow:false,
                supps:[],
                suppname:"",
                
                
                prodssshow:false,
                prods:[],
                prods_name:"",
                prods_prodid:"",
                
                prods_snsshow:false,
                prods_snlist:[
                    {value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},
                    {value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"},
                    {value:"11",label:"11"},{value:"12",label:"12"},{value:"13",label:"13"},{value:"14",label:"14"},{value:"15",label:"15"},
                    {value:"16",label:"16"},{value:"17",label:"17"},{value:"18",label:"18"},{value:"19",label:"19"},{value:"20",label:"20"}, 
                    {value:"21",label:"21"},{value:"22",label:"22"},{value:"23",label:"23"},{value:"24",label:"24"},{value:"25",label:"25"},
                    {value:"26",label:"26"},{value:"27",label:"27"},{value:"28",label:"28"},{value:"29",label:"29"},{value:"30",label:"30"},
                    {value:"31",label:"31"},{value:"32",label:"32"},{value:"33",label:"33"},{value:"34",label:"34"},{value:"35",label:"35"},
                    {value:"36",label:"36"},{value:"37",label:"37"},{value:"38",label:"38"},{value:"39",label:"39"},{value:"40",label:"40"},
                    {value:"41",label:"41"},{value:"42",label:"42"},{value:"43",label:"43"},{value:"44",label:"44"},{value:"45",label:"45"},
                    {value:"46",label:"46"},{value:"47",label:"47"},{value:"48",label:"48"},{value:"49",label:"49"},{value:"50",label:"50"}
                    ],
                testland_prods_sn:"",
                
                prods_rowidshow:false,
                rowid_list:[
                    {value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},
                    {value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"}
                    ],
                testland_prods_rowid:"",
                
                prods_linesshow:false,
                lines_list:[
                    {value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},
                    {value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"},
                    {value:"11",label:"11"},{value:"12",label:"12"},{value:"13",label:"13"},{value:"14",label:"14"},{value:"15",label:"15"},
                    {value:"16",label:"16"},{value:"17",label:"17"},{value:"18",label:"18"},{value:"19",label:"19"},{value:"20",label:"20"}
                ],
                testland_prods_lines:"",
                testland_prods_Customnumber:"JF-00",
                btndisabled:false,
                dsrealname:false
    		}
    	},
        onReady() {
            
        },
        onLoad(e) {
            this.sytlandinfo=JSON.parse(decodeURIComponent(e.sytlandinfo));

            uni.setNavigationBarTitle({
            	title: "新增实验品种"
            })

            uni.request({//所有公司
            	url: "http://47.95.214.244/appapi/app_admin/app_admin_testland_api.php",
            	data: {
            		'action':'get_supp'
            	},
            	success: (res) => {
            		//console.log(res.data)
              //       this.re_suppid=res.data.suppids;
            		// this.re_suppname=res.data.oname;
                    this.supps= res.data;
                    this.suppname=res.data[0].label;
                    uni.request({//所有产品数据
                    	url: "http://47.95.214.244/appapi/app_admin/app_admin_testland_api.php",
                    	data: {
                    		'action':'get_supp_prod',
                            'supp_id':res.data[0].value
                    	},
                    	success: (res) => {
                            //console.log(res.data)
                            this.prods=res.data
                            this.prods_name=res.data[0].label
                            this.prods_prodid=res.data[0].value
                        },
                    	fail: (err) => {
                    		console.log('错误信息', err);
                    	},
                    	complete:()=> {
                    		//this.loading = false
                    	}
                    })
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
            changeSupp(e){
                //console.log(e)
                if(e[0].value!=""){
                    this.suppname=e[0].label;
                    this.eninput=true;
                    uni.request({//所有产品数据
                    	url: "http://47.95.214.244/appapi/app_admin/app_admin_testland_api.php",
                    	data: {
                    		'action':'get_supp_prod',
                            'supp_id':e[0].value
                    	},
                    	success: (res) => {
                            ///console.log(res.data);
                    
                            this.prods=res.data
                            this.prods_name=res.data[0].label
                            this.prods_prodid=res.data[0].value
                    	},
                    	fail: (err) => {
                    		console.log('错误信息', err);
                    	},
                    	complete:()=> {
                    		//this.loading = false
                    	}
                    })
                }else{
                    this.suppname=e[0].label;
                    this.eninput=false;
                    this.prods_name="";
                    this.prods_prodid="";
                }
                
            },
            changeProd(e){
                this.prods_name=e[0].label
            },
            changeprods_sn(e){
                this.testland_prods_sn=e[0].label
            },
            changerowid(e){
                this.testland_prods_rowid=e[0].label
            },
            changelines(e){
                this.testland_prods_lines=e[0].label
            },
            save_testpord(){
                if(this.prods_name!="" && this.testland_prods_sn!="" && this.testland_prods_rowid!="" && this.testland_prods_lines!=""){
                    // this.btndisabled=true;
                    uni.request({//实验田产品列表
                        url: "http://47.95.214.244/appapi/app_admin/app_admin_testland_api.php",
                        data: {
                            'action':'save_sytland_prods',
                            'sytlandcode':this.sytlandinfo.sytlandcode,
                            'dkbh':this.sytlandinfo.dkbh,
                            'testland_prods_sn':this.testland_prods_sn,
                            'testland_prods_prodid':this.prods_prodid,
                            'testland_prods_name':this.prods_name,
                            'testland_prods_Customnumber':this.testland_prods_Customnumber,
                            'testland_prods_rowid':this.testland_prods_rowid,
                            'testland_prods_lines':this.testland_prods_lines,
                            'testland_prods_ucode':this.$u.guid(16, false, 62),
                            'dsrealname':this.dsrealname
                            
                        },
                        success: (res) => {
                            //console.log(res.data)
                            if(res.data=="success"){
                                uni.showModal({
                                    title: '添加成功',
                                    content: '是否继续',
                                    success: function (res) {
                                        if (res.confirm) {
                                            this.btndisabled=false
                                        } else if (res.cancel) {
                                            uni.navigateBack({
                                                delta: 1
                                            });
                                        }
                                    }
                                })
                            }
                        },
                        fail: (err) => {
                            console.log('错误信息', err);
                        },
                        complete:()=> {
                            //this.loading = false
                        }
                    })
                }else{
                    console.log(this.dsrealname)
                    this.$refs.uTips.show({
                        title: '星号项必须填写',
                        type: 'error',
                        duration: '2300'
                    })
                }
            }

        }
    } 
</script>

<style scoped>
    .input-a{
        width: 50%;
    }

</style>
