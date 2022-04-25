const express = require('express')
const { default: mongoose } = require('mongoose')
const toy = require('./models/toy')
const app = express()
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res) => {
    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const query = toy.find({}, (err,result) =>{
        if (err)
            console.log(err)
        else
            res.render('home', {toys:result})
    }) 
})

app.get('/new',(req,res) => {
    res.render('newProduct')
})

app.get('/update',async (req,res)=>{
    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const id = req.query.id
    const upToy = await toy.findById(id)

    res.render('updateProduct',{'toy':upToy})
})

app.get('/delete',async (req,res)=>{
    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const id = req.query.id
    await toy.deleteOne({'_id':id})
    res.redirect('/')
})

app.post('/doUpdate',async (req,res)=>{
    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPic

    var upToy = await toy.findById(id)
    upToy.name = name
    upToy.price = price
    upToy.picURL = picURL
    upToy.save((err)=>{
        if (err)
            console.log(err)
        else
            res.redirect("/")
     })    
})

app.post('/newProduct', (req,res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPic

    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const toyEntity = new toy({'name' : name, 'price':price, 'picURL':picURL})
    toyEntity.save((err)=> {
        if (err)
            res.end(err)
        else
            res.end('Product Saved!')
    })
    res.redirect('/')
})

app.post("/search", async (req, res) => {
    var mongoDB = 'mongodb://nguyenfinal:mongodb@cluster0-shard-00-00.sqpeh.mongodb.net:27017,cluster0-shard-00-01.sqpeh.mongodb.net:27017,cluster0-shard-00-02.sqpeh.mongodb.net:27017/test?replicaSet=atlas-ltif74-shard-0&ssl=true&authSource=admin'
    mongoose.connect(mongoDB, { useNewUrlParser : true, useUnifiedTopology : true});
    var db = mongoose.connection;

    const searchText = req.body.txtSearch
    const query = await  toy.find({name :RegExp(searchText)})
    res.render('home',{'toys':query})
  });

const PORT = process.env.PORT|| 5000

app.listen(PORT)
console.log("Server is running!")
