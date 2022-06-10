const connect = require("./database/db")


connect.insertTablePedido();
connect.insertTablesCliente();

(async () => {
    console.log('Inserindo valores dentro de pedidos...');
    var insert = await connect.populationTabelPedido({ ped_id: 1, ped_nome: "Coca Cola", ped_preco: 2.50 })
    insert = await connect.populationTabelPedido({ ped_id: 2, ped_nome: "Coxinha", ped_preco: 3.50 })
    insert = await connect.populationTabelPedido({ ped_id: 3, ped_nome: "Bolo", ped_preco: 7.50 })
    insert = await connect.populationTabelPedido({ ped_id: 4, ped_nome: "Bombom", ped_preco: 1.50 })

    console.log();
    console.log('Inserindo valores dentro de clientes...');
    insert = await connect.populationTableCliente({ cli_id: 1, cli_nome: "Maria Clara", fk_ped_id: 1 })
    insert = await connect.populationTableCliente({ cli_id: 2, cli_nome: "Matheus Sakuragui", fk_ped_id: 2 })
    insert = await connect.populationTableCliente({ cli_id: 3, cli_nome: "Gizeli", fk_ped_id: 3 })
    insert = await connect.populationTableCliente({ cli_id: 4, cli_nome: "Rikio", fk_ped_id: 4 })

    console.log();
    console.log('Atualizando o Cliente');
    const update = await connect.updateCliente(4, { cli_nome: "Evora" })
    console.log(update);

    console.log();
    console.log('Deletando o Cliente');
    const remove = await connect.deleteCliente(4);
    console.log(remove);

    console.log();
    console.log('Selecionando todos os clientes: ');
    const clientes = await connect.selectClientes()
    console.log(clientes);
})();