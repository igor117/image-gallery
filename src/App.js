import React from 'react'
import { compose } from 'recompose'
import { Route, Switch, withRouter } from 'react-router-dom'
import WithErrors from './hocs/WithErrors'
import TestContainer from './containers/TestContainer'

const App = () => (
  <Switch>    
    <Route exact path="/" component={TestContainer} />
  </Switch>
)

export default compose(
  WithErrors,
  withRouter,
)(App)
