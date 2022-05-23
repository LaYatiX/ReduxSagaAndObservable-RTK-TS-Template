import createSagaMiddleware from 'redux-saga'

import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSagaSlice } from './features/counter/counterSagaSlice';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { counterRxSlice } from './features/counter/counterRxSlice';
import rootEpic from './rootEpic';
import rootSaga from './rootSaga';

const reducer = combineReducers({
  counterRx: counterRxSlice.reducer,
  counterSaga: counterSagaSlice.reducer
});

export type RootState = ReturnType<typeof reducer>;
export type RootEpic = Epic<AnyAction, AnyAction, RootState>;

const sagaMiddleware = createSagaMiddleware()
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware, epicMiddleware]
})

sagaMiddleware.run(rootSaga)
epicMiddleware.run(rootEpic);

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
