
const employees = function(id, name, phone, address,username,password,status){
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.address = address;
  this.status = status;

  this.username = username;
  this.password = password;
}
module.exports = employees;
