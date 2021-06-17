import { applyMiddleware, createStore } from "redux";
import {Provider} from 'react-redux';
import rootreducer from './reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
const store =createStore(
    rootreducer,
    composeWithDevTools(applyMiddleware(thunk))
)
const Dataprovider=({children})=>{
  return(
      <Provider store={store}>
          {children}
      </Provider>
  )
}
export default Dataprovider