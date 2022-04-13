// components/guide/index.js
import {
  toastError,
  checkLogin
} from '../../../../utils/util.js';

import {
  playPlanToCollection
} from '../../../../utils/play.js';
const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		planlist: {
			type: Array,
			value: []
		},
		noListShow: {
			type: Boolean,
			value: true
		},
		pageid:{
			type: String,
			value: ''
		},
		pgc:{
			type:Object,
			value:{
				bomLoading:false,
				noMore:false
			}
		}
	},
	/**
	 * 组件的初始数据
	 */
	data: {
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		bindTouchStart(e) {
			this.startTime = e.timeStamp;
		},
		bindTouchEnd(e) {
			this.endTime = e.timeStamp;
		},
		toDetail(e) {
			if(this.endTime  - this.startTime < 350) {
				let item = e.currentTarget.dataset.item;
				let index = e.currentTarget.dataset.index;
				item.idx = index;
				this.triggerEvent('toDetail', item)
			}
		},
		bingLongTap(e) {
			let item = e.currentTarget.dataset.item;
			let index = e.currentTarget.dataset.index;
			item.idx = index;
			this.triggerEvent('bingLongTap', item)
		},
		toCollection(e) {
			var _this = this;
			const isLogin = checkLogin();
			if (!isLogin) {
				wx.redirectTo({
					url: app.globalData.loginPath+'?from=page',
					success: function(res) {},
					fail: function(res) {}
				})
				return
			}
			if(_this.isCollection) return;
			_this.isCollection = true;
			let item = e.currentTarget.dataset.item;//获取当前点击的攻略的信息
			let index = e.currentTarget.dataset.index;//收藏或者取消收藏成功后改变状态用
			const collectType = item.isCollect?item.isCollect:'0';   //收藏状态 - 1已收藏 0为收藏;
			let obj = {
				cityEntityId: item.cityEntityId,   //文旅城id
				groupEntityId: item.groupEntityId,
				industryId: item.industryId,   //业态id
				playPlanId: item.id,   //攻略id
				playPlanType:3,   //攻略类型 - 专业玩咖
				type:collectType,  //用于判断调用哪个接口用
				memberNo:wx.getStorageSync('member').memberNo
			}
			//调用接口
			playPlanToCollection(obj).then(res=>{
				if (res.data.status == 200) {
					let newData = _this.data.planlist;
					if(collectType != '1'){
						newData[index].isCollect = 1;
						newData[index].collectCount = newData[index].collectCount +1;
					}else{
						newData[index].isCollect = 0;
						newData[index].collectCount = (newData[index].collectCount>0?newData[index].collectCount:1) - 1;
					}
					this.triggerEvent('toCollection', {newItem: newData[index],idx: index})
					wx.setStorageSync('gl_v_status_index', true);//攻略列表-收藏操作存储
					setTimeout(function () {
						_this.isCollection = false;
					},300)
					// 收藏点击埋点
					_this.collectionEvent(item);
				}else{
					if(collectType != '1'){
						toastError(res.data.message || '收藏失败',500);
						_this.isCollection = false
					}else{
						toastError(res.data.message || '取消收藏失败',500);
						_this.isCollection = false
					}
				}
			}).catch(err=>{
				_this.isCollection = false
				if(collectType != '1'){
					toastError(err.data.message || '收藏失败',500);
					
				}else{
					toastError(err.data.message || '取消收藏失败',500);
				}
			})
		},
		// 收藏点击埋点
		collectionEvent(item) {
			let action_type = '31';
			let page_id = this.properties.pageid + '';
			// 如果没有 page_id 就不发送埋点数据
			if (!page_id) {
				return false
			}
			if (item.isCollect == 1) {
				action_type = '33';
			}
			getApp().api.behaviorEvent({
				page_id: page_id,
				action_type: action_type || '',
				type: '1', // type：1-列表，2-详情
				play_plan_id: item.id || '',
				play_plan_type: '0', 	//0927新增 官方攻略列表收藏  0-游玩攻略
				// play_plan_name: item.showName,		//0927暂时弃用
				travel_city_id: item.cityEntityId || '',
				travels_type_id: item.classificationId || '',
				// travels_type: item.classificationId,		//0927暂时弃用
			});
		},

		searchScrollY(){
			console.log("gen")
			this.triggerEvent("pgcScroll")
		},
		longcli(e) {
			  console.log(e['currentTarget']['dataset']['item'])
				console.log('长按')
				wx.showActionSheet({
					itemList: ['删除','编辑'],
					success: (res)=> {
						console.log(res.tapIndex)
						if (res.tapIndex==1) {
							// 拍照
							console.log('编辑')
						} else if (res.tapIndex==0) {
							console.log('删除')
							this.triggerEvent("delete", e['currentTarget']['dataset']['item']) 
						}
					},
					fail: function(res) {
						console.log(res.errMsg)
					}
				})
		},
	}
})
