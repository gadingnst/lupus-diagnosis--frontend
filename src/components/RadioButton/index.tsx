import { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native'
import { Theme } from 'configs'
import styles from './styles'

interface Props {
  selected: boolean
  color: string
  text: string
  style: StyleProp<ViewStyle>
  onPress: (selected: boolean) => void
}

class RadioButton extends PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    selected: false,
    color: Theme.primary,
    text: '',
    style: {},
    onPress: () => {}
  }

  public render(): JSX.Element {
    const {
      onPress,
      selected,
      text,
      style: styleProp,
      color: backgroundColor
    } = this.props
    return (
      <TouchableOpacity
        style={[styles.container, styleProp]}
        onPress={() => onPress(selected)}
      >
        <View style={styles.radio}>
          {selected && <View style={[styles.checked, { backgroundColor }]} />}
        </View>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default RadioButton
