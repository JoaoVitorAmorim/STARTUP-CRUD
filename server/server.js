//getting express
const express = require('express')
const {fileLoader, mergeTypes, mergeResolvers} = require ('merge-graphql-schemas')


//getting ApolloServer
const {ApolloServer,graphqlExpress} = require('apollo-server-express')

//modules
const http = require('http')
const path = require('path')

//making possible to use env variables
require('dotenv').config()

//express server
const app = express()


//graphql server

//typeDefs (all types inside the folder typeDefs)
const typeDefs =mergeTypes(fileLoader(path.join(__dirname, './typeDefs')))

//resolver
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))




//setting up the server 

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

// use applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express

apolloServer.applyMiddleware({
    app
})

//server

const httpserver = http.createServer

//app.get uses a async fct !! rest endpoint

app.get('/rest',function(req,res){
    console.log("chegay")
    res.json({
        
        data:'you hit rest endpoint horray'
    })
})





//port 

app.listen(process.env.PORT, function(){
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
    console.log(`graphql Server is listening at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);

})


