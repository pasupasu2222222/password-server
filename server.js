const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 文字の使用頻度を保存するファイル
const FREQUENCY_FILE = 'character_frequency.json';

// 初期化
let characterFrequency = {};

// JSONデータを処理できるようにする
app.use(bodyParser.json());

// 静的ファイルを配信
app.use(express.static(path.join(__dirname)));

// トップページにHTMLを返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 文字頻度を保存するエンドポイント
app.post('/saveFrequency', (req, res) => {
    const newFrequency = req.body.frequency;

    // ファイルが存在する場合は既存データを読み込む
    if (fs.existsSync(FREQUENCY_FILE)) {
        characterFrequency = JSON.parse(fs.readFileSync(FREQUENCY_FILE, 'utf8'));
    }

    // 新しい頻度データをマージ
    for (const char in newFrequency) {
        characterFrequency[char] = (characterFrequency[char] || 0) + newFrequency[char];
    }

    // 更新後のデータを保存
    fs.writeFileSync(FREQUENCY_FILE, JSON.stringify(characterFrequency));

    res.json({ message: '頻度を保存しました！', frequency: characterFrequency });
});

// 文字頻度を取得するエンドポイント
app.get('/getFrequency', (req, res) => {
    if (fs.existsSync(FREQUENCY_FILE)) {
        characterFrequency = JSON.parse(fs.readFileSync(FREQUENCY_FILE, 'utf8'));
    }
    res.json(characterFrequency);
});

// 使用頻度をリセットするエンドポイント
app.post('/resetFrequency', (req, res) => {
    characterFrequency = {}; // メモリ上のデータをクリア
    if (fs.existsSync(FREQUENCY_FILE)) {
        fs.unlinkSync(FREQUENCY_FILE); // ファイルを削除してリセット
    }
    res.json({ message: '使用頻度をリセットしました！' });
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーが動いています: http://localhost:${PORT}`);
});
