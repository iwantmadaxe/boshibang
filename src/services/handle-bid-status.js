/**
 * 处理中标状态
 * params Array apply, Number bidStatus
 * return Object {enroll: [object], inBid: [object], winBid: [object], loseBid: [object]}
 * 标状态(bidStatus，下同) 1=>'报名中' 2=>'入围' 3=>'招标完成'
 * 申请标的企业状态(applyStatus，下同) 1=>'报名' 2=>'入围' 3=>'落选' 4=>'中标'
 * 当bidStatus为1，applyStatus为1放入`报名数组`，applyStatus为3放入`落选数组`
 * 当bidStatus为2，applyStatus为1、3的实际应该调整到3且放入`落选数组`，applyStatus为2放入`入围数组`
 * 当bidStatus为3，applyStatus为1、2、3的实际应该调整到3且放入`落选数组`，applyStatus为4放入`中标数组`
 * 其余均为数据错误
 */
export default function handleBidStatus (apply, bidStatus) {
	let enroll = [];    // 报名数组
	let inBid = [];    // 入围数组
	let winBid = [];    // 中标数组
	let loseBid = [];    // 落选数组
	for (let tplApply of apply) {
		if (bidStatus === 1) {
			// 报名中处理
			if (tplApply.applyStatus === 1) {
				enroll.push(tplApply);
			} else if (tplApply.applyStatus === 3) {
				loseBid.push(tplApply);
			}
		} else if (bidStatus === 2) {
			// 入围处理
			if (tplApply.applyStatus === 1 || tplApply.applyStatus === 3) {
				loseBid.push(tplApply);
			} else if (tplApply.applyStatus === 2) {
				inBid.push(tplApply);
			}
		} else if (bidStatus === 3) {
			// 招标完成处理
			if (tplApply.applyStatus === 1 || tplApply.applyStatus === 2 || tplApply.applyStatus === 3) {
				loseBid.push(tplApply);
			} else if (tplApply.applyStatus === 4) {
				winBid.push(tplApply);
			}
		}
	}
	return {
		enroll,
		inBid,
		winBid,
		loseBid
	};
};
