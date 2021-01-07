const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    const { userId } = event.pathParameters;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body:  JSON.stringify(await deleteUser(client, userId)),
            };
            client.close();
            resolve(response);
        });
    });
};

async function deleteUser(client, userId) {
    let responseValue = await client.db(process.env.dbName).collection('users').deleteOne({ '_id': ObjectId(userId) });
    return responseValue['acknowledged'];
}