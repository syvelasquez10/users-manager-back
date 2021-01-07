const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    let body = JSON.parse(event.body);
 	    const { taskId } = event.pathParameters;
    	body.id = taskId;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(await updateTask(client, body)),
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
            };
            client.close();
            resolve(response);
        });
    });
};

async function updateTask(client, body) {
    let valueCreated = await client.db(process.env.dbName).collection('tasks').updateOne({ '_id': ObjectId(body.id) },{$set:{"description":body.description, "state": body.state, "user_id": body.user_id}});
    return body;
}