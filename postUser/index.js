
const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    let body = event;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: await saveUser(client, body),
            };
            resolve(response);
        });
    });
};
async function saveUser(client, body) {
    const valueCreated = await client.db(process.env.dbName).collection('users').insertOne({"name":body.name});
    let user = valueCreated.ops[0];
    user['id'] = user['_id'];
    delete user['_id'];
    return user;
}