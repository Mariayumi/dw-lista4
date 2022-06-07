(async () => {
const db = require("./db");
console.log("Começou");

console.log("Insert into cliente");
const result = await db.insertCustomer({nome: "João", idade: "22", uf: "RJ"});
console.log(result);

console.log("Select * from cliente");
const clientes = await db.selectCustomers();
console.log(clientes);

console.log("Update cliente");
const result2 = await db.updateCustomer(1, {nome: "Maria", idade: "20", uf: "SP"});
console.log(result2);

console.log("Delete from cliente");
const result3 = await db.deleteCustomer(1);
console.log(result3);

})();
