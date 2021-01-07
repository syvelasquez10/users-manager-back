const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

let cachedDb = null;
exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    const { userId } = event.pathParameters;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(await findAllUsers(client, userId)),
            };
            client.close();
            resolve(response);
        });
    });
};

async function findAllUsers(client, userId) {
    let tasks = await client.db(process.env.dbName).collection('tasks').find({"user_id":ObjectId(userId)}).toArray();
    tasks = tasks.map(task => {
        task['id'] = task['_id'];
        delete task['_id'];
        return task;
    });
    return tasks;
}