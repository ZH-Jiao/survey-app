var AWS = require('aws-sdk');

export default class AWSConnection {
    constructor() {

        var myCredentials = new AWS.Credentials();
        myCredentials.accessKeyId = 'AKIAVUHHWUZGGIL2ENFC';
        myCredentials.secretAccessKey = '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';

        var myConfig = new AWS.Config({
            credentials: myCredentials,
            region: "us-east-1",
        })

        var dynamodb = new AWS.DynamoDB(myConfig);
        this.docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
        // AWS.config.update(myConfig);
    }

    addItem(tableName, item) {
        /*
        var params = {
            TableName:table,
            Item:{
                "year": year,
                "title": title,
                "info":{
                    "plot": "Nothing happens at all.",
                    "rating": 0
                }
            }
        };
        */

        var params = {
            TableName: tableName,
            Item: item

        }
        this.docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        })
    }
}