import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Styles from './style'

interface Props {
  title: string
}

class Header extends PureComponent<Props> {
  public render() {
    const { title } = this.props
    return (
      <View style={Styles.header}>
        <Text style={Styles.title}>{title}</Text>
      </View>
    )
  }
}

export default Header
