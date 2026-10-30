// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Car = require('./models/Car')







// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()


// Routes go here


// Routes go here

app.get('/', (req,res)=>{

    res.render('homepage.ejs')
})

app.get('/test', (req,res)=>{

    res.render('homepage.ejs')
})


//create
app.get('/cars/new',(req,res)=>{

    res.render('create-car.ejs')
})

app.post('/cars', async (req,res)=>{

    req.body.isElectric = req.body.isElectric === 'on'
    console.log(req.body)

    const createdCar = await Car.create({

        name: req.body.name,
        isElectric: req.body.isElectric
    })

    res.redirect('/')
})


//read
app.get('/cars', async (req,res)=>{

    const allCars = await Car.find()
    console.log(allCars)

    res.render('car-list.ejs', {cars: allCars})
})

app.get('/cars/:carId', async (req,res)=>{

    const foundCar = await Car.findById(req.params.carId)


    res.render('car-details.ejs',{car: foundCar})
})




//delete
app.delete('/cars/:carId', async (req,res)=>{

    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})




//update
app.get('/cars/:carId/edit', async (req,res)=>{

    const foundCar = await Car.findById(req.params.carId)
    res.render('edit-car.ejs',{car: foundCar})
})

app.put('/cars/:carId', async (req,res)=>{

    req.body.isElectric = req.body.isElectric === 'on'


    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body)


    res.redirect('/cars')
})





app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000


