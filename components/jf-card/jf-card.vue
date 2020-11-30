<template>
    <view>
        <view class="jf-card">
            <view class="jf-card-text"><text>{{title}}</text></view>
            <view class="jf-card-image" >
                <image :src="thumbnail" mode="widthFix" @click="onClick"></image>
            </view>
            <view class="jf-card-titlebox">
                <button type="default" @click="saveClick">保存图片到像册</button>
            </view>
        </view>
    </view>
</template>

<script>

	export default {
		name: 'JfCard',
        data(){
            return {
                tempFilePath:"",
                loadPercent:0
            	
            }
        },
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
			note: {
				type: String,
				default: ''
			}, // Tips
			thumbnail: {
				type: String,
				default: ''
			},
            sthumbnail: {
				type: String,
				default: ''
			}
		},
		methods: {
            onClick(){
                var _this=this
                uni.previewImage({
                    urls:[this.sthumbnail],
                    current : this.sthumbnail,

                });
            },
			saveClick() {
				//this.$emit('click')
                uni.showLoading({
                    title: this.loadPercent+"%",
                    
                });
                const downloadTask =uni.downloadFile({
                    url: this.thumbnail, 
                    success: (res) => {
                        if (res.statusCode === 200) {
                            
                            uni.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath,
                                        success: function () {
                                            uni.hideLoading()
                                            uni.showToast({
                                                title:"完成"
                                            })
                                            console.log('save success');
                                        }
                            });
                            // plus.gallery.save( res.tempFilePath, function () {
                            // 		uni.showToast({
                            //                title:"已保到相册",
                            //                icon:"none"
                            //         })
                            // });
                        }
                    }
                });
                downloadTask.onProgressUpdate((res) => {
                    //console.log(res.progress)
                    this.loadPercent=res.progress
                });
                
			}
		}
	}
</script>

<style scoped>
	.jf-card {
		/* #ifndef APP-NVUE */
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		/* #endif */
		margin: 12px;
		background-color: #eeeeee;
		position: relative;
		flex-direction: column;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 3px;
		overflow: hidden;

	}


	.jf-card-image {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		overflow: hidden;
        justify-content: center;
        align-items: center;
	}

	

	.jf-card-titlebox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
        flex: 1;
		flex-direction: row;
		padding: 16rpx 24rpx;

	}



	.jf-card-text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
        align-items: center;
        justify-content: center;
	}


</style>
