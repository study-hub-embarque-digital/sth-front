import { IFormField } from "../../../../components/shared/forms/IFormField";

export const getAlunoFields = (instituicoes: any[]): IFormField[] => [
  { name: "novoUsuarioDto.nome", label: "Nome", type: "text", required: true },
  { name: "novoUsuarioDto.email", label: "Email", type: "text", required: true },
  { name: "novoUsuarioDto.senha", label: "Senha", type: "password", required: true },
  { name: "novoUsuarioDto.dataNascimento", label: "Data de Nascimento", type: "date", required: true },
  {
    name: "novoUsuarioDto.ethnicity",
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
    required: true,
  },
  { name: "novoUsuarioDto.phone", label: "Telefone", type: "text", required: true },
  {
    name: "novoUsuarioDto.gender",
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
    required: true,
  },
  {
    name: "periodo",
    label: "Período",
    type: "select",
    options: [
      { label: "1º", value: "PRIMEIRO" },
      { label: "2º", value: "SEGUNDO" },
      { label: "3º", value: "TERCEIRO" },
      { label: "4º", value: "QUARTO" },
      { label: "5º", value: "QUINTO" },
      { label: "6º", value: "SEXTO" },
      { label: "7º", value: "SETIMO" },
      { label: "8º", value: "OITAVO" },
      { label: "9º", value: "NONO" },
      { label: "10º", value: "DECIMO" },
    ],
    required: true,
  },
  {
    name: "curso",
    label: "Curso",
    type: "select",
    required: true,
    options: [
      { value: "ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS", label: "Análise e Desenvolvimento de Sistemas" },
      { value: "SISTEMAS_PARA_INTERNET", label: "Sistemas para Internet" }
    ]
  },
  {
    name: "instituicaoEnsinoId",
    label: "Instituição",
    type: "select",
    required: true,
    options: instituicoes.map((inst) => ({
      value: inst.instituicaoEnsinoId,
      label: inst.nome ?? "(Sem nome)",
    })),
  },
  {
    name: "ciclo",
    label: "Ciclo",
    type: "select",
    options: [
      { label: "Kick Off", value: "KICK_OFF" },
      { label: "Rise Up", value: "RISE_UP" },
      { label: "Grow Up", value: "GROW_UP" },
      { label: "Take Off", value: "TAKE_OFF" },
    ],
    required: true,
  },
  {
    name: "entrada",
    label: "Entrada",
    type: "text",
    required: true,
  },
  {
    name: "isWorkingInIt",
    label: "Trabalha na área de TI?",
    type: "checkbox",
  },
  {
    name: "novoUsuarioDto.isActive",
    label: "Está ativo no programa?",
    type: "checkbox",
  },
  {
    name: "isExemptedResidence",
    label: "Isento de residência?",
    type: "checkbox",
  },
];

export const studentDetailsFields: IFormField[] = [
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
  { name: "curso", label: "Curso", type: "text" },
  { name: "instituicaoEnsinoId", label: "Instituição de Ensino", type: "text" },
  {
    name: "periodo",
    label: "Período",
    type: "select",
    options: [
      { label: "1º", value: "PRIMEIRO" },
      { label: "2º", value: "SEGUNDO" },
      { label: "3º", value: "TERCEIRO" },
      { label: "4º", value: "QUARTO" },
      { label: "5º", value: "QUINTO" },
      { label: "6º", value: "SEXTO" },
      { label: "7º", value: "SETIMO" },
      { label: "8º", value: "OITAVO" },
      { label: "9º", value: "NONO" },
      { label: "10º", value: "DECIMO" },
    ],
  },
  {
    name: "ciclo",
    label: "Ciclo",
    type: "select",
    options: [
      { label: "Kick Off", value: "KICK_OFF" },
      { label: "Rise Up", value: "RISE_UP" },
      { label: "Grow Up", value: "GROW_UP" },
      { label: "Take Off", value: "TAKE_OFF" },
    ],
  },
  {
    name: "isWorkingInIt",
    label: "Trabalha na área de TI?",
    type: "checkbox",
  },
  {
    name: "isExemptedResidence",
    label: "Isento de residência?",
    type: "checkbox",
  },
  {
    name: "isActive",
    label: "Está ativo no programa?",
    type: "checkbox",
  },
];

function useState(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
