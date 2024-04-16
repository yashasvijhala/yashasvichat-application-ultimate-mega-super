import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleServerUrl(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.send('Hello');
}
