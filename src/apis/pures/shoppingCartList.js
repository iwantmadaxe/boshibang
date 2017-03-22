function pureShoppingCartList (orders) {
	orders = orders.map(function (item) {
		let itemTpl = {};
		itemTpl.image = item.service_image;
		itemTpl.name = item.service_name;
		itemTpl.price = item.price;
		itemTpl.serviceNum = item.amount;
		itemTpl.id = item.id;
		itemTpl.choose = false;
		itemTpl.attributes = item.attribute;
		return itemTpl;
	});
	return orders;
}

export default pureShoppingCartList;
