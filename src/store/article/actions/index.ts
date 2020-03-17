import {
  FETCH_ARTICLES,
  IArticle,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILED
} from '../types'

export function fetchArticles() {
  return { type: FETCH_ARTICLES }
}

export function fetchArticlesSuccess(articles: IArticle[]) {
  return { type: FETCH_ARTICLES_SUCCESS, articles }
}

export function fetchArticlesFailed(error: string) {
  return { type: FETCH_ARTICLES_FAILED, error }
}
