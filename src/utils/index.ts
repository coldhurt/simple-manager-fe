import { message } from 'antd'

const postOptions = {
  host: 'localhost:4000',
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
      .then((json: IResponseJSON) => {
        if (json.msg === 'need login') {
          const location = window.location
          location.href = `/login?url=${location.origin}${location.pathname}`
        } else {
          resolve(json)
        }
      })
      .catch(err => {
        if (err) {
          message.error(err.message)
        }
      })
  })
}

export { Post }
