/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
let region = process.env.REGION;

let AWS = require("aws-sdk");
AWS.config.update({ region })
let sqs = new AWS.SQS({apiVersion: '2012-11-05'});
let accountId = '377416533826'
let QUEUE_URL = `https://sqs.${region}.amazonaws.com/${accountId}/order.fifo`
// eslint-disable-next-line

exports.handler = function(event, context) {
  try {
    let username;
    let order;
    event.Records.forEach(record => {
      username = record.dynamodb.Keys.user.S;
      order = record.dynamodb.NewImage;
    })
    console.log("order: ", order);
  
    let orderData = {
      'username': username,
      'origin': order.origin,
      'destination': order.destination,
      'direction': order.direction,
      'distance': order.distance,
      'duration': order.duration
    }
    let sqsOrderData = {
      MessageAttributes: {
        "username": {
          DataType: "String",
          StringValue: orderData.username
        },
        "origin": {
          DataType: "String",
          StringValue: "origin"
        },
        "destination": {
          DataType: "String",
          StringValue: "destination"
        },
        "direction": {
          DataType: "String",
          StringValue: "direction"
        },
        "distance": {
          DataType: "String",
          StringValue: "distance"
        },
        "duration": {
          DataType: "String",
          StringValue: "duration"
        }
      },
      MessageBody: JSON.stringify(orderData),
      MessageDeduplicationId: username,
      MessageGroupId: "UserOrders",
      QueueUrl: QUEUE_URL
    }

    let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

    sendSqsMessage.then((data) => {
        console.log(`Order | SUCCESS: ${data.MessageId}`);
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
  } catch (error) {
    console.log('error try catch: ', error)
    context.done(null, '')
  }
};
