export interface IFormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "password";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  accept?: string; // <- Para arquivos
  disabledOnEdit?: boolean; // <-- nova propriedade
}
