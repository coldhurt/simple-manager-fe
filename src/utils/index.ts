import { message } from 'antd'

const postOptions = {
  method: 'POST',
  body: '',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

export interface IResponseJSON {
  success: boolean
  msg?: string
  data: any
}

interface IResolve {
  (json: IResponseJSON): void
}

const Post = (url: string, body: Object) => {
  return new Promise(function(resolve: IResolve, reject: Function) {
    fetch(url, {
      ...postOptions,
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        } else {
          return res.json()
        }
      })
      .then((json: IResponseJSON) => resolve(json))
      .catch(err => {
        if (err) {
          message.error(err.message)
        }
      })
  })
}

export { Post }
