import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, FormControlLabel, Button, Box } from "@mui/material";
import { IFormField } from "./IFormField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR';
import { CloudUpload } from '@mui/icons-material'

interface DynamicFormProps {
  fields: IFormField[]; // Lista de campos do formulário
  initialValues?: Record<string, any>; // Dados iniciais para edição
  isEditable?: boolean;
  onSubmit: (formData: Record<string, any>) => void; // Callback quando enviar
}

export const DynamicForms: React.FC<DynamicFormProps> = ({ fields, initialValues = {}, onSubmit, isEditable = true }) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, []);
  

  const getValue = (obj: any, path: string): any =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    const newData = { ...formData };

    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
    setFormData(newData);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centraliza tudo
        gap: 4,
        width: "100%",
        maxWidth: 1000, // largura máxima
        margin: "0 auto", // centraliza horizontalmente
        padding: 4,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
          width: "100%",
        }}
      >
        {fields.map((field) => (
          <Box key={field.name}>
            {field.type === "text" || field.type === "number" || field.type === 'password' ? (
              <TextField
                color="secondary"
                fullWidth
                label={field.label}
                type={field.type}
                name={field.name}
                value={getValue(formData, field.name) || ""}
                onChange={handleChange}
                required={field.required}
                disabled={!isEditable}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: "#000",
                    WebkitTextFillColor: "#000",
                    opacity: 1,
                  },
                  "& .MuiInputLabel-root.Mui-disabled": {
                    color: "#000",
                    opacity: 1,
                  },
                }}
              />
            ) : field.type === "select" ? (
              <TextField
                color="secondary"
                select
                fullWidth
                label={field.label}
                name={field.name}
                value={getValue(formData, field.name) || ""}
                onChange={handleChange}
                required={field.required}
                disabled={!isEditable}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : field.type === "checkbox" ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={getValue(formData, field.name) || false}
                    onChange={handleChange}
                    name={field.name}
                    disabled={!isEditable}
                  />
                }
                label={field.label}
              />
            ) : (
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                  label={field.label}
                  value={getValue(formData, field.name) || null}
                  onChange={(newValue) => {
                    if (!isEditable) return;
                    setFormData({
                      ...formData,
                      [field.name]: newValue,
                    });
                  }}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      color: "secondary",
                      disabled: !isEditable,
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          </Box>
        ))}
      </Box>

      {isEditable && (
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      )}
    </Box>
  );

};
