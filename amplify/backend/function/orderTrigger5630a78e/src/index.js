let region = process.env.REGION
let queueURL = process.env.QUEUE_URL

let aws = require('aws-sdk')

let sqs = new aws.SQS({
  apiVersion: '2012-11-05',
  region: region,
})

exports.handler = async (event, context, callback) => {
  try {
    let eventData = Object.crerate({})
    event.Records.forEach((record) => {
      payload = record.dynamodb.NewImage
    })

    let order = {
      id: eventData.id.S,
      user: eventData.user.S,
      destination: eventData.destination.N,
      vehicle: eventData.vehicle.S,
      status: eventData.status.S,
    }

    let payload = {
      MessageAttributes: {
        id: {
          DataType: 'String',
        },
        user: {
          DataType: 'String',
        },
        destination: {
          DataType: 'String',
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

    const sendMessageStatus = await sqs.sendMessage(payload).promise()
    const message = `send message status: ${sendMessageStatus}`
    callback(null, message)
  } catch (error) {
    const message = `send message error: ${error}`
    context.done(message)
  }
}
