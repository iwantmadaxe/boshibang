function pureOrders (orders) {
	orders = orders.map(function (item) {
		let itemTpl = {};
		itemTpl.image = item.services[0].service_image;
		itemTpl.name = item.services[0].service_name;
		itemTpl.price = item.services[0].service_price;
		itemTpl.finalPrice = item.final_price;
		itemTpl.serviceNum = item.services[0].amount;
		itemTpl.status = item.status;
		itemTpl.id = item.id;
		itemTpl.status.code = 2;  //  测试用
		itemTpl.contactId = item.contact_id;
		itemTpl.orderTime = item.order_time;
		itemTpl.attributes = item.services[0].attribute.map(function (item2) {
			if (item2.key !== '服务地区') {
				item2.type = 1;
				item2.name = item2.key;
				item2.defaultValue = 1;
				item2.option = [{
					name: item2.value,
					id: 1
				}];
			} else if (item2.key === '服务地区') {
				item2.type = 2;
				item2.name = item2.key;
				item2.defaultValue = 1;
				item2.defaultPath = {
					province: {
						name: item2.value.province.name,
						code: item2.value.province.code
					},
					city: {
						name: item2.value.city.name,
						code: item2.value.city.code
					},
					district: {
						name: item2.value.district.name,
						code: item2.value.district.code
					}
				};
			}
			return item2;
		});
		return itemTpl;
	});
	return orders;
}

export default pureOrders;
