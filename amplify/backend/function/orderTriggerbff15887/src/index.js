let region = process.env.REGION;

let AWS = require("aws-sdk");
let sqs = AWS.SQS({region});
let QUEUE_URL = `arn:aws:sqs:${region}:377416533826:order.fifo`
// eslint-disable-next-line


exports.handler = function(event, context) {
  //TODO: publish the data to the topic that iot device subscribes.
  let username;
  let message;
  event.Records.forEach(record => {
    username = record.dynamodb.Keys.user.S;
    message = {
      username: username,
      order: record.dynamodb.NewImage
    }
  })
  console.log("username: ", username);

  let params = {
    MessageBody: message,
    QueueUrl: QUEUE_URL
  }
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('send message error: ', err)
      context.done('error', 'send message failed')
    } else {
      console.log('send message success: ', data)
      context.done(null, '')
    }
  })
};
