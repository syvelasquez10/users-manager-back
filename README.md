# Users Manager Backend

This is the micro-services backend repository of the Users Manager fullstacktest click [HERE](https://github.com/syvelasquez10/users-manager-front) to go to the frontend repository.

API definition
-------------
The REST API was define using Swagger.
To see the documentation for the API click [HERE](https://app.swaggerhub.com/apis/syvelasquez10/users-manager-back-v3/1.0.0)

And API Gateway in AWS was created using that API definition.

Micro-Services 
-------------
The micro services are deploy on AWS lambda. Each lambda fucntion is trigger by an enpoint on API Gateway.
The code of each lambda function is the code on this repo.

Architecture
-------------
You can see the architecture of the project on the following diagram. There project has 3 parts primarly. A frontend created using React, a group of micro-services created on AWS Lambda using NodeJS, and a Mongo as a service database using the MongoDB Atlas clusters. The frontend consumes the micro-services through an AWS API Gateway, the API was defined using Swagger. You can find the API definition [HERE](https://app.swaggerhub.com/apis/syvelasquez10/users-manager-back/1.0.0). The API Gateway enpoints trigger a Lambda function that connects to the Mongo database to optain, store, update or delete the information neeed.

![Architecture Diagram](https://raw.githubusercontent.com/syvelasquez10/users-manager-front/main/architectureDiagram.png "Architecture Diagram")
