import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { frequency } = req.body; // フロントエンドから送られるデータ

    // データを保存するファイルの場所
    const filePath = './frequency.json'; // 必要に応じて修正
    let data = {};

    // ファイルが存在していれば内容を読み込む
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // 新しいデータを追加
    for (const char in frequency) {
      data[char] = (data[char] || 0) + frequency[char];
    }

    // 更新したデータを保存
    fs.writeFileSync(filePath, JSON.stringify(data));

    // 成功のレスポンスを返す
    res.status(200).json({ message: 'Frequency saved!', frequency: data });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
