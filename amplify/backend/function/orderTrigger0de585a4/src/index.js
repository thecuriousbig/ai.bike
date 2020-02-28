/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */ // eslint-disable-next-line
let environment = process.env.ENV;
let region = process.env.REGION;

let AWS = require("aws-sdk");
let dynamodb = new AWS.DynamoDB.DocumentClient({ region });

let tableName = "user";
if (environment && environment !== "NONE") {
    tableName = tableName + "-" + environment;
}

exports.handler = function(event, context, callback) {
    let username;
    let orderid;
    event.Records.forEach(record => {
        username = record.dynamodb.Keys.user.S;
        orderid = record.dynamodb.Keys.id.S;
    });
    console.log("username => ", username);
    console.log("orderid => ", orderid);

    let params = {
        TableName: tableName,
        Key: {
            name: username
        },
        UpdateExpression: "SET orders = list_append(orders, :i)",
        ExpressionAttributeValues: {
            ":i": [orderid]
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("update item params: ", params);
    // GET the user data from dynamodb user-develop table
    dynamodb.update(params, (err, data) => {
        if (err) {
            console.error(
                "Unable to update item. Error JSON:",
                JSON.stringify(err, null, 2)
            );
            callback(err, "Unable to update item.")
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, data);
        }
    });
};
