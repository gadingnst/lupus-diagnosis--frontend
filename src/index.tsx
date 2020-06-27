import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { Header } from 'components'

export default class extends PureComponent {
  public render() {
    return (
      <View>
        <Header />
        <Text>Hello World</Text>
      </View>
    )
  }
}
