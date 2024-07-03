const express = require('express');
const cors = require('cors');
const app = express();
const crypto = require("crypto");
const { METHODS } = require('http');

const encode =(email, code) => {
    const stringToEncode = `${email}:${code}`;
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let binaryString = '';
    for (let i = 0; i < stringToEncode.length; i++) {
        const binaryChar = stringToEncode.charCodeAt(i).toString(2).padStart(8, '0');
        binaryString += binaryChar;
    }
    
    while (binaryString.length % 6 !== 0) {
        binaryString += '0';
    }

    let base64String = '';
    for (let i = 0; i < binaryString.length; i += 6) {
        const sixBitBlock = binaryString.substring(i, i + 6);
        const decimalValue = parseInt(sixBitBlock, 2);
        base64String += map[decimalValue];
    }

    const padding = (3 - (stringToEncode.length % 3)) % 3;
    for (let i = 0; i < padding; i++) {
        base64String += '=';
    }

    return base64String;

};




// Настройка CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Укажите домен вашего React-приложения
  optionsSuccessStatus: 200, // Для поддержки некоторых старых браузеров
};
app.use(express.json());
app.use(cors(corsOptions));

let users = {};

  

// Пример маршрута для получения ролей
app.get('/api/get-roles', (req, res) => {
  res.json({
    roles: [
      "Системный аналитик",
      "Разработчик Java",
      "Разработчик JS/React",
      "Тестировщик",
      "Прикладной администратор"
    ]
  });
});





app.post('/api/sign-up', (req, res) => {
    
    const { last_name, first_name, email, role } = req.body;
    if (!last_name || !first_name || !email || !role){
        return res.status(400).send('There are empty fields');
    }
    if(users[email]){
        return res.status(409).send('User already exists');
    }
    const code = generateCode(email);
    users[email] = { last_name, first_name, role, code };
    console.log('Пользователи:', users);
    res.send("Данные внесены");
  });


function generateCode(email) {
    return crypto.createHash('md5').update(email + Date.now().toString()).digest('hex');
  } 



app.get('/api/get-code', (req, res) => {
  const { email } = req.query;
  if (!email || !users[email]) {
    return res.status(400).send('Invalid email');
  }
  res.send(users[email].code);
})


app.post('/api/set-status', (req, res) => {
  const {mystatus , token } = req.body;

  if (!token || !mystatus) {
    return res.status(400).send('Token and status are required');
  }

  let userFound = false;
  // проверяем есть ли польз
  for (let email in users){
    const user = users[email];
    const userToken = encode(email, user.code);
    if (userToken === token) {
        users[email].mystatus = mystatus;
        userFound = true;
        break;
      }
  }
  if (!userFound) {
    return res.status(400).send('User with this token not found');
  }

  res.send('Статус increased установлен');
}

)



   app.listen(7000, () => {
  console.log('Server is running on port 7000');
});