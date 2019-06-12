
const employees = function(id, name, address, phone,username,password){
  this.id = id;
  this.name = name;
  this.address = address;
  this.phone = phone;
  this.username = username;
  this.password = password;
}
module.exports = employees;
