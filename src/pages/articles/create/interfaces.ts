export interface INewArticleDto {
  titulo: string,
  conteudo: string,
  tags: string[]
}

export interface ICreatedArticleDto {
  artigoId: string,
  titulo: string
}