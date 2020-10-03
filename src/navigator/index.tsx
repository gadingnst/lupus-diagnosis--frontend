import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Splash from 'screens/Splash'
import Landing from 'screens/Landing'
import AdminLogin from 'screens/AdminLogin'
import AdminHome from 'screens/AdminHome'
import ManageIndication from 'screens/ManageIndication'
import VisitorInput from 'screens/VisitorInput'
import Questions from 'screens/Questions'
import Result, { ParamsList as ResultParamsList } from 'screens/Result'
import FeedbackInput from 'screens/FeedbackInput'
import Feedback from 'screens/Feedback'

const { Navigator, Screen } = createStackNavigator()

export type RootStackParamsList = {
  Splash: undefined
  Admin: undefined
  Guest: undefined
  Landing: undefined
  AdminLogin: undefined
  AdminHome: undefined
  ManageIndication: undefined
  VisitorInput: undefined
  Questions: undefined
  Result: ResultParamsList
  FeedbackInput: undefined
  Feedback: undefined
}

export const Admin = () => (
  <Navigator headerMode="none" initialRouteName="AdminHome">
    <Screen name="AdminHome" component={AdminHome} />
    <Screen name="Feedback" component={Feedback} />
    <Screen name="ManageIndication" component={ManageIndication} />
  </Navigator>
)

export const Guest = () => (
  <Navigator headerMode="none" initialRouteName="Landing">
    <Screen name="Landing" component={Landing} />
    <Screen name="AdminLogin" component={AdminLogin} />
    <Screen name="VisitorInput" component={VisitorInput} />
    <Screen name="Questions" component={Questions} />
    <Screen name="Result" component={Result} />
    <Screen name="FeedbackInput" component={FeedbackInput} />
  </Navigator>
)

export default () => (
  <NavigationContainer>
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Admin" component={Admin} />
      <Screen name="Guest" component={Guest} />
    </Navigator>
  </NavigationContainer>
)
