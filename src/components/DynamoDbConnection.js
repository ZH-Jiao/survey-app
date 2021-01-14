var AWS = require('aws-sdk');

export default class AWSConnection {
    constructor() {

        var myCredentials = new AWS.Credentials();
        myCredentials.accessKeyId = 'AKIAVUHHWUZGIL3XHTUD';
        myCredentials.secretAccessKey = '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';

        var myConfig = new AWS.Config({
            credentials: myCredentials,
            region: "us-east-1",
        })


        this.docClient = new AWS.DynamoDB.DocumentClient();
        AWS.config.update(myConfig);
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