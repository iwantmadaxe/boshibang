/**
* 招募详情的返回参数
*/
let backInfo = {
	address1: '',
	address2: '',
	applied: null,
	createdAt: '',
	deadline: '',
	providerMoney: '',
	providerOther: '',
	providerProject: '',
	range: '',
	title: '',
	updatedAt: '',
	view: null,
	publish: {
		companyName: '',
		companyId: null,
		logo: '',
		recruitNum: null,
		bidNum: null,
		companyType: null
	}
};

function pureBidDetail (info) {
	backInfo.address1 = info.address1;
	backInfo.address2 = info.address2;
	backInfo.applied = Number(info.applied);
	backInfo.createdAt = info.created_at;
	backInfo.deadline = info.deadline;
	backInfo.providerMoney = info.provider_money;
	backInfo.providerOther = info.provider_other;
	backInfo.providerProject = info.provider_project;
	backInfo.range = info.range;
	backInfo.title = info.title;
	backInfo.updatedAt = info.updated_at;
	backInfo.view = Number(info.view);
	backInfo.publish.companyName = info.publish.company_name;
	backInfo.publish.companyId = Number(info.publish.company_id);
	backInfo.publish.logo = info.publish.logo;
	backInfo.publish.recruitNum = Number(info.publish.recruit_num);
	backInfo.publish.bidNum = Number(info.publish.bid_num);
	backInfo.publish.companyType = Number(info.info.company_type);
	return backInfo;
}

export default pureBidDetail;
