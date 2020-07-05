import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

interface Props {
  title: string
}

class Header extends PureComponent<Props> {
  public render() {
    const { title } = this.props
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

export default Header
