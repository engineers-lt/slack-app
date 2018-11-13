import { WebClient } from '@slack/client'

const eventResponses = {
  'reaction_added': async (event, client) => {
    const channel = await client.channels.info({
      channel: event.item.channel
    }).then(res => res.channel)

    if (channel.is_private) { return null }

    return client.chat.postMessage({
      channel: 'sandbox',
      text: `reaction_added: ${event.reaction}
channel: <#${event.item.channel}>`,
    })
  }
}

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && eventResponses[slackEvent.type]) {
    const webClient = new WebClient(process.env.SLACK_TOKEN)
    await eventResponses[slackEvent.type](slackEvent, webClient)
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
