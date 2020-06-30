import { PureComponent } from 'react'
import RadioButton from 'components/RadioButton'

interface Radio {
  text: string
  value: string
}

interface Props {
  group: Radio[]
  onChange: (value: string) => void
}

interface State {
  selected: string
}

class RadioGroup extends PureComponent<Props, State> {
  state: State = {
    selected: ''
  }

  onChangeRadio(value: string) {
    const { onChange } = this.props
    this.setState({ selected: value }, () => {
      onChange(value)
    })
  }

  render() {
    const { group } = this.props
    const { selected } = this.state
    return group.map((radio, idx) => (
      <RadioButton
        key={idx}
        text={radio.text}
        style={{ marginVertical: 2 }}
        selected={selected === radio.value}
        onPress={() => this.onChangeRadio(radio.value)}
      />
    ))
  }
}

export default RadioGroup
