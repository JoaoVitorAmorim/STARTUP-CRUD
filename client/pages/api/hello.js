// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ApolloClient from 'apollo-boost'
import react,{useState} from 'react'
import {gql} from 'apollo-boost'



const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
 })


