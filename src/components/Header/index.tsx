import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Styles from './style'

class Header extends PureComponent {
  public render() {
    return (
      <View style={Styles.header}>
        <Text>Header Component</Text>
      </View>
    )
  }
}

export default Header
