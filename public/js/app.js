// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm =document.querySelector('form')/*Selection des elements paragraphes,
Form et input */
const search =document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo =document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript' /*changer le contenu de messageOne */
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((data)=>{

        if(data.error){
       // console.log("this is a huge error")
       messageOne.textContent = data.error

    }
    else{
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location

        console.log("forcast = " +data.forecast)
        console.log("location = " +data.location)
    }})
    })
    
})
