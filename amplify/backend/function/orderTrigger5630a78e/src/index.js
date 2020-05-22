let region = process.env.REGION
let queueURL = process.env.QUEUE_URL

let aws = require('aws-sdk')

let sqs = new aws.SQS({
  apiVersion: '2012-11-05',
  region: region,
})

exports.handler = async (event, context, callback) => {
  try {
    let payload = Object.create({})
    event.Records.forEach((record) => {
      payload = record.dynamodb.NewImage
    })

    let order = {
      id: payload.id.S,
      user: payload.user.S,
      destination: payload.destination.N,
      vehicle: payload.vehicle.S,
      status: payload.status.S,
    }

    let params = {
      MessageAttributes: {
        id: {
          DataType: 'String',
        },
        user: {
          DataType: 'String',
        },
        destination: {
          DataType: 'Number',
        },
        vehicle: {
          DataType: 'String',
        },
        status: {
          DataType: 'String',
        },
      },
      MessageBody: order,
      QueueUrl: queueURL,
    }

    const sendMessageStatus = await sqs.sendMessage(params).promise()
    const message = `send message status: ${sendMessageStatus}`
    callback(null, message)
  } catch (error) {
    const message = `send message error: ${error}`
    context.done(message)
  }
}
