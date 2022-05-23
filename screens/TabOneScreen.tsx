import { Button, StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {
  decrementSaga,
  incrementAction,
  incrementActionRequest,
  incrementSaga,
} from '../store/features/counter/counterSagaSlice'
import {
  decrementRx,
  incrementRx,
  incrementRxAction,
  incrementRxActionRequest,
  incrementRxActionRequestMultiple,
} from '../store/features/counter/counterRxSlice'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const dispatch = useDispatch()
  const counterSaga = useSelector((state: RootState) => state.counterSaga.value)
  const loadingSaga = useSelector((state: RootState) => state.counterSaga.loading)

  const counterRx = useSelector((state: RootState) => state.counterRx.value)
  const loadingRx = useSelector((state: RootState) => state.counterRx.loading)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>counterSaga</Text>
      {loadingSaga && <Text style={styles.title}>Ładowanie</Text>}
      <Text style={styles.title}>{counterSaga}</Text>

      <Button title={'Increment saga request'} onPress={() => dispatch(incrementActionRequest())}></Button>
      <Button title={'Increment saga 12'} onPress={() => dispatch(incrementAction(12))}></Button>
      <Button title={'Increment 2'} onPress={() => dispatch(incrementSaga(2))}></Button>
      <Button title={'Decrement 5'} onPress={() => dispatch(decrementSaga(5))}></Button>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>counterRx</Text>
      {loadingRx && <Text style={styles.title}>Ładowanie</Text>}
      <Text style={styles.title}>{counterRx}</Text>

      <Button
        title={'Increment rx request multiple'}
        onPress={() => dispatch(incrementRxActionRequestMultiple())}
      ></Button>
      <Button title={'Increment rx request'} onPress={() => dispatch(incrementRxActionRequest())}></Button>
      <Button title={'Increment rx 12'} onPress={() => dispatch(incrementRxAction(12))}></Button>
      <Button title={'Increment 2'} onPress={() => dispatch(incrementRx(2))}></Button>
      <Button title={'Decrement 5'} onPress={() => dispatch(decrementRx(5))}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
