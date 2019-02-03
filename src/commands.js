const { WebClient } = require('@slack/client')
const qs = require('qs')

exports.handler = async (event, context, callback) => {
  const query = qs.parse(event.body)
  console.log(query)

  const response = {
    text: "text"
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}