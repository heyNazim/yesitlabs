    import express from 'express'
    import cors from 'cors'
    import color from 'colors'
    import dotenv from 'dotenv'
    import connectdb from './config/connectDb.js'
    import router from './routes/userRoute.js'
    import productrouter from './routes/productRoute.js'

    const app = express()
    dotenv.config()
    app.use(cors())
    app.use(express.json())


    app.use('/uploads', express.static('uploads'));


    connectdb()

    app.use('/api', router);

    app.use('/api', productrouter);


    const PORT = 8080
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`.bgWhite)
    })