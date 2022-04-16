import "./App.css";
import AppForm from "./AppForm";
import AppTable from "./AppTable";
import AppChart from "./AppChart";
import { CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import FirebaseService from "./services/firebase.service";
import APIService from "./services/api.service";

const App = () => {
  // const ParticipationService = FirebaseService;
  const ParticipationService = APIService;

  const [participations, setParticipations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createParticipation = async ({
    firstName,
    lastName,
    participation,
  }) => {
    await ParticipationService.createParticipation({
      firstName,
      lastName,
      participation,
    });

    const participations = await ParticipationService.getAllParticipations();

    setParticipations(participations);
  };

  const updateParticipation = async (participation) => {
    await ParticipationService.updateParticipation(participation.id, {
      firstName: participation.firstName,
      lastName: participation.lastName,
      participation: participation.participation,
    });

    const participations = await ParticipationService.getAllParticipations();
    setParticipations(participations);
  };

  const deleteParticipation = async (participationId) => {
    setIsLoading(true);
    await ParticipationService.deleteParticipation(participationId);
    const participations = await ParticipationService.getAllParticipations();
    setParticipations(participations);
    setIsLoading(false);
    toast.success("Participação deletada com sucesso!");
  };

  useEffect(() => {
    ParticipationService.getAllParticipations()
      .then((participations) => {
        if (participations) {
          setParticipations(participations ?? []);
        }
      })
      .catch((err) => console.log(err));
  }, [ParticipationService]);

  return (
    <div className="App">
      <header className="App-header">
        <AppForm
          participations={participations}
          createParticipation={createParticipation}
        />
      </header>
      <h1>Sociedade</h1>
      <p>Quadro societário e investidores da empresa</p>
      <main style={{ marginTop: 32 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <AppTable
                  participations={participations}
                  updateParticipation={updateParticipation}
                  deleteParticipation={deleteParticipation}
                />
              )}
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
