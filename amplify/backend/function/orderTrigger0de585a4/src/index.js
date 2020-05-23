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
    const records = event.Records
    
    if (records[0].eventName !== 'INSERT') {
      console.log(`This function has nothing to do with ${records[0].eventName} event`)
      return null
    }
    
    records.forEach((record) => {
      payload = record.dynamodb.Keys
    })
    
    let expression = 'SET orders = list_append(orders, :i)'
    let params = {
      TableName: tableName,
      Key: {
        name: payload.user.S,
      },
      UpdateExpression: expression,
      ExpressionAttributeValues: {
        ':i': [payload.id.S],
      },
      ReturnValues: 'UPDATED_NEW',
    }

    // GET the user data from dynamodb user-develop table
    const updateStatus = await dynamodb.update(params).promise()
    console.log(`update user table status: ${updateStatus}`)
    return null
  } catch (error) {
    console.error(`update user table error: ${error}`)
    throw new Error(error)
  }
}
