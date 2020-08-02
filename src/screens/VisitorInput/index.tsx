import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { Theme } from 'configs'

interface Props extends StackScreenProps<RootStackParamsList, 'VisitorInput'> {}

interface State {
  name: string
  email: string
}

class VisitorInput extends PureComponent<Props, State> {
  public state: State = {
    name: '',
    email: ''
  }

  private save = async (): Promise<void> => {}

  private back = (): void => {
    const { navigation } = this.props
    navigation.goBack()
  }

  private onChangeName = (name: string) => {
    this.setState({ name })
  }

  private onChangeEmail = (email: string) => {
    this.setState({ email })
  }

  private renderInputs(): JSX.Element {
    const { name, email } = this.state
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama Pengunjung"
          value={name}
          onChangeText={this.onChangeName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail Pengunjung"
          value={email}
          onChangeText={this.onChangeEmail}
        />
      </View>
    )
  }

  private renderButtons(): JSX.Element {
    const { name, email } = this.state
    const disabled = !(name && email)
    return (
      <View style={styles.btnContainer}>
        <Button
          disabled={disabled}
          color={Theme.info}
          title="SIMPAN"
          onPress={this.save}
        />
        <Button color={Theme.danger} title="BATAL" onPress={this.back} />
      </View>
    )
  }

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Masukkan Data Pengunjung</Text>
        {this.renderInputs()}
        {this.renderButtons()}
      </View>
    )
  }
}

export default VisitorInput
