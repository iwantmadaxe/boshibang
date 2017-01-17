/**
* 倒计时计时器
*/
const downTime = function (time, obj) {
	if (time) {
		let timeInterval = setInterval(function () {
			if (time > 0) {
				time--;
				obj.time = time;
			} else {
				clearInterval(timeInterval);
			}
		}, 1000);
	}
};
export default downTime;
