import pureLogin from './login.js';    // 登录返回处理
import pureVerifyPhone from './verify-phone.js';    // 验证手机号返回处理
import pureCode from './sms.js';    // 验证码返回处理
import pureRegister from './register.js';    // 验证码返回处理
import pureAllList from './allList.js';    // 所有列表返回处理
import pureRecruitDetail from './recruit-detail.js';    // 招募详情
import pureCompanyLatestStatus from './company-latest-status.js';    // 企业页状态查询
import pureCompanyLatestRecruit from './company-latest-recruit.js';    // 本企业招募
import pureCompanyLatestBid from './company-latest-bid.js';    // 本企业招标
import pureBidDetail from './bid-detail.js';    // 本企业招标
import pureDemondList from './demond-list.js';    // 找需求列表返回处理
import pureSupplyList from './supply-list.js';    // 找供应列表返回处理
import pureWinBidList from './win-bid-list.js';    // 本企业中标列表返回处理
import pureCompanyLatestProject from './company-latest-project.js';    // 本企业最新项目信息返回处理
import pureCompanyRecord from './company-record.js';    // 供应商详情页返回处理
import pureAddressList from './address.js';    // 地址页返回处理
import pureDeveloperRecruitList from './developer-recruit-list.js';    // 企业招募列表(管理端)返回处理
import pureDeveloperRecruitDetail from './developer-recruit-detail.js';    // 企业招募详情(管理平台)返回处理
import pureDeveloperSupplierList from './developer-supplier-list.js';    // 开发商平台供应商列表(管理平台)返回处理
import pureDeveloperApplyList from './developer-apply-list.js';    // 开发商平台供应商申请列表返回处理
import pureDeveloperBidList from './developer-bid-list.js';    // 企业招标列表(管理端)返回处理
import pureDeveloperBidDetail from './developer-bid-detail.js';    // 企业招标详情(管理端)返回处理
import pureDeveloperBidEnroll from './developer-bid-enroll.js';    // 企业招标详情入围(管理端)返回处理
import pureMyRecruitList from './participate-recruit-list.js';    // 供应商管理平台我参与招募列表(管理端)返回处理
import pureMyBidList from './participate-bid-list.js';    // 供应商管理平台我参与招标列表(管理端)返回处理
import pureAttentionList from './attention.js';    // 关注列表的返回参数
import pureBidInviteList from './bid-invite-list.js';    // 企业邀请招标列表(管理端)返回处理

export {
	pureLogin,
	pureVerifyPhone,
	pureCode,
	pureRegister,
	pureAllList,
	pureRecruitDetail,
	pureCompanyLatestStatus,
	pureCompanyLatestRecruit,
	pureCompanyLatestBid,
	pureBidDetail,
	pureDemondList,
	pureSupplyList,
	pureWinBidList,
	pureCompanyLatestProject,
	pureCompanyRecord,
	pureAddressList,
	pureDeveloperRecruitList,
	pureDeveloperRecruitDetail,
	pureDeveloperSupplierList,
	pureDeveloperApplyList,
	pureDeveloperBidList,
	pureDeveloperBidDetail,
	pureDeveloperBidEnroll,
	pureMyRecruitList,
	pureMyBidList,
	pureAttentionList,
	pureBidInviteList
};
