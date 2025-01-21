import fs from 'fs';

export default function handler(req, res) {
  const filePath = './frequency.json';

  // ファイルを削除してリセット
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  res.status(200).json({ message: 'Frequency reset!' });
}
