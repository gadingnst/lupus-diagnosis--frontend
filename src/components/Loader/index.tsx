import { PureComponent } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Theme } from 'configs'

interface Props {
  visible: boolean
  text: string
}

class Loader extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    text: 'Loading...'
  }

  render() {
    const { visible, text } = this.props
    return (
      <Spinner
        visible={visible}
        textContent={text}
        textStyle={{ color: Theme.white }}
      />
    )
  }
}

export default Loader
