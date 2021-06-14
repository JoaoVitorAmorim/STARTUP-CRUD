import ApolloClient from "apollo-boost";
import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import ReactTable from "react-table-6";


const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});



export default function startupData(props) {
  const [meet, setState] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query Allmeet($input: String!) {
            allmeet(input: $input) {
              msg
              dataInit
              id
              
            }
          }
        `,
        variables: { input: props.id },
      })
      .then((result) => setState(result.data.allmeet))
      .then(console.log(meet))
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Mesagem",
      accessor: "msg",
    },
    {
      Header: "Data",
      accessor: "dataInit",
    },
    
  ];
  

  return (
    <>
      <section className="mainData">
     

        <div className="secondRow" style={{
          display:"flex",
          justifyContent:"center"
        }}>
          <ReactTable columns={columns} data={meet} />

          
        </div>
      </section>
    </>
  );
}
