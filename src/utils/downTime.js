/**
* 倒计时计时器
*/
const downTime = function (time, obj) {
	let timeInterval;
	if (time) {
		timeInterval = setInterval(function () {
			if (time > 0) {
				time--;
				obj.time = time;
			} else {
				clearInterval(timeInterval);
			}
		}, 1000);
	}
	return timeInterval;
};

const dropTime = function (time) {
	clearInterval(time);
};

export { downTime, dropTime };
