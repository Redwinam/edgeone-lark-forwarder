import { createHmac } from 'node:crypto'

export const signLarkRequest = (secret: string, timestamp: number) => {
  // According to the documentation provided:
  // The string to sign is constructed as: timestamp + "\n" + secret
  // This string is used as the HMAC KEY.
  // The message to be signed is an empty byte array (or empty string).
  const stringToSign = `${timestamp}\n${secret}`
  
  const hmac = createHmac('sha256', stringToSign)
  hmac.update('') // Empty message
  return hmac.digest('base64')
}

export const sendLarkMessage = async (webhookUrl: string, secret: string, content: any) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const sign = signLarkRequest(secret, timestamp)

  const body = {
    timestamp: timestamp.toString(),
    sign: sign,
    ...content
  }

  try {
    const response = await $fetch(webhookUrl, {
      method: 'POST',
      body: body
    })
    return response
  } catch (error) {
    console.error('Failed to send Lark message:', error)
    throw error
  }
}
