import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  loading: boolean
}

const initialState: CounterState = {
  value: 0,
  loading: false,
}

export const incrementAction = createAction<number>('counterSaga/incrementAction')
export const incrementActionRequest = createAction<void>('counterSaga/incrementActionRequest')
export const incrementActionSuccess = createAction<number>('counterSaga/incrementActionSuccess')
export const incrementActionError = createAction('counterSaga/incrementActionError')

export const counterSagaSlice = createSlice({
  name: 'counterSaga',
  initialState,
  reducers: {
    incrementSaga: (state, action: PayloadAction<number>) => ({ ...state, value: state.value + action.payload }),
    decrementSaga: (state, action: PayloadAction<number>) => ({ ...state, value: state.value - action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementActionRequest, (state) => {
        state.loading = true
      })
      .addCase(incrementActionSuccess, (state, action) => {
        state.value += action.payload
        state.loading = false
      })
      .addCase(incrementActionError, (state) => {
        state.value = -1
        state.loading = false
      })
  },
})

export const { incrementSaga, decrementSaga } = counterSagaSlice.actions
