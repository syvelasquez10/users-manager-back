
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    let body = JSON.parse(event.body);
 	    const { userId } = event.pathParameters;
 	    body['user_id'] = ObjectId(userId);
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(await saveTask(client, body)),
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
            };
            resolve(response);
        });
    });
};
async function saveTask(client, body) {
    const valueCreated = await client.db(process.env.dbName).collection('tasks').insertOne(body);
    let task = valueCreated.ops[0];
    task['id'] = task['_id'];
    delete task['_id'];
    return task;
}