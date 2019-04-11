const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")

const app = express()
const port = 5000
app.use(cors())

const config = require('./config/database').database
const mathUsers = require('./routes/users/mathUsers')
const programmer = require('./routes/users/programmer')
const files = require('./routes/files/math/mathFile')
const papers = require('./routes/files/programmer/code')
const leaks = require('./routes/leaks') 




 //mongo connection
 mongoose
  .connect(
    config,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors())

//set static folder for frontend
app.use(express.static(path.join(__dirname, 'client')))



 //body-parser middleware
app.use(bodyParser.json())

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


app.use('/mathUsers', mathUsers)
app.use('/programmer', programmer)
app.use('/files', files)
app.use('/papers', papers)
app.use('/leaks', leaks)

app.listen(port, ()=>{
    console.log("app started on port " +port)
})

// const express = require("express")
// const path = require("path")
// const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
// const cors = require("cors")
// const passport = require("passport")

// const config = require('./config/db').database
// const users = require('./routes/users')
// const files = require('./routes/files')
// const leaks = require('./routes/leaks') 

// const app = express()
// const port = 3000


// //mongo connection
// mongoose
//   .connect(
//     config,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// app.use(cors())

// //set static folder for frontend
// app.use(express.static(path.join(__dirname, 'client')))



// //body-parser middleware
// app.use(bodyParser.json())

// //passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
// require('./config/passport')(passport)


// app.use('/users', users)
// app.use('/files', files)
// app.use('/leaks', leaks)

// app.listen(port, ()=>{
//     console.log("app started on port " +port)
// })