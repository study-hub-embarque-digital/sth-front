export interface IPostCard {
  userName: string,
  picture?: string,
  createdAt: string,
  title: string,
  content: string,
  tags: string[],
  viewCount: number,
  commentsCount: number,
  likesCount: number
}