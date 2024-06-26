import { LiveKitConfig } from '@/lib/livekit'
import { AccessToken } from 'livekit-server-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const room = req.query.room as string
  const username = req.query.username as string
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Invalid method' })
  } else if (!room) {
    return res.status(400).json({ error: 'Missing "room" query parameter' })
  } else if (!username) {
    return res.status(400).json({ error: 'Missing "username" query parameter' })
  }

  const apiKey = LiveKitConfig.apiKey
  const apiSecret = LiveKitConfig.secret
  const wsUrl = LiveKitConfig.url

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username })

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })
  res.status(200).json({ token: await at.toJwt() })
}
