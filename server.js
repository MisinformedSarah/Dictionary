//linking the env
require('dotenv').config();

//loading express
const express= require('express')
const app= express()


const port = process.env.PORT
const cors= require('cors')
const MongoClient= require('mongodb').MongoClient
const mongourl=process.env.MONGO_CONN_STRING
const dbname='dictionary'

let db;

//usgin ports
app.use(cors());
// reconiznig json data with express
app.use(express.json())
//reconizing array and string data with express
app.use(express.urlencoded({ extended: true }))
///serving up the first static page
app.use(express.static('public'))
//running ejs
app.set('view engine','ejs')





//DATABASE CHECK
MongoClient.connect(mongourl)
  .then(client => {console.log('connected to database allegedly')
    db = client.db(dbname)
  
    
    //getting meaning returned
    app.get('/api/:word',(request,response)=>{
   
    const wordInDic=request.params.word
    console.log(wordInDic)
    const found = db.collection('dictionary').findOne({word:wordInDic})
    .then(found=>{
      if (found) {
    response.send(found.meaning);
    }else{
    console.log('bruh what')
  }})
  
    


   
  
})

  
//adding words
      app.post('/api/addWord',(request,response)=>{
      db.collection('dictionary').insertOne(request.body)
      .then(result=>{
        console.log(result,'word added')
        response.json({success:'yes'})
      })
      
    })
  app.listen(port,()=>{
    console.log(`runningg with the ${port} port`)

    
    })
})



// const dictionary = [
//   {word:'bandash',meaning:'crash bandicoot'},
//   { word: 'disco asylum', meaning: 'disco elysium' },
// ];


//givigng the static html only
// app.get('/',(request,response)=>{
//     response.sendFile(__dirname+'/index.html')
    
//     console.log('served html succ')
// })

//getting all the words inside
app.get('/api',(request,response)=>{
    db.collection('dictionary').find().toArray()
    .then(data=>{
      // response.render('index.ejs',{info:data})
      response.json(data)
    })
    //response.json(dic)
})



    
