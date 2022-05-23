import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  loading: boolean
}

const initialState: CounterState = {
  value: 0,
  loading: false,
}

export const incrementRxAction = createAction<number>('counterRx/incrementAction')
export const incrementRxActionRequest = createAction<void>('counterRx/incrementActionRequest')
export const incrementRxActionSuccess = createAction<number>('counterRx/incrementActionSuccess')
export const incrementRxActionError = createAction('counterRx/incrementActionError')

export const incrementRxActionRequestMultiple = createAction<void>('counterRx/incrementRxActionRequestMultiple')

export const counterRxSlice = createSlice({
  name: 'counterRx',
  initialState,
  reducers: {
    incrementRx: (state, action: PayloadAction<number>) => ({
      ...state,
      value: state.value + action.payload,
    }),
    decrementRx: (state, action: PayloadAction<number>) => ({
      ...state,
      value: state.value - action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementRxActionRequest, (state) => {
        state.loading = true
      })
      .addCase(incrementRxActionSuccess, (state, action) => {
        state.value += action.payload
        state.loading = false
      })
      .addCase(incrementRxActionError, (state) => {
        state.value = -1
        state.loading = false
      })
  },
})

export const { incrementRx, decrementRx } = counterRxSlice.actions
