import ApolloClient from 'apollo-boost'

import { gql } from 'apollo-boost'





function AddStartUp() {

    
   

    return (
        <>
            <div className="formCont">
                <form>
                    <h2>Cadastre Uma Start-Up</h2>
                    <div className="formStartData">
                        <br></br>
                        <label htmlFor="nameInput">Nome da empresa  </label>
                        <br></br>
                        <input className="nameInput" id="nameInput" type="text" placeholder="Ex:Natura"></input>
                        <br></br>
                        <label htmlFor="cnpjInput">   CNPJ   </label>
                        <br></br>
                        <input className="cnpjInput" id="cnpjInput" placeholder="12.345.678-0001-90" type="text"></input>
                        <br></br>
                        <label htmlFor="socioInput">   Socio   </label>
                        <br></br>
                        <input className="socioInput" id="socioInput" placeholder="Ex: Armando Abrel" type="text"></input>
                        <br></br>
                        <label htmlFor="logoInput">   logo  </label>
                        <br></br>
                        <input className="logoInput" id="logoInput" placeholder="https://i.postimg.cc/example/.png" type="text"></input>
                        <br></br>
                        <label htmlFor="cpfInput">CPF Socio :</label>
                        <br></br>
                        <input className="cpfInput" id="cpfInput" placeholder="123.456.789-10" type="text"></input>
                        <br></br>
                        <label htmlFor="emailInput">   E-mail   </label>
                        <br></br>
                        <input className="emailInput" id="emailInput" placeholder="exemple@domain.com" type="text"></input>
                        <br></br>
                        <label htmlFor="telInput">   Telefone   </label>
                        <br></br>
                        <input className="telInput" id="telInput" placeholder="(99)99999-9999" type="text"></input>
                        <br></br>
                        <label htmlFor="tel2Input">   Telefone(2)   </label>
                        <br></br>
                        <input className="tel2Input" id="tel2Input" placeholder="(99)99999-9999" type="text"></input>
                        <br></br>
                        <label htmlFor="siteInput">   site   </label>
                        <br></br>
                        <input className="siteInput" id="siteInput" placeholder="www.yoursite.com" type="text"></input>
                        <br></br>
                        <label htmlFor="teamInput" >   Tamanho da Equipe   </label>
                        <br></br>
                        <input className="teamInput" id="teamInput" placeholder="" type="number"></input>
                        <br></br>
                        <label htmlFor="areaInput">   Area de Atuacao : </label>
                        <br></br>
                        <select className="areaInput"id="areaInput">
                            <option label="AGRO">AGRO </option>
                            <option label="Tech">Tech</option>
                            <option label="Fintech">Fintech </option>
                            <option label="Software">Software</option>
                            <option label="Hardware">Hardware </option>

                        </select>

                        


                    </div>
                   
                   
                    <div className="confirm">
                        <button className="addBtnName" type="button" onClick={Input}>Adcionar</button>
                    </div>
                  
                  
                </form>
            </div>

        </>

    )
   
}
function Input(){
    var name = document.getElementById("nameInput").value
    var cnpj = (document.getElementById("cnpjInput").value)
    var socio = document.getElementById("socioInput").value
    var logo = document.getElementById("logoInput").value
    var cpf = document.getElementById("cpfInput").value
    var email = (document.getElementById("emailInput").value)
    var site = document.getElementById("siteInput").value
    var equipe = document.getElementById("teamInput").value
    var area = document.getElementById("areaInput").value
    var tel = document.getElementById("telInput").value
    var tel2 = document.getElementById("tel2Input").value

    const client = new ApolloClient({
        uri: 'http://localhost:8000/graphql'
     })

   client.mutate({  mutation:gql`
    mutation Newstartup($input: startupInput!){
        newStartup(input:$input){
          name
          cnpj
          logo
          socio 
          cpf
          email
          site
          equipe
          area

        }
      }
    `,variables :{
        input :{
            name, 
            cnpj,
            socio,
            logo,
            cpf,
            email,
            site,
            equipe,
            area,
            tel,
            tel2
        }
    }}).then(()=> alert("Startup Adcionada"))
       

     
    
}



export default AddStartUp