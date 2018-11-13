exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && slackEvent.type === 'reaction_added') {
    console.log(JSON.stringify(slackEvnet, null, 4))
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
