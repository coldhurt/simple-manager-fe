// import { toast } from 'react-toastify'
import { message } from 'antd'

const postOptions = {
  // host: '',
  method: 'POST',
  body: '',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
}

export interface IResponseJSON {
  success: boolean
  msg?: string
  data: any
  code?: number
}

interface IResolve {
  (json: IResponseJSON): void
}

const Post = (url: string, body = {}) => {
  return new Promise(function (resolve: IResolve, reject: Function) {
    fetch(url, {
      ...postOptions,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        } else {
          return res.json()
        }
      })
      .then((json: IResponseJSON) => {
        if (json.success === false) {
          // need login
          if (json.code === 401) {
            const location = window.location
            location.href = `/login?url=${location.origin}${location.pathname}`
          }
          if (json.msg) {
            reject(new Error(json.msg))
            // message.error(json.msg)
          }
        } else {
          resolve(json)
        }
      })
      .catch((err) => {
        if (err) {
          message.error(err.message)
        }
      })
  })
}

const getIdsAndMapData = <T extends { _id: string }>(
  data: T[]
): [string[], Record<string, T>] => {
  const ids = []
  const res: Record<string, T> = {}
  for (const item of data) {
    if (item._id) {
      ids.push(item._id)
      res[item._id] = item
    }
  }
  return [ids, res]
}

const getLocalStorage = (k: string) => {
  if (localStorage) return localStorage.getItem(k)
}

const setLocalStorage = (k: string, v: string) => {
  if (localStorage) return localStorage.setItem(k, v)
}

const BASE_WIDTH = 375
const BASE_HEIGHT = 667
const pxToVw = (px: number) => {
  return px / (BASE_WIDTH / 100) + 'vw'
}

const pxToVh = (px: number) => {
  return px / (BASE_HEIGHT / 100) + 'vh'
}

export {
  Post,
  getIdsAndMapData,
  getLocalStorage,
  setLocalStorage,
  message as toast,
  pxToVw,
  pxToVh,
}
