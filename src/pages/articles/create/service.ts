import { httpClient } from "../../../api/api";
import { ICreatedArticleDto, INewArticleDto } from "./interfaces";

export const postArticle = async (newArticleDto: INewArticleDto) => {
  const response = await httpClient.post('/artigo', newArticleDto);

  if (response.status != 201) {
    return {
      success: false,
      error: response.data
    }
  }

  return {
    success: true,
    data: response.data as ICreatedArticleDto
  }
}