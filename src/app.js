//server configuration

import express from 'express'
import morgan from "morgan";
import cors from "cors"
import TaskRoutes from './routes/task.routes'
const app = express()


//settings

app.set('port', process.env.PORT || 3000)

//middlewares
app.use(cors(/*{
  origin: http://localhost:3000  <= server connections allowed
}*/))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false})) //read html forms



//routes
app.get('/', (req, res) => {
  res.json({ 'message': 'hello world' })
})


app.use('/api/tasks', TaskRoutes)


export default app