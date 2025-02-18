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

app.get('/api/songs', (req, res) => {
 
    const genreQuery = req.query.genre;
    const artistQuery = req.query.artist;
    const likesQuery = req.query.likes;
    const opQuery = req.query.op;
   
    let myQuery = `SELECT * FROM songs`;
   
    if (genreQuery!=undefined){
      myQuery = `SELECT * FROM songs WHERE genre = "${genreQuery}"`;
    } else if (artistQuery!=undefined){
      myQuery = `SELECT * FROM songs WHERE artist = "${artistQuery}"`;
    } else if (likesQuery!=undefined){
      myQuery = `SELECT * FROM songs WHERE likes = "${likesQuery}"`;
      if (opQuery!="above"){
        myQuery = `SELECT * FROM songs WHERE likes < "${likesQuery}"`;  
      }else if (opQuery!="under"){
        myQuery = `SELECT * FROM songs WHERE likes > "${likesQuery}"`;  
      }else if (opQuery!="equal"){
        myQuery = `SELECT * FROM songs WHERE likes = "${likesQuery}"`;  
      }
    }
   
    connection.query(myQuery, (err, results) => {
   
      if (err) {
        return res.status(500).send('Erro ao buscar música: ' + err.message);
      }
   
      res.json(results);
    });
   
  });

app.post('/api/songs', (req, res) =>{
    
    const title = req.body.title;
    const artist = req.body.artist;
    const album = req.body.album;
    const genre = req.body.genre;
    const duration_seconds = req.body.duration_seconds;
    const release_date = req.body.release_date;
    const likes = req.body.likes;

    if (!title || !artist || !release_date ) {
        return res.status(400).send('Campos obrigatórios: title, artist, release_date');
      }
 

    const myQuery = `INSERT INTO songs (id, title, artist, album, genre, duration_seconds, release_date, likes) VALUES (NULL, '${title}', '${artist}', '${album}', '${genre}', '${duration_seconds}', '${release_date}', '${likes}')`

    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musica: ' + err.message);
        }
        res.json(results);
    });
    
})

app.put('/api/songs/:id', (req, res) =>{

    songsID=req.params.id;
    const title = req.body.title;
    const artist = req.body.artist;
    const album = req.body.album;
    const genre = req.body.genre;
    const duration_seconds = req.body.duration_seconds;
    const release_date = req.body.release_date;
    const likes = req.body.likes;
    const created_at = req.body.created_at;

    const myQuery = `UPDATE songs SET title = '${title}', artist = '${artist}', album = '${album}', genre = '${genre}', duration_seconds = '${duration_seconds}', release_date = '${release_date}', likes = '${likes}' where id=${songsID}`

    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musicas: ' + err.message);
        }
        res.json(results);
    });
})


app.delete('/api/songs/:id', (req, res) =>{

    songsID=req.params.id;

    const myQuery = `DELETE FROM songs WHERE id=${songsID}`

    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musica: ' + err.message);
        }
        res.json(results);
    });

})

app.get ('/api/songs/:id', (req, res) =>{
    
    songsID=req.params.id;
    const myQuery = `SELECT * FROM songs where id = ${songsID}`
    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musicas: ' + err.message);
        }
        res.json(results);
    });

})

app.get ('/api/price', (req, res) =>{

        res.json({price: priceperlike});
        
    });

    app.put('/api/price', (req, res) => {

        // Validações do preço por like recebido
        if (!req.body.price) {
          return res.status(400).send('Preço por like não foi fornecido');
        } else if (isNaN(req.body.price)) {
          return res.status(400).send('Preço por like deve ser um número');
        } else if (req.body.price < 0) {
          return res.status(400).send('Preço por like deve ser um número positivo');
        }
      
        priceperlike = req.body.price
      
        res.sendStatus(200);  
      });

app.get('/api/songs/:id/revenue', (req, res) =>{

    const ID=req.params.id;


    const myQuery = `SELECT likes FROM songs where id = ${ID}`
    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musicas: ' + err.message);
        }
        results = { "revenue": results[0].likes * priceperlike}
        res.json(results);
    });
});

const bands = [
    
    {
        "artist": "Ken Carson",
        "band_members": "Ken Carson"
    },
    {
        "artist": "Brent Faiyaz",
        "band_members": "Brent Faiyaz"
    },
    {
        "artist": "PARTYNEXTDOOR",
        "band_members": "PARTYNEXTDOOR"
    }, 
    {
        "artist": "Valete",
        "band_members": "Valete"
    }
]

app.get('/api/songs/:id/band', (req, res) =>{

    const ID=req.params.id;


    const myQuery = `SELECT artist FROM songs where id = ${ID}`
    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musicas: ' + err.message);
        }

        if (results.length !== 0){

        for (let i=0; i < bands.length; i++){
            if (bands[i].artist == results[0].artist){
                res.json(bands[i]);
                return;
            }
        }
        res.sendStatus(404);
    }else{
        res.sendStatus(404);
    }
    });
});

app.post('/api/songs/:id/band', (req, res) =>{;
 
    const ID = req.params.id;
    const band_member = req.body.band_member;
 
    const myQuery = `SELECT artist FROM songs where id=${ID}`
 
    connection.query(myQuery, (err, results) => {
 
        if (err) {
            return res.status(500).send('Erro ao buscar songs: ' + err.message);
        }
 
        const Banda = {
           
            "artist": results[0].artist,
            "band_members": band_members
        }
       
        bands.push(Banda);
 
        res.sendStatus(200);
 
    });
 
});


app.put('/api/songs/:id/band', (req, res) =>{;
 
    const ID = req.params.id;
    const band_members = req.body.band_members;
 
    const myQuery = `SELECT artist FROM songs where id=${ID}`
 
    connection.query(myQuery, (err, results) => {
 
        if (err) {
            return res.status(500).send('Erro ao mudar bandas: ' + err.message);
        }
 
      
        if (results.length !== 0){

            for (let i=0; i < bands.length; i++){
                if (bands[i].artist == results[0].artist){
                    bands[i].band_members = req.body.band_members;
                    return res.sendStatus(200);
                }
            }
            res.sendStatus(404).send('Artista não encontrado na banda');
        }else{
            res.sendStatus(404).send('Artista não encontrado na base de dados');
        }
 
});

})

app.delete('/api/songs/:id/band', (req, res) =>{;
 
    const ID = req.params.id;
 
    const myQuery = `SELECT artist FROM songs where id=${ID}`
 
    connection.query(myQuery, (err, results) => {
 
        if (err) {
            return res.status(500).send('Erro ao eliminar bandas: ' + err.message);
        }
 
        if (results.length !== 0){

            for (let i=0; i < bands.length; i++){
                if (bands[i].artist == results[0].artist){
                    bands.splice(i,1);
                    return res.sendStatus(200);
                }
            }
            res.sendStatus(404).send('Artista não encontrado na banda');
        }else{
            res.sendStatus(404).send('Artista não encontrado na base de dados');
        }
 
    });
 
});

app.post('/api/songs/bulk', (req, res) =>{
    
    for (let i = 0; i < req.body.length; i++){

    const title = req.body[i].title;
    const artist = req.body[i].artist;
    const album = req.body[i].album;
    const genre = req.body[i].genre;
    const duration_seconds = req.body[i].duration_seconds;
    const release_date = req.body[i].release_date;
    const likes = req.body[i].likes;

    const myQuery = `INSERT INTO songs (id, title, artist, album, genre, duration_seconds, release_date, likes) VALUES (NULL, '${title}', '${artist}', '${album}', '${genre}', '${duration_seconds}', '${release_date}', '${likes}')`

    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar musica: ' + err.message);
        }

        
    });
}
res.status(200).send('Musicas adicionadas com sucesso');
})

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

    res.render('price', {price: priceperlike})
})  

app.get('/songs/:id', (req, res) => {
    res.render('song')
})

app.get('/song/:id', (req, res) => {
    const id = req.params.id;

    const myQuery = `SELECT * FROM songs WHERE id = ${id}`;

    connection.query(myQuery, (err, results) => {  
        if (err) {
            return res.status(500).send('Erro ao buscar musica: ' + err.message);
        }
        const dinheiro = results[0].likes * priceperlike;

        axios.get(`https://api.lyrics.ovh/v1/${results[0].artist}/${results[0].title}`)
            .then(response => {
                console.log('Sucess:', response.data);
                res.render('song', {query:results, musicID:id, receita:dinheiro, lyrics:response.data})
            })

            .catch(error => {
                console.error('Erro:', error);
            })      
})
})

const PORT = 3000;
app.listen(PORT, ()=> {
console.log(`Servidor a correr em http://localhost:${PORT}`);
});