import { IPostCard } from "./components/post-card/intefaces";

const mockedPosts: IPostCard[] = [
  {
    userName: "Ana Souza",
    picture: "https://randomuser.me/api/portraits/women/65.jpg",
    createdAt: "2025-05-07T14:30:00Z",
    title: "Como comecei com .NET e o que aprendi",
    content: "Compartilho como comecei no mundo .NET, principais desafios, padrões como SOLID, e dicas para quem está iniciando. Foi um aprendizado valioso!",
    tags: ["dotnet", "carreira", "backend"],
    viewCount: 482,
    commentsCount: 12,
    likesCount: 96
  },
  {
    userName: "Lucas Ferreira",
    picture: "https://randomuser.me/api/portraits/men/43.jpg",
    createdAt: "2025-05-06T18:15:00Z",
    title: "Vue.js: Melhores práticas em componentes",
    content: "Evitar lógica duplicada, usar slots com parcimônia e dividir componentes grandes são boas práticas para manter seu projeto escalável e organizado.",
    tags: ["vue", "frontend", "boaspraticas"],
    viewCount: 311,
    commentsCount: 7,
    likesCount: 52
  },
  {
    userName: "Marina Lopes",
    createdAt: "2025-05-05T10:00:00Z",
    title: "Trabalhando com Dapper e consultas complexas",
    content: "Dapper é leve e rápido, mas exige cuidado em consultas mais elaboradas. Veja como montei joins e projeções sem abrir mão da legibilidade.",
    tags: ["dapper", "dotnet", "orm"],
    viewCount: 189,
    commentsCount: 3,
    likesCount: 34
  },
  {
    userName: "Rafael Lima",
    picture: "https://randomuser.me/api/portraits/men/78.jpg",
    createdAt: "2025-05-04T21:45:00Z",
    title: "Como testamos microsserviços com resiliência",
    content: "Utilizamos Polly com HttpClient, simulação de falhas com chaos engineering e testes de integração para garantir resiliência no ecossistema.",
    tags: ["microsserviços", "resiliência", "qa"],
    viewCount: 274,
    commentsCount: 5,
    likesCount: 41
  },
  {
    userName: "Juliana Martins",
    createdAt: "2025-05-03T09:20:00Z",
    title: "Organizando seu repositório com arquitetura limpa",
    content: "Explico como organizar diretórios, camadas de domínio, aplicação e infraestrutura usando Clean Architecture com exemplos práticos.",
    tags: ["arquitetura", "clean", "boaspraticas", "testes", "springboot"],
    viewCount: 502,
    commentsCount: 14,
    likesCount: 112
  }
];

export { mockedPosts }