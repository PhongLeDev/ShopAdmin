const product = function(id, name, price, producer, description, quantity){
  this.id = id;
  this.name = name;
  this.price = price;
  this.producer = producer;
  this.description=  description;
  this.quantity = quantity;
}
module.exports = product;
