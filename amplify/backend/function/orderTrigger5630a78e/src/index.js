let region = process.env.REGION
let queueURL = process.env.QUEUE_URL

let aws = require('aws-sdk')

let sqs = new aws.SQS({
  apiVersion: '2012-11-05',
  region: region,
})

exports.handler = async (event, context, callback) => {
  try {
    
    const records = event.Records
    if (records[0].eventName !== 'INSERT') {
      console.log(`This function has nothing to do with ${records[0].eventName} events`)
      return null
    }
    
    let payload = Object.create({})
    records.forEach((record) => {
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
          StringValue: order.id
        },
        user: {
          DataType: 'String',
          StringValue: order.user
        },
        destination: {
          DataType: 'Number',
          StringValue: order.destination
        },
        vehicle: {
          DataType: 'String',
          StringValue: order.vehicle
        },
        status: {
          DataType: 'String',
          StringValue: order.status
        },
      },
      MessageBody: JSON.stringify(order),
      QueueUrl: queueURL,
    }

    const sendMessageStatus = await sqs.sendMessage(params).promise()
    console.log(`send message status: ${sendMessageStatus}`)
    return null
  } catch (error) {
    console.error(`send message error: ${error}`)
    throw new Error(error)
  }
}
