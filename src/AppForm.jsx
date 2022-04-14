import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  CircularProgress,
  Container,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AppForm = ({
  selectedParticipant,
  participations,
  createParticipation,
  updateParticipation,
  handleModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [percents, setPercents] = useState(0);

  useEffect(() => {
    let sum = 0;
    participations.forEach((item) => {
      sum += item.participation;
    });
    setPercents(sum);
  }, [participations]);

  const formik = useFormik({
    initialValues: {
      firstName: selectedParticipant?.firstName ?? "",
      lastName: selectedParticipant?.lastName ?? "",
      participation: selectedParticipant?.participation ?? "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const participationBody = {
        id: selectedParticipant?.id,
        firstName: values.firstName,
        lastName: values.lastName,
        participation: values.participation,
      };

      try {
        if (selectedParticipant) {
          await updateParticipation(participationBody);
          handleModal();
          toast.success("Participação atualizada com sucesso!");
        } else {
          await createParticipation(participationBody);
          toast.success("Participação criada com sucesso!");
        }
        setIsLoading(false);
        resetForm({ values: "" });
      } catch (error) {
        console.log(error?.message);
        setIsLoading(false);
        resetForm({ values: "" });
        toast.error("Ops! Algo deu errado, tente novamente.");
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Primeiro nome é obrigatório"),
      lastName: Yup.string().required("Sobrenome é obrigatório"),
      participation: Yup.number()
        .required("Participação é obrigatório")
        .min(0, "O mínimo possível é 0")
        .max(99, "O máximo possível é 99"),
    }),
  });

  return (
    <div style={{ padding: 32 }}>
      <form onSubmit={formik.handleSubmit}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  id="firstName"
                  type="text"
                  placeholder="Primeiro Nome"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <FormHelperText>
                  {formik.errors.firstName &&
                    formik.touched.firstName &&
                    formik.errors.firstName}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  id="lastName"
                  type="text"
                  placeholder="Sobrenome"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                <FormHelperText>
                  {formik.errors.lastName &&
                    formik.touched.lastName &&
                    formik.errors.lastName}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl>
                <TextField
                  id="participation"
                  type="number"
                  placeholder="Participação"
                  name="participation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.participation}
                />
                <FormHelperText>
                  {formik.errors.participation &&
                    formik.touched.participation &&
                    formik.errors.participation}
                </FormHelperText>
              </FormControl>
              <span style={{ color: "black", fontSize: 16 }}>
                Disponível: {100 - percents} %
              </span>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                disabled={
                  +percents + +formik.values.participation > 100 ||
                  !!formik.errors.firstName ||
                  !!formik.errors.lastName ||
                  !!formik.errors.participation
                }
                type="submit"
                variant="contained"
                size="medium"
                style={{ marginTop: 8 }}
              >
                {isLoading ? <CircularProgress /> : "Enviar"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
};

export default AppForm;
