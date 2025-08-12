const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép tất cả domain gọi API
app.use(cors());

// Lưu lượt truy cập trong biến (reset khi server restart)
let count = 0;

// Endpoint chính
app.get("/hit", (req, res) => {
  count++;
  res.json({ value: count });
});

// Endpoint xem số lượt hiện tại
app.get("/count", (req, res) => {
  res.json({ value: count });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
