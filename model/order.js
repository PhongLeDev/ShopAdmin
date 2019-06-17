var order = function (id, address,customerName, sumMoney, status, create) {
  this.id = id;
  this.address = address;
  this.customerName = customerName;
  this.sumMoney = sumMoney;
  this.status = status;
  this.create = create;
}
module.exports = order;