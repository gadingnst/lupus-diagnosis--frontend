import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import AdminApi, { AdminData } from 'api/Admin'
import { connect } from 'react-redux'
import { setData } from 'stores/Actions/Admin'
import styles from './styles'
import { Theme } from 'configs'
import { Loader } from 'components'
import AsyncStorage from '@react-native-community/async-storage'

interface Props extends StackScreenProps<RootStackParamsList, 'AdminLogin'> {
  setAdminData: (data: AdminData) => void
}

interface State {
  loading: boolean
  error: string
  username: string
  email: string
  password: string
}

class AdminLogin extends PureComponent<Props, State> {
  public state: State = {
    username: '',
    email: '',
    password: '',
    error: '',
    loading: false
  }

  private login = (): void => {
    const { setAdminData, navigation } = this.props
    const { username, email, password } = this.state
    this.setState({ error: '', loading: true }, async () => {
      try {
        const { code, message, data } = await AdminApi.login({
          username,
          email,
          password
        })
        if (code === 200) {
          await AsyncStorage.setItem('@admin:data', JSON.stringify(data))
          setAdminData(data as AdminData)
          this.setState({ username: '', email: '', password: '' })
          navigation.navigate('Splash')
        } else {
          throw new Error(message)
        }
      } catch (reason) {
        const { message: error } = reason
        this.setState({ error })
      } finally {
        this.setState({ loading: false })
      }
    })
  }

  private back = (): void => {
    const { navigation } = this.props
    navigation.goBack()
  }

  private onChangeUsername = (username: string): void => {
    this.setState({ username })
  }

  private onChangeEmail = (email: string): void => {
    this.setState({ email })
  }

  private onChangePassword = (password: string): void => {
    this.setState({ password })
  }

  private renderInputs(): JSX.Element {
    const { username, email, password } = this.state
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={this.onChangeUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={this.onChangeEmail}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          onChangeText={this.onChangePassword}
          value={password}
        />
      </View>
    )
  }

  private renderButtons(): JSX.Element {
    return (
      <View style={styles.btnContainer}>
        <Button color={Theme.primary} title="LOGIN" onPress={this.login} />
        <Button color={Theme.danger} title="BATAL" onPress={this.back} />
      </View>
    )
  }

  public render(): JSX.Element {
    const { loading, error } = this.state
    return (
      <View style={styles.container}>
        <Loader visible={loading} />
        <Text style={styles.title}>LOGIN</Text>
        {this.renderInputs()}
        {this.renderButtons()}
        <Text style={styles.msgError}>{error}</Text>
      </View>
    )
  }
}

const mapDispatchProps = {
  setAdminData: setData
}

export default connect(null, mapDispatchProps)(AdminLogin)
