const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.json());

app.post('/bfhl', upload.single('file'), (req, res) => {
  const data = req.body.data;
  const file = req.file;

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';
  let isPrimeFound = false;

  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(item)) {
        isPrimeFound = true;
      }
    } else {
      alphabets.push(item);
      if (item.toLowerCase() > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item.toLowerCase();
      }
    }
  }

  const fileInfo = {
    file_valid: file ? true : false,
    file_mime_type: file ? file.mimetype : '',
    file_size_kb: file ? Math.round(file.size / 1024) : 0
  };

  const response = {
    is_success: true,
    user_id: "your_full_name_dob", // Replace with your actual details
    email: "your_email",
    roll_number: "your_roll_number",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    is_prime_found,
    ...fileInfo
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}