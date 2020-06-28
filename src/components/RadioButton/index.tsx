import { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Theme } from 'configs'
import Style from './style'

interface Props {
  selected: boolean
  color: string
  onPress: (selected: boolean) => void
}

class RadioButton extends PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    selected: false,
    color: Theme.primary,
    onPress: () => {}
  }

  public render() {
    const { onPress, selected, color: backgroundColor } = this.props
    return (
      <TouchableOpacity
        style={Style.container}
        onPress={() => onPress(selected)}
      >
        {selected && <View style={[Style.radio, { backgroundColor }]} />}
      </TouchableOpacity>
    )
  }
}

export default RadioButton
