import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Questions from 'screens/Questions'

const { Navigator, Screen } = createStackNavigator()

export default () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="Questions" component={Questions} />
    </Navigator>
  </NavigationContainer>
)
