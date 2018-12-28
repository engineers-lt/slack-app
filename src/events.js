import { WebClient } from '@slack/client'

const eventResponses = {
  'reaction_added': async (event, client) => {
    if (event.reaction !== 'esa') { return null }

    const res = await client.conversations.history({
      latest: event.item.ts,
      limit: 1,
      channel: event.item.channel,
      inclusive: true
    })
    const message = res.messages[0]

    return client.chat.postMessage({
      channel: 'sandbox',
      text: `esa_emoji_added: ${message}`,
    })
  },
  'emoji_changed': async (event, client) => {
    if (event.subtype !== "add") { return null }
    return client.chat.postMessage({
      channel: 'feed',
      text: `emoji_added: :${event.name}:`,
    })
  },
  'team_join': async (event, client) => {
    return client.chat.postMessage({
      channel: 'feed',
      text: `user_added: <@${event.user.display_name}>`,
    })
  },
  'channel_created': async (event, client) => {
    return client.chat.postMessage({
      channel: 'feed',
      text: `channel_added: <#${event.channel.id}>`,
    })
  },
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
