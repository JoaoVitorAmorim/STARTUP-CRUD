import ApolloClient from 'apollo-boost'
import React,{useState} from 'react'
import {gql} from 'apollo-boost'
import Link from 'next/link'
import ReactTable from 'react-table-6'


const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
 })





class Grid extends React.Component {

    constructor(params){
     super(params)
      this.state={
        startups:[]
        
      }
    }

  componentDidMount=()=>{
    client.query({
      query:gql`
      {
        allStartups{
                     id
                     name
                     logo
                   }      
     }
      `
    }).then(result => this.setState({startups: result.data.allStartups}))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  }
    render(){
    
    console.log(this.props)

    

  return (
  

    <section className='basicGrid'>
     {this.state.startups.map((item, key)=>(
       
        <div className='card'
            key={key}
            
        ><Link href='/OnePage/[slug]' as={`/OnePage/${this.state.startups[key].id}`}> 
            <img className='logo' src={this.state.startups[key].logo } alt={this.state.startups[key].name}/> 
          </Link>
        </div>
        
     ))}
    </section>
 
  )};
}

export default Grid
