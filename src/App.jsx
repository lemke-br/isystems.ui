import "./App.css";
import AppForm from "./AppForm";
import AppTable from "./AppTable";
import AppChart from "./AppChart";
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


const baseURL = "https://us-central1-case-participations.cloudfunctions.net/api/";

const App = () => {

  const [participations, setParticipations] = useState([]);

//read participants from api 

const getParticipants = async () =>{
  try{
  const recParticipations = await axios.get(`${baseURL}`);
  return recParticipations.data
  }
  catch(e){
    console.error("Error adding document: ", e.message);
  }
};

//delete participants from api 

const deleteParticipation = async (participation) =>{
  try{
  const delParticipations = await axios.delete(`${baseURL}`+participation.id);
  const participants = await getParticipants();
  setParticipations(participants);

  }
  catch(e){
    console.error("Error adding document: ", e.message);
  }
};

//update participants to api

const updateParticipation = async ({
  id,
  firstName,
  lastName,
  participation
}) => {
  try{
  await axios.put(`${baseURL}`+id,{
    id,
    firstName,
    lastName,
    participation
  });
    const participants = await getParticipants();
    setParticipations(participants);
  } catch(e){
  console.error("Error adding document: ", e.message);
};}

//create participants to api

const createParticipants = async ({
  firstName,
  lastName,
  participation
}) => {
  try{
  await axios.post(`${baseURL}`,{
    firstName,
    lastName,
    participation
  });
    const participants = await getParticipants();
    setParticipations(participants);
  } catch(e){
  console.error("Error adding document: ", e.message);
};}

useEffect(() => {
  getParticipants()
    .then((participations) => {
      if (participations) {
        setParticipations(participations ?? []);
      }
    })
    .catch((err) => console.log(err));
}, []);


return (
    <div className="App">
      <header className="App-header">
        <AppForm
          participations={participations}
          createParticipation={createParticipants}
         />
      </header>
      <h1>DATA</h1>
      <p>Tesfsdfsfds</p>
      <main style={{ marginTop: 32 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <AppTable
                participations={participations}
                updateParticipation={updateParticipation}
                deleteParticipation={deleteParticipation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppChart participations={participations} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default App;
