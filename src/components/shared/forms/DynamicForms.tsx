import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { IFormField } from "./IFormField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import ptBR from "date-fns/locale/pt-BR";
import { CloudUpload } from "@mui/icons-material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";


interface Button {
  textButton: string;
  icon: React.ReactNode;
  permission: boolean;
  onClickAdd: () => void;
}
interface DynamicFormProps {
  fields: IFormField[];
  initialValues?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void;
  hasPermission?: boolean;
  button?: Button;
}

export const DynamicForms: React.FC<DynamicFormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  hasPermission,
  button
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [editable, setEditable] = useState(!Object.keys(initialValues).length);
  const navigate = useNavigate();


  useEffect(() => {
    if (!editable) {
      setFormData(initialValues);
    }
  }, [initialValues, editable]);

  const getValue = (obj: any, path: string): any =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setEditable(false);
  };

  return (
    <>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: 1000,
          margin: "0 auto",
          padding: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: '100%', gap: 2 }}>
          {button && (
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              endIcon={button.icon}
              onClick={button.onClickAdd}
            >
              {button.textButton}
            </Button>
          )}
          {hasPermission && Object.keys(initialValues).length > 0 && (
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              endIcon={<EditRoundedIcon />}
              onClick={() => setEditable((prev) => !prev)}
            >
              {editable ? "Cancelar" : "Editar"}
            </Button>
          )}

        </Box>
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
              {field.type === "text" ||
                field.type === "number" ||
                field.type === "password" ? (
                <TextField
                  color="secondary"
                  fullWidth
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  value={getValue(formData, field.name) ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={!editable || field.disabledOnEdit}
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
                  value={getValue(formData, field.name) ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={!editable || field.disabledOnEdit}
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
                      checked={getValue(formData, field.name) ?? false}
                      onChange={handleChange}
                      name={field.name}
                      disabled={!editable || field.disabledOnEdit}
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
                  }
                  label={field.label}
                />
              ) : (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
                  <DatePicker
                    label={field.label}
                    maxDate={new Date()}
                    value={
                      getValue(formData, field.name)
                        ? new Date(getValue(formData, field.name))
                        : null
                    }
                    onChange={(newValue) => {
                      if (!editable) return;
                      setFormData({
                        ...formData,
                        [field.name]: newValue,
                      });
                    }}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        helperText: 'DD/MM/YYYY',
                        color: "secondary",
                        disabled: !editable || field.disabledOnEdit,
                        fullWidth: true,
                      },

                    }}
                  />
                </LocalizationProvider>
              )}
            </Box>
          ))}
        </Box>

        {editable && (
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => {
                if (Object.keys(initialValues).length === 0) {
                  navigate(-1);
                }
                setFormData(initialValues);
                setEditable(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Salvar
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
