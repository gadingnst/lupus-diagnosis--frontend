import { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native'
import { Theme } from 'configs'
import style from './style'

interface Props {
  selected: boolean
  color: string
  text: string
  style: StyleProp<ViewStyle>
  onPress: (selected: boolean) => void
}

class RadioButton extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    selected: false,
    color: Theme.primary,
    text: '',
    style: {},
    onPress: () => {}
  }

  render() {
    const {
      onPress,
      selected,
      text,
      style: styleProp,
      color: backgroundColor
    } = this.props
    return (
      <TouchableOpacity
        style={[style.container, styleProp]}
        onPress={() => onPress(selected)}
      >
        <View style={style.radio}>
          {selected && <View style={[style.checked, { backgroundColor }]} />}
        </View>
        <Text style={style.text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default RadioButton
