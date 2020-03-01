let environment = process.env.ENV;
let region = process.env.REGION;

let AWS = require("aws-sdk");
let sns = new AWS.SNS();
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
    Subject: `order by: ${username}`,
    Message: message,
    TopicArn: `arn:aws:sns:${region}:377416533826:order`
  }
  console.log('sns params: ', params);
  // sns.publish(params, context.done)
};
