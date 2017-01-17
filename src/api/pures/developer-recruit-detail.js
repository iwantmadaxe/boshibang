/**
* 开发商管理端招募详情页的返回参数
*/
import { line2br } from '../../utils/fixtools.js';
let backInfo = {
	id: null,
	companyId: null,
	title: '',
	providerMoney: '',
	createdAt: '',
	deadline: '',
	view: '',
	providerService: '',
	providerProject: '',
	providerOther: '',
	addressRange: '',
	serviceAddress: '',
	apply: [],
	range: '',
	status: null,
	chosen: [],
	allDisabledStatus: false
};

function pureDeveloperRecruitDetail (info) {
	let allDisabledStatus = false;
	if (Number(info.status) === 2 || Number(info.status) === 3) {
		allDisabledStatus = true;
	}
	let tplApply = info.apply.map(function (item) {
		let tpl = {
			id: null,
			status: 0,
			createdAt: '',
			companyId: null,
			companyName: '',
			username: '',
			logo: '',
			companyAddress: '',
			category: '',
			option: {
				label: '',
				value: null,
				disabled: true
			}
		};
		let option = {
			label: '申请人:' + item.company.username,
			value: item.id,
			disabled: allDisabledStatus
		};
		if (Number(item.status) === 2) {
			backInfo.chosen.push(item.id);
		}
		tpl.id = item.id;
		tpl.status = Number(item.status);
		tpl.createdAt = item.created_at;
		tpl.companyId = item.company.company_id;
		tpl.companyName = item.company.company_name;
		tpl.username = item.company.username;
		tpl.logo = item.company.logo;
		tpl.companyAddress = item.company.company_address;
		tpl.category = item.company.category;
		tpl.option = option;
		return tpl;
	});
	backInfo.id = info.id;
	backInfo.companyId = info.company_id;
	backInfo.title = info.title;
	backInfo.providerMoney = info.provider_money;
	backInfo.createdAt = info.created_at.split(' ')[0];
	backInfo.deadline = info.deadline.split(' ')[0];
	backInfo.view = info.view;
	backInfo.providerService = info.provider_service;
	backInfo.providerProject = info.provider_project;
	backInfo.providerOther = line2br(info.provider_other);
	backInfo.addressRange = info.address1;
	backInfo.serviceAddress = info.address2;
	backInfo.range = info.range;
	backInfo.status = Number(info.status);
	backInfo.allDisabledStatus = allDisabledStatus;
	backInfo.apply = tplApply;
	return backInfo;
}

export default pureDeveloperRecruitDetail;
