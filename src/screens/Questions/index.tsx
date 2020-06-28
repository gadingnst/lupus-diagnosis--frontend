import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { RadioButton } from 'components'

class Questions extends PureComponent {
  public render() {
    return (
      <View>
        <Text>Hello from Questions</Text>
        <RadioButton selected />
      </View>
    )
  }
}

export default Questions
