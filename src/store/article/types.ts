export const FETCH_ARTICLES = 'FETCH_ARTICLES'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILED = 'FETCH_ARTICLES_FAILED'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS'
export const ADD_ARTICLE_FAILED = 'ADD_ARTICLE_FAILED'
export const DELETE_ARTICLES = 'DELETE_ARTICLES'
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
export const DETAIL_ARTICLES = 'DETAIL_ARTICLES'

export interface IArticle {
  _id?: string
  title: string
  author?: string
  content?: string
  createdAt?: string
}

export interface IArticleState {
  articles: IArticle[]
  loading: boolean
  saving: boolean
  error: string
}

export interface IAddArticleAction {
  type: typeof ADD_ARTICLE
  data: IArticle
}

export interface IFetchArticleAction {
  type: typeof FETCH_ARTICLES
}
export interface IFetchArticleSuccessAction {
  type: typeof FETCH_ARTICLES_SUCCESS
  data: IArticle[]
}

export interface IFetchArticleFailedAction {
  type: typeof FETCH_ARTICLES_FAILED
  error: string
}

export type IArticleAction =
  | IAddArticleAction
  | IFetchArticleAction
  | IFetchArticleSuccessAction
  | IFetchArticleFailedAction
  | IAddArticleAction
