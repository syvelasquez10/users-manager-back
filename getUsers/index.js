
const MongoClient = require('mongodb').MongoClient;
let cachedDb = null;
exports.handler = async (event) => {
    return new Promise((resolve)=>{
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: await findAllUsers(client),
            };
            client.close();
            resolve(response);
        });
    });
};

async function findAllUsers(client) {
    let users = await client.db(process.env.dbName).collection('users').find({}).toArray();
    users = users.map(user => {
        user['id'] = user['_id'];
        delete user['_id'];
        return user;
    });
    return users;
}