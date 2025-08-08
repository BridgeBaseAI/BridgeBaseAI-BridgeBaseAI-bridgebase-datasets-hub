export default function handler(req: any, res: any) {
  return res.json({ 
    status: 'working',
    message: 'API is working correctly!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}