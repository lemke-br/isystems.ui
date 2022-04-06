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

const AppForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [percents, setPercents] = useState(0);
 
  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", participation: "" },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("Primeiro nome é obrigatório"),
      lastName: Yup.string().required("Sobrenome é obrigatório"),
      participation: Yup.number()
        .required("Participação é obrigatório")
        .min(0, "O mínimo possível é 0")
        .max(100, "O máximo possível é 100"),
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
                  className="Input-data"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
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
                  className="Input-data"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
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
                  className="Input-data"
                  id="participation"
                  type="number"
                  placeholder="Participation"
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
                {isLoading ? <CircularProgress /> : "SEND"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
};

export default AppForm;
