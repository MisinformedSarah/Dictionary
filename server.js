const express= require('express')
const app= express()
const port=5000
const cors= require('cors')

app.use(cors());

//run for testing
app.listen(port,()=>{
console.log(`runningg with the ${port} port`)
})


const dictionary = [
  {word:'bandash',meaning:'crash bandicoot'},
  { word: 'disco asylum', meaning: 'disco elysium' },
];



// using json with express
app.use(express.json())
// app.use(express.static('public'))

//givigng the static html
app.get('/',(request,response)=>{
    response.sendFile(__dirname+'/index.html')
    
    console.log('served html succ')
})

//getting all the words inside
app.get('/api',(request,response)=>{
    response.json(dictionary)
    //response.json(dic)
})

//getting meaning returned
app.get('/api/:word',(request,response)=>{
   
    const wordInDic=request.params.word
    const found = dictionary.find(element => element.word === wordInDic);


   
  if (found) {
    response.send(found.meaning);
  }else{
    console.log('bruh what')
  }
})
    
