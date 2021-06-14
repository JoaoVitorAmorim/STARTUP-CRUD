
import React,{useState} from 'react'
import reactDom from 'react-dom'
import Navbar from "../components/Navbar" 
import AddStartUp from "../components/AddStartUp"
import { withRouter } from 'next/router'





class AddStartUps extends React.Component {
 
  componentDidMount=()=>{
    
    console.log(this.props)
    
  }
  render(){
   
     
  return (
  <>
    <div>
      <Navbar></Navbar>
      <h1 href="wwww.incit.com.br">INCIT</h1>
      
    </div>
    <AddStartUp></AddStartUp>
  </>
  );
  }
  
  

}




export default withRouter(AddStartUps)

