const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Đường dẫn file counter
const COUNTER_FILE = path.join(__dirname, 'counter.json');

// Đọc số lượt truy cập
function getCounter() {
    try {
        const data = fs.readFileSync(COUNTER_FILE, 'utf8');
        return JSON.parse(data).value || 0;
    } catch {
        return 0;
    }
}

// Ghi số lượt truy cập
function setCounter(val) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ value: val }));
}

// API đếm lượt truy cập
app.get('/api/visit', (req, res) => {
    let count = getCounter();
    count++;
    setCounter(count);
    res.json({ value: count });
});

// Trang chủ test
app.get('/', (req, res) => {
    res.send('Visit API: /api/visit');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
