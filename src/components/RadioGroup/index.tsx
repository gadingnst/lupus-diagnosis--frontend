import { PureComponent } from 'react'
import RadioButton from 'components/RadioButton'
import { StyleProp, ViewStyle, View } from 'react-native'

interface Radio {
  text: string
  value: string
}

interface Props {
  group: Radio[]
  style: StyleProp<ViewStyle>
  onChange: (value: string) => void
}

interface State {
  selected: string
}

class RadioGroup extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    style: {}
  }

  public state: State = {
    selected: ''
  }

  private onChangeRadio(value: string): void {
    const { onChange } = this.props
    this.setState({ selected: value }, () => {
      onChange(value)
    })
  }

  public render(): JSX.Element {
    const { group, style } = this.props
    const { selected } = this.state
    return (
      <View style={style}>
        {group.map((radio, idx) => (
          <RadioButton
            key={idx}
            text={radio.text}
            style={{ marginVertical: 2 }}
            selected={selected === radio.value}
            onPress={() => this.onChangeRadio(radio.value)}
          />
        ))}
      </View>
    )
  }
}

export default RadioGroup
