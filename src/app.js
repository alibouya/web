 const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')


const path =require('path')

const express =require('express')
const hbs = require('hbs')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app =express()
// define paths for express config
const publicDirectory =path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicDirectory))
app.get('', (req, res)=>{
res.render('index',{
    title : "Weather app",
    name : "Ali Bouyahya"
})
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Ali Bouyahya'
    })
    })
    app.get('/help', (req, res)=>{
        res.render('help',{
            text : ': What do you want',
            title : 'help ',
            name : 'Ali Bouyahya'
        })
        })
// app.get('/help', (req, res)=>{
//     res.send([{
//         name : 'Ali',
//         age: 33
//     },{name :'Ahmed', age : 32}])
//     })
// app.get('/about', (req, res)=>{
//         res.send('<h1>Weather title : sunny</h1>')
//         })
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
         }) 
     }        
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){
             return res.send({ error})
         }
      forecast(latitude,longitude,(error, forecastData)=>{
        if(error){
            return res.send({ error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
      })   
     })
    // res.send({
    //             forecast : 'it is snowing',
    //             location: 'Sukrah', 
    //             address : req.query.address 
    //         })
            })
app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
           error : "You must provide a serach term"
        }) 
    }
    console.log(req.query.search)
    res.send({
    products:[]
    })
    })
// n'importe quel acces different de weather/help ou about
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Ali Bouyahya',
        errorMessage: 'Help article not found'
    })                    })
app.get('*', (req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Ali Bouyahya',
        errorMessage: 'Page not found'
    })})
app.listen(3000, ()=>{
    console.log('Server is up on server 3000.')
})
//app.com
//app.com/help
//app.cpm/about
