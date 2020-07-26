import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { Theme } from 'configs'

interface Props extends StackScreenProps<RootStackParamsList, 'AdminLogin'> {}

class AdminLogin extends PureComponent<Props> {
  private login = async (): Promise<void> => {}

  private back = (): void => {
    const { navigation } = this.props
    navigation.goBack()
  }

  private renderInputs(): JSX.Element {
    return (
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        {this.renderInputs()}
        {this.renderButtons()}
      </View>
    )
  }
}

export default AdminLogin
