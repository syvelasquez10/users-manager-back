const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    const { taskId } = event.pathParameters;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body:  JSON.stringify(await deleteTask(client, taskId)),
            };
            client.close();
            resolve(response);
        });
    });
};

async function deleteTask(client, taskId) {
    let responseValue = await client.db(process.env.dbName).collection('tasks').deleteOne({ '_id': ObjectId(taskId) });
    return responseValue;
}