let environment = process.env.ENV
let region = process.env.REGION
let userTable = process.env.USER_TABLE

let aws = require('aws-sdk')

let dynamodb = new aws.DynamoDB.DocumentClient({ region })

let tableName = undefined
if (environment && environment !== 'NONE') {
  tableName = userTable + '-' + environment
}

exports.handler = async (event, context, callback) => {
  try {
    let payload = Object.create({})
    event.Records.forEach((record) => {
      payload = record.dynamodb.Keys
    })
    console.log('username => ', username)
    console.log('orderid => ', orderid)

    let params = {
      TableName: tableName,
      Key: {
        name: payload.user.S,
      },
      UpdateExpression: 'SET orders = list_append(orders, :i)',
      ExpressionAttributeValues: {
        ':i': [payload.id.S],
      },
      ReturnValues: 'UPDATED_NEW',
    }

    // GET the user data from dynamodb user-develop table
    const updateStatus = await dynamodb.update(params).promise()
    const message = `update user table status: ${updateStatus}`
    callback(null, message)
  } catch (error) {
    const message = `update user table error: ${error}`
    callback(message)
  }
}
