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
