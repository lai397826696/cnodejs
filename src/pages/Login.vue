<template>
	<div class="pd10 pds10 loginPage">
		<div class="loginbox">
			<label>请输入你的Token</label>
			<div class="pd10 mgs10 line-b textbox">
				<input v-model="token" type="text" name="text" placeholder="Token" class="text" />
			</div>
		</div>
		<p class="mgt10">请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录</p>
		<button type="button" class="btn-sign" @click="signfn">登录</button>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			token: '595447be-4e58-4ebb-9fc2-8057979109d4'
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('footnavshowfn', { show: false })
			vm.$store.commit('returnshowfn', { show: true })
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('footnavshowfn', { show: true })
		this.$store.commit('returnshowfn', { show: false })
		next();
	},
	methods: {
		signfn() {
			if (!!this.token) {
				this.tokenHttp();
			} else {
				alert("token值不能为空")
			}
		},
		tokenHttp() {
			// 验证token登录
			let _this = this;
			this.$http.post(_this.$api + '/accesstoken', {
				accesstoken: _this.token
			}).then(res => {
				// window.location.reload()
				// window.history.go(-1)
				if (!!res.data.success) {
					localStorage.setItem("isLogin", true);
					localStorage.setItem("userToken", _this.token);
					localStorage.setItem("userId", res.data.id);
					localStorage.setItem("userName", res.data.loginname);
					localStorage.setItem("userAvatar", res.data.avatar_url);
					// let info={
					// 	isLogin: true,
					// 	userToken: _this.token,
					// 	userId: res.data.id,
					// 	username: res.data.loginname,
					// 	useravatar: res.data.avatar_url
					// }
					// localStorage.setItem("userinfo",JSON.stringify(info))
					_this.goback()
					_this.userinfo(res.data.loginname);
					_this.token="";
					console.log("登录成功");
				}
			}).catch(err=>{
				console.log(err);
				alert("错误的token值")
			})
		},
		userinfo(name) {
			let _this = this;
			this.$http({
				url: _this.$api + "/user/" + name
			}).then(res => {
				console.log(res.data)
			})
		},
		goback(){
			this.$store.commit("login");
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="less" scoped>
.loginPage {
	background-color: #fff;
	font-size: .186667rem;
	.loginbox {
		label {
			font-size: .213333rem;
		}

		.text {
			display: block;
			width: 100%;
			height: .48rem;
			line-height: .48rem;
			font-size: .186667rem;
		}
	}
	.btn-sign {
		display: block;
		margin-top: .266667rem;
		width: 100%;
		height: .533333rem;
		line-height: .533333rem;
		font-size: .213333rem;
		color: #fff;
		background-color: #2196f3;
		-webkit-appearance: none;
		border-radius: 2px;
	}
}
</style>
