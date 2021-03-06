const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })
const Recipe = require('./models/recipe')
const User = require('./models/user')
const bodyParser = require('body-parser')
const cors = require('cors')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

//graphql - express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')


//object shorthand syntax if property: value name is same
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
//connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err))


//initialize the application
const app = express()

//Added cors middleware to prevent cross-origin errors

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

//create graphiql application
app.use('/graphiql',graphiqlExpress({endpointURL: '/graphql'}))

//connect schemas t ographql
app.use('/graphql',
bodyParser.json(),
graphqlExpress({
    schema,
    context:{
        Recipe,
        User
    }
}))

//listen to the port
const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})