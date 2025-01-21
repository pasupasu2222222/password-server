import fs from 'fs';

export default function handler(req, res) {
  const filePath = './frequency.json';

  // データが存在すれば返す
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(data);
  } else {
    res.status(200).json({});
  }
}
