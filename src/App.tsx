import { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import AppRoutes from './routes'
import {
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <div className='container'>
            <AppRoutes />
          </div>
        </BrowserRouter>
      </Provider>
    </Fragment >
  )
}

export default App