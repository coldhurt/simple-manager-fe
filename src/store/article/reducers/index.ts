import {
  IArticleState,
  IArticleAction,
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILED
} from '../types'

export const ARTICLES_DEFAULT_STATE: IArticleState = {
  loading: false,
  saving: false,
  error: '',
  articles: []
}

export default function articlesReducer(
  state: IArticleState = ARTICLES_DEFAULT_STATE,
  action: IArticleAction
): IArticleState {
  switch (action.type) {
    case FETCH_ARTICLES: {
      return { ...state, loading: true }
    }
    case FETCH_ARTICLES_SUCCESS: {
      return { ...state, loading: false, articles: action.data }
    }
    case FETCH_ARTICLES_FAILED: {
      return { ...state, loading: false, error: action.error }
    }
    default:
      return state
  }
}
