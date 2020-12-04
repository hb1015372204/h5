<template>
  <div class="container cont">
	<div class="lucky-wheel">
		<div class="wheel-main">
			<div class="wheel-pointer-box">
				<div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
			</div>
			<div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
				<div class="prize-list">
					<div class="prize-item" v-for="(item,index) in prize_list" :key="index">
						<div class="prize-pic" v-if="item.icon">
							<img :src="item.icon" />
						</div>
						<div class="prize-type">
							{{item.name}}</div>
					</div>
				</div>
			</div>
		</div>
		<p>今日还可抽奖{{userDrawNum}}次</p>
		<ul>
			<li v-for="(item, index) in histList" :key="index">
				<span>{{item.result}}</span>
				<span>{{item.createTime.substr(0, 10)}}</span>
			</li>
		</ul>
	</div>

  </div>
</template>

<script>
import API from '@/api/webH5API'
import { Dialog, Toast } from 'vant';
export default {
    data() {
			return {
				userDrawNum: '',// 是否有抽奖机会
				histList: [],
				// HavalTea：弗茶，HandsetRadio：手台，Headrest：头枕，BaseballCap：棒球帽，T-shirt：T恤，Intergral：积分,Thanks：谢谢参与
				prize_list: [{
						icon: '', //require("../../../../static/WX/img/wheel_big_5.png"), // 奖品图片
						count: 5, // 奖品级别
						type: 'HavalTea', // 奖品类型
						name: '弗茶', // 奖品名称
						isPrize: 1 // 该奖项是否为奖品
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_2.png"),
						count: 2,
						type: 'HandsetRadio', // 奖品类型
						name: '手台', // 奖品名称
						isPrize: 1
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_4.png"),
						count: 4,
						type: 'Headrest', // 奖品类型
						name: '头枕', // 奖品名称
						isPrize: 1
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_1.png"),
						count: 1,
						type: 'BaseballCap', // 奖品类型
						name: '棒球帽', // 奖品名称
						isPrize: 1
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_6.png"),
						count: 6,
						type: 'T-shirt', // 奖品类型
						name: 'T恤', // 奖品名称
						isPrize: 1
					},
					{
						count: 7,
						type: 'Thanks', // 奖品类型
						name: '谢谢参与', // 奖品名称
						isPrize: 0
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_3.png"),
						count: 3,
						type: 'Intergral', // 奖品类型
						name: '积分', // 奖品名称
						isPrize: 1
					},
					{
						icon: '', //require("../../../../static/WX/img/wheel_big_3.png"),
						count: 8,
						type: 'No', // 奖品类型
						name: "很遗憾",
						isPrize: 0
					}
				], //奖品列表
				val: 0,
				valindex: 0,
				hasPrize: false, //是否中奖
				start_rotating_degree: 0, //初始旋转角度
				rotate_angle: 150, //将要旋转的角度
				start_rotating_degree_pointer: 0, //指针初始旋转角度
				rotate_angle_pointer: 0, //指针将要旋转的度数
				rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
				rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
				click_flag: true, //是否可以旋转抽奖
				item: {}
			}
		},
		mounted() {
			this.getDogUserDetail();
			this.historyList();
		},
		methods: {
			// 获取抽奖机会
			async getDogUserDetail() {
				const res = await API.getDogUserDetail();
				if(res.errcode == '0') {
					this.userDrawNum = res.object.draw;
				}
			},
			// 抽奖
			async rotate_handle() {
				if(this.userDrawNum == '0') {
					Toast.fail('您的抽奖次数已用完');
					return;
				}
				const res = await API.dogDraw();
				if(res.errcode == '0') {
					let prize = res.object.prize;
					this.prize_list.filter(item=>{
						if(item.type==prize){
							this.val = item.count;
							this.rotating(); //开始旋转
						}
					})
				}else{
					Toast.fail(res.errmsg);
				}
			},
			// 抽奖记录
			async historyList() {
				const res = await API.drawHistory();
				if(res.errcode == '0') {
					this.histList = res.list;
				}
			},
			rotating(index) {
				if (!this.click_flag) return;
				var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
				var during_time = 5; // 默认为1s
				var random = Math.floor(Math.random() * 8);
				var result_index
				result_index = this.val
				if (this.val == 1) { // 这里多余可以不写
					result_index = 3
				} else if (this.val == 2) {
					result_index = 1
				} else if (this.val == 3) {
					result_index = 6
				} else if (this.val == 4) {
					result_index = 2
				} else if (this.val == 5) {
					result_index = 0
				} else if (this.val == 6) {
					result_index = 4
				} else if (this.val == 7) {
					result_index = 5
				} else if (this.val == 8) {
					result_index = 7
				}
				this.valindex = result_index // // 最终要旋转到哪一块
				var result_angle = [0, 314, 265, 220, 180, 135, 94, 48];//最终会旋转到下标的位置所需要的度数，从指针初始位置开始算度数，顺时针或逆时针
				// 5 2 4 1 6 7 3 8
				var rand_circle = 5; // 附加多转几圈，2-3
				this.click_flag = false; // 旋转结束前，不允许再次触发
				if (type == 0) {
					// 转动盘子
					var rotate_angle = this.start_rotating_degree + rand_circle * 360 + result_angle[result_index] - this.start_rotating_degree % 360;
					this.start_rotating_degree = rotate_angle;
					this.rotate_angle = "rotate(" + rotate_angle + "deg)";
					var that = this;
					// 旋转结束后，允许再次触发
					setTimeout(function() {
						that.click_flag = true;
						Dialog.alert({
							width: '6rem',
							message: `恭喜您获得${that.prize_list[that.valindex].name}`,
							theme: 'round-button',
							confirmButtonColor: '#ccc'
						});
						that.historyList();
					}, during_time * 1000 + 1500); // 延时，保证转盘转完
				} else {
				}
			}
		}
    
}
</script>

<style lang="scss" scoped>
  .cont{
    background-color: #f6f6f6;
  }
  .wheel-main {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.wheel-bg {
		width: 230px;
		height: 230px;
		background: url("../assets/timg.jpg") no-repeat center top;
		background-size: 100%;
		color: #fff;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		transition: transform 3s ease;
		transform: rotate(25deg); 
    div {
      text-align: center;
    }
	}
	.wheel-pointer-box {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 100;
		transform: translate(-50%, -60%);
	}
	.wheel-pointer {
		width: 50px;
		height: 55px;
		background: url("../assets/point.png") no-repeat ;
		background-size: 100%;
		transform-origin: center 60%;
	}
	.prize-list {
		width: 100%;
		height: 100%;
		position: relative;
    .prize-item {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .prize-item:first-child {
      top: 45px;
      left: 95px;
      transform: rotate(-90deg);
    }
	  .prize-item:nth-child(2) {
      top: 65px;
      left: 140px;
      transform: rotate(-40deg);
    }
    .prize-item:nth-child(3) {
      top: 110px;
      left: 160px;
      transform: rotate(359deg);
    }
    .prize-item:nth-child(4) {
      top: 155px;
      left: 145px;
      transform: rotate(403deg);
    }
    .prize-item:nth-child(5) {
      top: 170px;
      left: 95px;
      transform: rotate(90deg);
    }
    .prize-item:nth-child(6) {
      top: 150px;
      left: 45px;
      transform: rotate(-40deg);
    }
    .prize-item:nth-child(7) {
      top: 105px;
      left: 35px;
      transform: rotate(10deg);
    }
    // .prize-item:nth-child(7) img {
    //   width: 1rem;
    // }
    .prize-item:nth-child(8) {
      top: 65px;
      left: 55px;
      transform: rotate(40deg);
    }
  }
	.prize-pic img {
		width: .8rem;
	}
	.prize-count {
		font-size: .4rem;
	}
	.prize-type {
		font-size: 12px;
	}
</style>

