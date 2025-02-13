const express = require('express');
const axios = require ('axios');
const mysql = require ('mysql2');
const app = express();
let priceperlike = 0.4;

app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'modulo16rafa',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar a base de dados:', err.message);
    } else {
        console.log('Conectado à base de dados MySQL!');
    }
});

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/new-song', (req, res) => {
    res.render('new-song')
})

app.get('/songs', (req, res) => {

    const query = `SELECT * FROM songs`;

    connection.query(query, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musica: ' + err.message);
        }

    res.render('songs', {query:results})
})
})

app.get('/price', (req, res) => {
    res.render('price')
})  

const PORT = 3000;
app.listen(PORT, ()=> {
console.log(`Servidor a correr em http://localhost:${PORT}`);
});