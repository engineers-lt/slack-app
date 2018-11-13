import { WebClient } from '@slack/client'

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && slackEvent.type === 'reaction_added') {
    const web = new WebClient(process.env.SLACK_TOKEN)
    const res = await web.chat.postMessage({
      channel: 'times_mottox2',
      text: `reaction_added: ${slackEvent.reaction}
channel: ${slackEvent.channel}
`,
    })
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
