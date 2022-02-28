require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const routerRoutes = require('./routes')

const cluster = require('cluster')
const { cpus } = require('os')

const PORT = process.argv[2] || process.env.PORT || 3001
const modoCluster = process.argv[3] === 'CLUSTER'
const herokuProd = process.env.NODE_ENV === 'PROD' 

if(modoCluster && cluster.isMaster && herokuProd){
    const cpusNumber = cpus().length
    for(let i=0; i < cpusNumber; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        cluster.fork()
    })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1', routerRoutes)
app.listen(PORT, () => {
    console.log('Levantado Puerto Back: ', PORT);
})
