const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event) => {
    return new Promise((resolve)=>{
 	    let body = JSON.parse(event.body);
 	    const { userId } = event.pathParameters;
    	body.id = userId;
        const uri = `mongodb+srv://${process.env.user}:${process.env.password}@${process.env.cluster}/${process.env.dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(await updateUser(client, body)),
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

async function updateUser(client, body) {
    let valueCreated = await client.db(process.env.dbName).collection('users').updateOne({ '_id': body.id },{$set:{"name":body.name}});
    return body;
}