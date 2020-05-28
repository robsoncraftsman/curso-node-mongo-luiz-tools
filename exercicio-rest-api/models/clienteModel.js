var objectId = require("mongodb").ObjectId;

function findCliente(id, callback){
    global.conn.collection("clientes").findOne({_id: objectId(id)}, callback)
}

function findClientes(callback){
    global.conn.collection("clientes").find().toArray(callback)
}

function insertCliente(cliente, callback){
    global.conn.collection("clientes").insertOne(cliente, callback);
}

function updateCliente(id, cliente, callback){
    global.conn.collection("clientes").replaceOne({_id: objectId(id) }, cliente, callback);
}

function updateDadosCliente(id, cliente, callback){
    global.conn.collection("clientes").updateOne({_id: objectId(id) }, {$set: cliente}, callback);
}

function deleteCliente(id, callback){
    global.conn.collection("clientes").removeOne({_id: objectId(id) }, callback);
}

module.exports = { findCliente, findClientes, insertCliente, updateCliente, updateDadosCliente, deleteCliente }