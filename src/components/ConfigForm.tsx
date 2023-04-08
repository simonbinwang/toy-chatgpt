import React from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TConfig } from "../store/ConfigStore";

interface ConfigFormProps {
  defaultValue: TConfig;
  onChange: (values: TConfig) => void;
}

const validationSchema = Yup.object().shape({
  azure: Yup.object({
    endpoint: Yup.string().url("Invalid URL").required("Endpoint is required"),
    apikey: Yup.string().required("Api key is required"),
  }),
});

export const ConfigForm = ({ defaultValue, onChange }: ConfigFormProps) => {
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: (values) => {
      onChange(values);
      console.log("Form values: ", values);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="azure.endpoint"
              label="Endpoint"
              value={formik.values.azure.endpoint}
              onChange={formik.handleChange}
              error={
                formik.touched.azure?.endpoint &&
                Boolean(formik.errors.azure?.endpoint)
              }
              helperText={
                formik.touched.azure?.endpoint && formik.errors.azure?.endpoint
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="azure.apikey"
              label="Api key"
              value={formik.values.azure.apikey}
              onChange={formik.handleChange}
              error={
                formik.touched.azure?.apikey &&
                Boolean(formik.errors.azure?.apikey)
              }
              helperText={
                formik.touched.azure?.apikey && formik.errors.azure?.apikey
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
