import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Questions from 'screens/Questions'
import Result, { ParamsList as ResultParamsList } from 'screens/Result'

const { Navigator, Screen } = createStackNavigator()

export type RootStackParamsList = {
  Questions: undefined
  Result: ResultParamsList
}

export default () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      <Screen name="Questions" component={Questions} />
      <Screen name="Result" component={Result} />
    </Navigator>
  </NavigationContainer>
)
