import * as React from 'react'
import { ReactReduxContext } from 'react-redux'
import './lazy.css'
import Skeleton from '@material-ui/core/CircularProgress'

interface ILazyProps {
  resolve(): Promise<any>
}

interface ILazyState {
  module: any
  hasError: Error | null
}

export default class LazyLoadModule extends React.Component<
  ILazyProps,
  ILazyState
> {
  // add this to access store from this.context
  static contextType = ReactReduxContext

  constructor(props: ILazyProps) {
    super(props)
    this.state = {
      module: null,
      hasError: null,
    }
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: error })
  }

  async componentDidMount() {
    try {
      const { resolve } = this.props
      const { default: module } = await resolve()
      const { name, reducers } = module
      const { store } = this.context
      if (name && store && reducers) store.addDynamicModule({ name, reducers })
      this.setState({ module })
    } catch (error) {
      this.setState({ hasError: error })
    }
  }

  componentWillUnmount() {
    const { module } = this.state
    const { store } = this.context
    const { name } = module
    if (store && name) store.removeDynamicModule(name)
  }
  render() {
    const { module, hasError } = this.state as ILazyState
    const { resolve, ...rest } = this.props
    if (hasError) return <div>{hasError.message}</div>
    if (!module)
      return (
        // <div className='lds-ripple'>
        //   <div />
        // </div>
        <Skeleton />
      )

    if (module.view) return React.createElement(module.view, rest)

    return <div>Module loaded</div>
  }
}
