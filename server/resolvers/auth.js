const {gql} = require('apollo-server-express')

const me = () => 'Joao Vitor Amorim ';

module.exports = {
    Query:{
        me
    }
}