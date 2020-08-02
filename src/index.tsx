import 'react-native-gesture-handler'
import { PureComponent } from 'react'
import { Provider } from 'react-redux'
import Navigator from 'navigator'
import stores from 'stores'

class Main extends PureComponent {
  public render() {
    return (
      <Provider store={stores}>
        <Navigator />
      </Provider>
    )
  }
}

export default Main
