import { catchError, delay, filter, from, map, Observable, of, switchMap, tap } from 'rxjs'
import {
  counterRxSlice,
  incrementRxAction,
  incrementRxActionError,
  incrementRxActionRequest,
  incrementRxActionRequestMultiple,
  incrementRxActionSuccess,
} from './features/counter/counterRxSlice'
import { RootEpic } from './store'
import { combineEpics } from 'redux-observable'
import axios from 'axios'

export const countEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(incrementRxAction.match),
    delay(500),
    map((action) => counterRxSlice.actions.incrementRx(action.payload))
  )

export const countRequestEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(incrementRxActionRequest.match),
    switchMap(() => {
      return from(axios.get('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1')).pipe(
        map((response) => response.data[0]),
        map((number) => incrementRxActionSuccess(number)),
        catchError(() => of(incrementRxActionError()))
      )
    })
  )

export const countRequestEpicMultiple: RootEpic = (action$) => {
  return action$.pipe(
    filter(incrementRxActionRequestMultiple.match),
    switchMap(() => {
      return new Observable<number>((subscriber) => {
        const subscription = from(
          axios.get<number[]>('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1')
        )
          .pipe(
            map((response) => response.data[0]),
            tap((result1) => {
              subscriber.next(result1)
            }),
            switchMap((number) =>
              from(
                axios.get<number[]>(
                  `http://www.randomnumberapi.com/api/v1.0/random?min=${number}&max=${number}&count=1`
                )
              ).pipe(map((response) => response.data[0]))
            )
          )
          .subscribe((response) => {
            subscriber.next(response)
            subscription.unsubscribe()
          })
      }).pipe(
        tap(console.log),
        map((number) => incrementRxActionSuccess(number)),
        catchError(() => of(incrementRxActionError()))
      )
    })
  )
}
export default combineEpics(countEpic, countRequestEpic, countRequestEpicMultiple)
