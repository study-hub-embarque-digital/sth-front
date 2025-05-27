import { IFormField } from "../../../../components/shared/forms/IFormField";

export const mentorDetailsFields: IFormField[] = [
  // Dados do usuário
  { name: "nome", label: "Nome", type: "text" },
  { name: "email", label: "E-mail", type: "text" },
  { name: "dataNascimento", label: "Data de Nascimento", type: "date" },
  {
    name: "ethnicity",
    label: "Etnia",
    type: "select",
    options: [
      { label: "Preto", value: "PRETO" },
      { label: "Pardo", value: "PARDO" },
      { label: "Branco", value: "BRANCO" },
      { label: "Indígena", value: "INDIGENA" },
      { label: "Amarelo", value: "AMARELO" },
      { label: "Outros", value: "OUTROS" },
      { label: "Prefiro não informar", value: "NAO_INFORMAR" },
    ],
  },
  { name: "phone", label: "Telefone", type: "text" },
  {
    name: "gender",
    label: "Gênero",
    type: "select",
    options: [
      { label: "Mulher Cis", value: "MULHER_CIS" },
      { label: "Homem Cis", value: "HOMEM_CIS" },
      { label: "Mulher Trans", value: "MULHER_TRANS" },
      { label: "Homem Trans", value: "HOMEN_TRANS" },
      { label: "Não Binário", value: "NAO_BINARIO" },
      { label: "Outros", value: "OUTROS" },
      { label: "Prefiro não informar", value: "NAO_INFORMAR" },
    ],
  },
  {
    name: "empresa",
    label: "Nome da empresa",
    type: "text"
  },
  {
    name: "cnpj",
    label: "CNPJ",
    type: "text"
  },
  {
    name: "squads",
    label: "Squads (separados por vírgula)",
    type: "text"
  },

  {
    name: "isActive",
    label: "Está ativo no programa?",
    type: "checkbox",
  },
];


export const mentorSingupFields: IFormField[] = [
  { name: "usuarioDto.nome", label: "Nome", type: "text", required: true },
  { name: "usuarioDto.email", label: "E-mail", type: "text", required: true },
  { name: "usuarioDto.senha", label: "Senha", type: "password", required: true }, // <- novo
  { name: "usuarioDto.dataNascimento", label: "Data de Nascimento", type: "date", required: true },
  {
    name: "usuarioDto.ethnicity",
    label: "Etnia",
    type: "select",
    required: true,
    options: [
      { label: "Preto", value: "PRETO" },
      { label: "Pardo", value: "PARDO" },
      { label: "Branco", value: "BRANCO" },
      { label: "Indígena", value: "INDIGENA" },
      { label: "Amarelo", value: "AMARELO" },
      { label: "Outros", value: "OUTROS" },
      { label: "Prefiro não informar", value: "NAO_INFORMAR" },
    ]
  },
  { name: "usuarioDto.phone", label: "Telefone", type: "text", required: true },
  {
    name: "usuarioDto.gender",
    label: "Gênero",
    type: "select",
    options: [
      { label: "Mulher Cis", value: "MULHER_CIS" },
      { label: "Homem Cis", value: "HOMEM_CIS" },
      { label: "Mulher Trans", value: "MULHER_TRANS" },
      { label: "Homem Trans", value: "HOMEN_TRANS" },
      { label: "Não Binário", value: "NAO_BINARIO" },
      { label: "Outros", value: "OUTROS" },
      { label: "Prefiro não informar", value: "NAO_INFORMAR" },
    ],
    required: true
  },
  { name: "usuarioDto.isActive", label: "Está ativo no programa?", type: "checkbox", required: true },
];
