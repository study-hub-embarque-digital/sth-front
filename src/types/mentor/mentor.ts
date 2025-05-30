export interface Mentor {
  id: string;
  usuarioDto: { nome: string };
  squadDtos: string | any[];
  empresaDto: { nomeFantasia: string };
  mentorId: string;
  nome: string;
  numeroSquads: string;
  empresa: string;
}
