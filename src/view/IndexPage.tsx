import * as React from 'react'

function Index() {
  React.useEffect(() => {
    window.location.href = '/NewIM'
  })
  return <div></div>
}

export default {
  name: 'Index',
  // reducers: userReducer,
  view: Index,
}
