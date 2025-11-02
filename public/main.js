
console.log('js working fime')
const getWordsButton= document.querySelector('#getWords')
getWordsButton.addEventListener('click',wordsGenerator)

const getMeaningButton=document.querySelector('#getMeaning')
getMeaningButton.addEventListener('click',wordsMeaningChecker)

async function wordsGenerator() {
    const response= await fetch('http://localhost:5000/api')
     const data= await response.json()
     dom= document.querySelector('h2')
     dom.innerHTML=''
    data.forEach(element => {
        
        
       dom.innerHTML +=' '+element.word 

        console.log(element.word)
        
        
    });
    

     console.log(data,'all dataaaaaa')


    console.log('clicked on butt')
}

async function wordsMeaningChecker() {
    let word=document.querySelector('#input').value
    //let word='bandash'
    console.log(word,'the o=wordd')

    let response= await fetch(`http://localhost:5000/api/${word}`)
    let data= await response.text()

    let meaning=document.querySelector('#meaning')
    if(data){
        meaning.innerHTML=data
    }else{
        console.log('errorr')
    }
    
    
    
    console.log('clicked on check but')
    
}