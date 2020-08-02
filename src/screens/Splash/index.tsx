import { PureComponent } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setData } from 'stores/Actions/Admin'
import { RootStackParamsList } from 'navigator'
import { Loader } from 'components'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParamsList, 'Splash'> {
  setAdminData: (data: any) => void
}

interface State {
  loading: boolean
}

class Splash extends PureComponent<Props, State> {
  public state: State = {
    loading: true
  }

  public componentDidMount() {
    const { setAdminData, navigation } = this.props
    AsyncStorage.getItem('@admin:data').then((value) => {
      const screen: keyof RootStackParamsList = value ? 'Admin' : 'Guest'
      if (value) {
        setAdminData(JSON.parse(value))
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: screen }]
        })
      )
      this.setState({ loading: false })
    })
  }

  public render() {
    const { loading } = this.state
    return <Loader visible={loading} />
  }
}

const mapDispatchToProps = {
  setAdminData: setData
}

export default connect(null, mapDispatchToProps)(Splash)
