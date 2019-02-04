const { WebClient } = require('@slack/client')
const qs = require('qs')

exports.handler = async (event, context, callback) => {
  const query = qs.parse(event.body)
  console.log(query)

  const [command, ...args] = query.text.split(' ')

  let response = {
    text: "Command is not found. usage: /kotori channels"
  }

  if (!command) {
    response = {
      text: "Command is not found. usage: /kotori channels"
    }
  }

  if (command === 'channels') {
    const webClient = new WebClient(process.env.SLACK_TOKEN)
    const result = await webClient.channels.list()
    response = {
      text: result.channels.map(c => c.name).join('\n')
    }
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}