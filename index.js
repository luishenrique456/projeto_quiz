const express = require('express')
const app = express()
const port = 3000

const router = require('./routes/router')

// Layouts 
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

// Padrão pasta views 
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

// Estilos
app.use(express.static('public'))

app.use('/', router)

app.listen(port, () => {
    console.log(`Está escutando na porta http://localhost:${port}`)
})