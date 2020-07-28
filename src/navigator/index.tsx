import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from 'screens/Landing'
import AdminLogin from 'screens/AdminLogin'
import AdminHome from 'screens/AdminHome'
import VisitorInput from 'screens/VisitorInput'
import Questions from 'screens/Questions'
import Result, { ParamsList as ResultParamsList } from 'screens/Result'
const { Navigator, Screen } = createStackNavigator()

export type RootStackParamsList = {
  Landing: undefined
  AdminLogin: undefined
  AdminHome: undefined
  VisitorInput: undefined
  Questions: undefined
  Result: ResultParamsList
}

export default () => (
  <NavigationContainer>
    <Navigator headerMode="none" initialRouteName="AdminHome">
      <Screen name="Landing" component={Landing} />
      <Screen name="AdminLogin" component={AdminLogin} />
      <Screen name="AdminHome" component={AdminHome} />
      <Screen name="VisitorInput" component={VisitorInput} />
      <Screen name="Questions" component={Questions} />
      <Screen name="Result" component={Result} />
    </Navigator>
  </NavigationContainer>
)
