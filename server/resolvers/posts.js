const { gql } = require("apollo-server-express");
require('dotenv').config()
//setting up firebase
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig ={
  apiKey: process.env.APIKEY,
  authDomain:process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId:`${process.env.PROJECTID}`,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const totalStartups = () =>
  db
    .collection("startups")
    .get()
    .then(function (querySnapshot) {
      var count = 0;
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        count++;
      });
      return count;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

const allStartups = () =>
  db
    .collection("startups")
    .get()
    .then(function (querySnapshot) {
      const retAS = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        retAS.push(doc.data());
      });
      return retAS;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

const allmeet = (parent, args) =>
  db
    .collection("meet")
    .where("startupId", "==", `${args.input}`)
    .get()
    .then(function (querySnapshot) {
      const retAM = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        retAM.push(doc.data());
      });
      return retAM;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

const alleixo = (parent, args) =>
  db
    .collection("eixo")
    .where("meetId", "==", `${args.input}`)
    .get()
    .then(function (querySnapshot) {
      const retAE = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        retAE.push(doc.data());
      });
      return retAE;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
const pickmeet = (parent, args) =>
  db
    .collection("meet")
    .where("id", "==", `${args.input}`)
    .get()
    .then(function (querySnapshot) {
      const retPM = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        retPM.push(doc.data());
      });
      console.log(args);
      console.log(retPM);
      return retPM;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

const pickStartup = (parent, args) =>
  db
    .collection("startups")
    .where("id", "==", `${args.input}`)
    .get()
    .then(function (querySnapshot) {
      const retPS = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        retPS.push(doc.data());
        return;
      });
      console.log(retPS);
      return retPS;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

var newStartup = async (parent, args) => {
  console.log(args);

  let id = (await totalStartups()) + 1;
  id = id.toString();
  console.log(await totalStartups());
  console.log(args.input.cnpj);
  let startup = {
    id,
    name: args.input.name,
    cnpj: args.input.cnpj,
    cpf: args.input.cpf,
    socio: args.input.socio,
    logo: args.input.logo,
    email: args.input.email,
    tel: args.input.tel,
    tel2: args.input.tel2,
    site: args.input.site,
    email: args.input.email,
    equipe: args.input.equipe,
    area: args.input.area,
  };

  //push new post object to posts
  db.collection("startups").doc().set(startup);
  return startup;
};

module.exports = {
  Query: {
    totalStartups,
    allStartups,
    pickStartup,
    pickmeet,
    alleixo,
    allmeet,
  },

  Mutation: {
    newStartup,
  },
};
