import Bid from './views/bid/bid.vue';
import Login from './views/auth/login';    // 登录页面
import Home from './views/home/home.vue';    // 首页
import Forget from './views/auth/forget.vue';    // 忘记密码
import Search from './views/search/search.vue';
import BidList from './views/bid/bid-list.vue';
import Supply from './views/supply/supply.vue';    // 供应商详情
import Demond from './views/demond/demond.vue';    // 开发商详情
import Register from './views/auth/register.vue';    // 注册页面
import RegisterOverSea from './views/auth/register-oversea.vue';    // 海外注册页面
import RegisterForeign from './views/auth/register-foreign.vue';    // 外资注册页面
import RegisterDomestic from './views/auth/register-domestic.vue';    // 内资注册页面
import RegisterFta from './views/auth/register-fta.vue';    // 自贸区注册页面
import Recruit from './views/recruit/recruit.vue';
import Supplier from './views/supplier/supplier.vue';
import MyBid from './views/supplier/my-bid/my-bid.vue';
import SupplyList from './views/supply/supply-list.vue';
import DemondList from './views/demond/demond-list.vue';
import Developer from './views/developer/developer.vue';
import WaitApply from './views/wait-apply/wait-apply.vue';    // 待报名
import MyNews from './views/share-template/my/my-news.vue';    // 我的消息
import RecruitList from './views/recruit/recruit-list.vue';    // 招募列表
import ChangePassword from './views/auth/change-password.vue';    // 修改密码
import InviteMe from './views/supplier/invite-me/invite-me.vue';    // 邀请我的招标
import BidManage from './views/developer/bid-manage/bid-manage.vue';
import Identification from './views/identification/identification.vue';
import BidManageList from './views/developer/bid-manage/bid-manage-list.vue';
import WinBidRecord from './views/supplier/win-bid-record/win-bid-record.vue';    // 中标业绩
import WatchSupplier from './views/developer/watch-supplier/watch-supplier.vue';    // 我关注的供应方
import RecruitManage from './views/developer/recruit-manage/recruit-manage.vue';
import ParticipateBid from './views/supplier/participate-bid/participate-bid.vue';
import WatchDeveloper from './views/supplier/watch-developer/watch-developer.vue';    // 我关注的需求方
import RecruitManageList from './views/developer/recruit-manage/recruit-manage-list.vue';
import SupplierManageList from './views/developer/supplier-manage/supplier-manage-list.vue';
import ParticipateRecruit from './views/supplier/participate-recruit/participate-recruit.vue';    // 待报名页面

const route = {
	'/': {
		component: Home,
		title: '首页'
	},
	'/login': {
		component: Login,
		name: 'Login',
		title: '登录'
	},
	'/register': {
		component: Register,
		name: 'Register',
		title: '注册'
	},
	'/register-oversea': {
		component: RegisterOverSea,
		name: 'RegisterOverSea',
		title: '海外注册'
	},
	'/register-foreign': {
		component: RegisterForeign,
		name: 'RegisterForeign',
		title: '外资注册'
	},
	'/register-domestic': {
		component: RegisterDomestic,
		name: 'RegisterDomestic',
		title: '内资注册'
	},
	'/register-fta': {
		component: RegisterFta,
		name: 'RegisterFta',
		title: '自贸区注册'
	},
	'/forget': {
		component: Forget,
		name: 'Forget',
		title: '忘记密码'
	},
	'/change-password': {
		component: ChangePassword,
		name: 'ChangePassword',
		title: '修改密码'
	},
	'/home': {
		component: Home,
		name: 'Home',
		title: '首页'
	},
	'/search': {
		component: Search,
		name: 'Search',
		title: '搜索'
	},
	'/identification': {
		component: Identification,
		name: 'Identification',
		title: '认证'
	},
	'/recruit-list': {
		component: RecruitList,
		name: 'RecruitList',
		title: '招募列表'
	},
	'/recruit/:recruit_no': {
		component: Recruit,
		name: 'Recruit',
		title: '招募详情'
	},
	'/bid-list': {
		component: BidList,
		name: 'BidList',
		title: '招标列表'
	},
	'/bid/:bid_no': {
		component: Bid,
		name: 'Bid',
		title: '招标详情'
	},
	'/demond-list': {
		component: DemondList,
		name: 'DemondList',
		title: '找需求'
	},
	'/demond/:demond_no': {
		component: Demond,
		name: 'Demond',
		title: '企业详情'
	},
	'/supply-list': {
		component: SupplyList,
		name: 'SupplyList',
		title: '找供应'
	},
	'/supply/:supply_no': {
		component: Supply,
		name: 'Supply',
		title: '供应商详情'
	},
	'/wait-apply': {
		component: WaitApply,
		name: 'WaitApply',
		title: '待报名'
	},
	'/developer': {
		component: Developer,
		name: 'Developer',
		title: '我的'
	},
	'/recruit-manage-list': {
		component: RecruitManageList,
		name: 'RecruitManageList',
		title: '招募管理'
	},
	'/recruit-manage/:recruit_no': {
		component: RecruitManage,
		name: 'RecruitManage',
		title: '招募管理详情'
	},
	'/bid-manage-list': {
		component: BidManageList,
		name: 'BidManageList',
		title: '招标管理'
	},
	'/bid-manage/:bid_no': {
		component: BidManage,
		name: 'BidManage',
		title: '招标管理详情'
	},
	'supplier-manage-list': {
		component: SupplierManageList,
		name: 'SupplierManageList',
		title: '供应商管理'
	},
	'/watch-supplier': {
		component: WatchSupplier,
		name: 'WatchSupplier',
		title: '我关注的供应方'
	},
	'/supplier': {
		component: Supplier,
		name: 'Supplier',
		title: '我的'
	},
	'/participate-bid': {
		component: ParticipateBid,
		name: 'ParticipateBid',
		title: '参与的招标'
	},
	'/participate-recruit': {
		component: ParticipateRecruit,
		name: 'ParticipateRecruit',
		title: '参与的招募'
	},
	'/my-bid': {
		component: MyBid,
		name: 'MyBid',
		title: '我的招标'
	},
	'/invite-me': {
		component: InviteMe,
		name: 'InviteMe',
		title: '邀请我的招标'
	},
	'/watch-developer': {
		component: WatchDeveloper,
		name: 'WatchDeveloper',
		title: '我关注的需求方'
	},
	'/win-bid-record': {
		component: WinBidRecord,
		name: 'WinBidRecord',
		title: '中标业绩'
	},
	'/my-news': {
		component: MyNews,
		name: 'MyNews',
		title: '我的消息'
	}
};

export default route;
