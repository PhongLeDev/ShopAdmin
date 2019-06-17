var order = function (id, customer_id,customer_name, status, sum_money, create_at, address,phone) {
  this.id = id;
  this.customer_id = customer_id;
  this.customer_name = customer_name;
  this.status = status;
  this.sum_money = sum_money;
  this.create_at = create_at;
  this.address = address;
  this.phone = phone;
}
module.exports = order;