//db.js
const mysql = require("mysql2/promise");
async function connect(){
    if(global.connection && global.connection.state !== "disconnected")
        return global.connection;

const connection = await mysql.createConnection({
    host: "localhost",
    user: "Mariana",
    password: "12345",
    database: "CRUD",
    port: 3306
    });

console.log("Conectado ao MySql!");
global.connection = connection;
return global.connection;
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM cliente;");
    return rows;
}

async function insertCustomer(costumer){
    const conn = await connect();
    const sql = 'Insert into cliente (nome, idade, uf) values (?, ?, ?);';
    const values = [costumer.nome, costumer.idade, costumer.uf];
    return await conn.query(sql, values);
}

async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'Update cliente set nome = ?, idade = ?, uf = ? where id = ?';
    const values = [customer.nome, customer.idade, customer.uf, id];
    return await conn.query(sql, values);
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'Delete from cliente where id = ?;';
    return await conn.query(sql, values);
}


module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer};