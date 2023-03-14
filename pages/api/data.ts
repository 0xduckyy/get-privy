import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/redis'

type ResponseData = {
  data: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body
  console.log(body.amount)
  redis.set("amountprivy", body.amount, "EX", 60);
  console.log(body.amount)
  redis.set("keyprivy", body.key, "EX", 60);
  console.log(body.key)

  // Both of these are required.
  if (!body.amount || !body.key) {
    return res.json({ data: 'First or last name not found' })
  }

  // Found the name.
  res.json({ data: `${body.amount} ${body.key}` })
}