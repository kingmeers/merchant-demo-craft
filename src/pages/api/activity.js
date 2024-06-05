import { v4 as uuidv4 } from 'uuid';  // Add this line to import uuidv4
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { agent_id, message, success } = req.body;

    if (!agent_id || !message || typeof success !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const timestamp = Date.now();
    const activity = { agent_id, message, success, timestamp };
    const filePath = path.join(process.cwd(), 'public', 'activity', `${uuidv4()}.json`);

    fs.writeFileSync(filePath, JSON.stringify(activity, null, 2));

    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    const { limit = 15 } = req.query;

    const activityDir = path.join(process.cwd(), 'public', 'activity');
    const files = fs.readdirSync(activityDir);

    const activities = files
      .map(file => {
        const content = fs.readFileSync(path.join(activityDir, file), 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, parseInt(limit, 10));

    return res.status(200).json(activities);
  }

  res.status(405).json({ error: 'Method not allowed' });
}