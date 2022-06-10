const mysql = require('mysql2/promise')

async function connect() {
    if (global.connection && global.connection.state !== "disconected") {
        return global.connection
    }
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "CRUD",
        password: "123456"
    })

    console.log('Conectado :)');
    global.connection = connection
    return global.connection
}

console.log();
console.log("Criando Tabela de Pedidos");
async function insertTablePedido() {
    const conn = await connect();
    await conn.query(`CREATE TABLE Pedidos ( 
        ped_id INT NOT NULL AUTO_INCREMENT,
        ped_nome VARCHAR(100),
        ped_preco FLOAT(10,2),
        PRIMARY KEY (ped_id) 
        )`)
}

console.log();
console.log("Criando Tabela de Clientes");
async function insertTablesCliente() {
    const conn = await connect();
    await conn.query(`CREATE TABLE Clientes ( 
        cli_id INT NOT NULL AUTO_INCREMENT, 
        cli_nome VARCHAR(100),
        fk_ped_id INT NOT NULL, 
        PRIMARY KEY (cli_id),
        KEY fk_ped_id (fk_ped_id),
        CONSTRAINT fk_ped_id FOREIGN KEY (fk_ped_id) REFERENCES pedidos (ped_id)
        )`)
}

async function populationTabelPedido(values) {
    const conn = await connect();
    const insertValues = `INSERT INTO pedidos(ped_id, ped_nome, ped_preco) VALUES (?,?,?);`
    const value = [values.ped_id, values.ped_nome, values.ped_preco]
    return await conn.query(insertValues, value)
}

async function populationTableCliente(values) {
    const conn = await connect();
    const insertValues = `INSERT INTO clientes(cli_id, cli_nome, fk_ped_id ) VALUES (?,?,?)`
    const value = [values.cli_id, values.cli_nome, values.fk_ped_id]
    return await conn.query(insertValues, value)
}

async function updateCliente(cli_id, value) {
    const conn = await connect();
    const updateValues = `UPDATE clientes SET cli_nome =? WHERE cli_id =?`;
    const values = [value.cli_nome, cli_id]
    return await conn.query(updateValues, values)
}

async function deleteCliente(cli_id) {
    const conn = await connect();
    const updateValues = `DELETE FROM clientes WHERE cliente_id =?`;
    const values = [cli_id]
    return await conn.query(updateValues, values)
}

async function selectClientes(){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM clientes`)
    return rows
}

module.exports = {
    insertTablePedido,
    insertTablesCliente,
    populationTabelPedido,
    populationTableCliente,
    updateCliente,
    deleteCliente,
    selectClientes
}