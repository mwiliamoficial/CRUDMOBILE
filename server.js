const express = require('express') 
const bodyParser = require('body-parser')
const app = express() 

const ObjectId = require('mongodb').ObjectID

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://maicon:1234@bdprojeto-lsto9.mongodb.net/test?retryWrites=true&w=majority";
 
MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('test') // coloque o nome do seu DB
 
  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('index.ejs');
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
 
    })
})

app.post('/show', (req, res)=>{
    //criar a coleção “data”, que irá armazenar nossos dados
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
      })
});

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})


.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var email = req.body.email
  var endereco = req.body.endereco
  var rg = req.body.rg
  var cpf = req.body.cpf
  var telefone = req.body.telefone
  var data_nascimento = req.body.data_nascimento
  var estado= req.body.estado 
  
 

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname,
      email: email,
      endereco: endereco,
      rg: rg,
      cpf: cpf,
      telefone: telefone,
      data_nascimento:data_nascimento,
      estado: estado


      
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})

//npm run dev
//mongodb+srv://maicon:<password>@bdprojeto-lsto9.mongodb.net/test
     

