export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  // Log incoming webhook for debugging
  console.log('Received Webhook:', JSON.stringify(body))

  if (!body || !body.eventType) {
    return { status: 'ignored', message: 'Invalid payload or missing eventType' }
  }

  const eventType = body.eventType
  let cardTitle = ''
  let cardElements = []
  let headerTemplate = 'blue' // blue, wathet, turquoise, green, yellow, orange, red, carmine, violet, purple, indigo, grey

  // Helper to create a field
  const createField = (key: string, value: string) => ({
    is_short: true,
    text: {
      tag: 'lark_md',
      content: `**${key}**\n${value}`
    }
  })

  switch (eventType) {
    case 'deployment.created':
      cardTitle = `🚀 (${body.projectName || '未知'}) 部署已创建`
      headerTemplate = 'blue'
      cardElements = [
        {
          tag: 'div',
          fields: [
            createField('分支', body.repoBranch || '未知'),
            createField('部署 ID', body.deploymentId || '未知'),
            createField('时间', body.timestamp || new Date().toISOString())
          ]
        },
        {
          tag: 'hr'
        },
        {
            tag: 'div',
            text: {
                tag: 'lark_md',
                content: `App ID: ${body.appId}\nProject ID: ${body.projectId}`
            }
        }
      ]
      break

    case 'deployment.succeeded':
    case 'deployment.success': // Assuming this might exist or for future use
      cardTitle = `✅ (${body.projectName || '未知'}) 部署成功`
      headerTemplate = 'green'
       cardElements = [
        {
          tag: 'div',
          fields: [
            createField('分支', body.repoBranch || '未知'),
            createField('部署 ID', body.deploymentId || '未知'),
            createField('项目 ID', body.projectId || '未知'),
            createField('时间', body.timestamp || new Date().toISOString())
          ]
        }
      ]
      break
      
    case 'deployment.failure':
    case 'deployment.failed': // Assuming this might exist
      cardTitle = `❌ (${body.projectName || '未知'}) 部署失败`
      headerTemplate = 'red'
       cardElements = [
        {
          tag: 'div',
          fields: [
            createField('分支', body.repoBranch || '未知'),
            createField('部署 ID', body.deploymentId || '未知'),
            createField('项目 ID', body.projectId || '未知'),
            createField('时间', body.timestamp || new Date().toISOString())
          ]
        }
      ]
      break

    case 'project.created':
      cardTitle = `📁 (${body.projectName || '未知'}) 项目已创建`
      headerTemplate = 'turquoise'
      cardElements = [
        {
          tag: 'div',
          fields: [
             createField('仓库地址', body.repoUrl || '未知')
          ]
        }
      ]
      break

    case 'domain.added':
      cardTitle = `🌐 (${body.projectName || '未知'}) 域名已添加`
      headerTemplate = 'violet'
      cardElements = [
        {
          tag: 'div',
          fields: [
             createField('域名', body.domainName || '未知')
          ]
        }
      ]
      break

    default:
      cardTitle = `🔔 EdgeOne 事件: ${eventType}`
      headerTemplate = 'grey'
      cardElements = [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `收到未知事件: ${eventType}\n\n\`\`\`json\n${JSON.stringify(body, null, 2)}\n\`\`\``
          }
        }
      ]
  }

  const card = {
    header: {
      template: headerTemplate,
      title: {
        tag: 'plain_text',
        content: cardTitle
      }
    },
    elements: cardElements
  }

  try {
    const result = await sendLarkMessage(config.larkWebhookUrl, config.larkSecret, {
      msg_type: 'interactive',
      card: card
    })
    return { status: 'success', larkResponse: result }
  } catch (error: any) {
    setResponseStatus(event, 500)
    return { status: 'error', message: error.message }
  }
})
