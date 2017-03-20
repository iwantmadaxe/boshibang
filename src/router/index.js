import Vue from 'vue';
import Router from 'vue-router';
import Register from '../views/register/register.vue'; // 注册页面
import Login from '../views/login/login.vue'; // 登陆页面
import Forget from '../views/login/forget.vue'; // 忘记密码页面
import Index from '../views/index/index.vue'; // 首页
import ServiceList from '../views/service/list.vue'; // 服务列表
import ServiceDetail from '../views/service/detail.vue'; // 服务详情
import Search from '../views/search/index.vue'; // 搜索
import OrderConfirm from '../views/order/order-confirm.vue'; // 确认订单页面
import OrderCreate from '../views/order/order-create.vue'; // 创建订单页面
import OrderList from '../views/order/order-list.vue'; // 订单列表页面
import OrderDetail from '../views/order/detail.vue'; // 订单详情页面
import OrderMine from '../views/order/order-mine.vue'; // 我的订单页面
import UserContactCreate from '../views/user-contact/user-contact-create.vue'; // 创建联系人页面
import Mine from '../views/mine/mine.vue'; // 我的页面
import MineInfo from '../views/mine/mine-info.vue'; // 个人信息页面
import MineAddress from '../views/user-contact/address-manage.vue'; // 地址管理页面
// import UserContactEdit from '../views/user-contact/user-contact-edit.vue'; // 编辑联系人页面

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: '登陆'
			}
		},
		{
			path: '/forget',
			name: 'Forget',
			component: Forget,
			meta: {
				title: '忘记密码'
			}
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			meta: {
				title: '首页'
			}
		},
		{
			path: '/serviceList/:category_no',
			name: 'ServiceList',
			component: ServiceList,
			meta: {
				title: '服务列表'
			}
		},
		{
			path: '/serviceDetail/:service_id',
			name: 'ServiceDetail',
			component: ServiceDetail,
			meta: {
				title: '服务详情'
			}
		},
		{
			path: '/search',
			name: 'Search',
			component: Search,
			meta: {
				title: '搜索'
			}
		},
		{
			path: '/order/:service_id/confirm',
			name: 'OrderConfirm',
			component: OrderConfirm,
			meta: {
				title: '确认订单'
			}
		},
		{
			path: '/order/create',
			name: 'OrderCreate',
			component: OrderCreate,
			meta: {
				title: '填写订单'
			}
		},
		{
			path: '/order/mine',
			name: 'OrderMine',
			component: OrderMine,
			meta: {
				title: '我的订单'
			}
		},
		{
			path: '/order/list',
			name: 'OrderList',
			component: OrderList,
			meta: {
				title: '订单列表'
			}
		},
		{
			path: '/order/:order_no',
			name: 'OrderDetail',
			component: OrderDetail,
			params: {
				order_no: null
			},
			meta: {
				title: '订单详情'
			}
		},
		{
			path: '/mine',
			name: 'Mine',
			component: Mine,
			meta: {
				title: '我的'
			}
		},
		{
			path: '/mine/info',
			name: 'MineInfo',
			component: MineInfo,
			meta: {
				title: '个人信息'
			}
		},
		{
			path: '/mine/address',
			name: 'MineAddress',
			component: MineAddress,
			meta: {
				title: '地址管理'
			}
		},
		{
			path: '/contact/create',
			name: 'UserContactCreate',
			component: UserContactCreate,
			query: {
				redirect: ''
			},
			meta: {
				title: '创建联系人'
			}
		},
		// {
		// 	path: '/contact/:contact_no/edit',
		// 	name: 'UserContactEdit',
		// 	component: UserContactEdit,
		// 	query: {
		// 		redirect: ''
		// 	},
		// 	params: {
		// 		contact_no: null
		// 	},
		// 	meta: {
		// 		title: '编辑联系人'
		// 	}
		// },
		{
			path: '*',
			redirect: {
				name: 'Index'
			}
		}
	]
});
