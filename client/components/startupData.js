import ApolloClient from "apollo-boost";
import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

export default function startupData(props) {
  const [startup, setState] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query Pickstartup($input: String!) {
            pickStartup(input: $input) {
              name
              cnpj
              socio
              logo
              cpf
              tel
              site
              equipe
              email
              area
            }
          }
        `,
        variables: { input: props.id },
      })
      .then((result) => setState(result.data.pickStartup[0]))
      .then(console.log({ startup }))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <>
      <div style={{ textAlign: "center",marginTop:"15px", height: "2.2rem" , backgroundColor:"#a9a9a9",borderRadius:"50px",marginBottom:"-5px",marginRight:"25px"}}>
        
      </div>
      <div
        className="MainGrid"
        style={{
          flexDirection: "row",
          backgroundColor: "#a9a9a9",
        }}
      >
        <div
          className="FirstRow"
          style={{
            textAlign: "center",
            backgroundColor: "#a9a9a9",
            display: "flex",
            marginLeft: "260px",
            marginTop: 0,
          }}
        >
          <div
            className="Logo"
            style={{ backgroundColor: "#a9a9a9", marginTop: "10px" }}
          >
            <img
              src={startup.logo}
              style={{
                padding: "0",
                height: "200px",
                width: "300px",
                borderRadius: "20px",
                border: "2px solid black",
                margin: 0,
              }}
            />
          </div>
          <div
            className="formCont"
            style={{
              display: "flex",
              backgroundColor: "#e0e0e0",
              textAlign: "left",
              padding: "1rem",
              margin: "0.5rem",
              border: "2px solid black",
            }}
          >
            <form>
              <div
                className="formStartData"
                style={{
                  flexDirection: "column",
                  columnCount: 2,
                  padding: "10px",
                }}
              >
                <ul style={{height:"25rem"}}>
                  <label
                    style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }}
                  >
                    Nome da empresa :  {startup.name}{" "}
                  </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }}> CNPJ :  {startup.cnpj} </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }}> Socio :  {startup.socio} </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="cpfInput">CPF Socio :  {startup.socio}</label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="emailInput"> E-mail :  {startup.email} </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="telInput"> Telefone :  {startup.tel} </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="tel2Input">
                    {" "}
                    Telefone(2) :  {startup.tel2}{" "}
                  </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="siteInput"> site :  {startup.site} </label>
                  <br></br>
                  <br></br>
                  <label  style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }}htmlFor="teamInput">
                    {" "}
                    Tamanho da Equipe :  {startup.equipe}{" "}
                  </label>
                  <br></br>
                  <br></br>
                  <label style={{
                      borderRadius: "8px",
                      padding: "2px",
                    }} htmlFor="areaInput">
                    {" "}
                    Area de Atuacao : {startup.area}
                  </label>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          ul {
            list-style: none;
            margin: 0;
            padding: 5;
          }

          label {
            color: black;
            margin: 5;
            background-color: #d3d3d3;
          }
        `}
      </style>
    </>
  );
}
