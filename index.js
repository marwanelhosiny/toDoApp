import express from 'express'
import db_connection from './DB/connection.js'
import userRouter from './src/modules/user/user.routes.js'
import taskRouter from './src/modules/task/task.routes.js'
import { globalResponse } from './src/middlewares/globalResponse.js'
const app = express()
const port = 3000
db_connection()

app.use(express.json())
app.use('/user',userRouter)
app.use('/task',taskRouter)

app.use(globalResponse)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))