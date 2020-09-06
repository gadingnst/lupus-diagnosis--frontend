import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { Loader } from 'components'
import Visitor from 'api/Visitor'
import styles from './styles'
import { Theme } from 'configs'

interface Props extends StackScreenProps<RootStackParamsList, 'VisitorInput'> {}

interface State {
  name: string
  loading: boolean
}

class VisitorInput extends PureComponent<Props, State> {
  public state: State = {
    name: '',
	loading: false
  }

  private save = async (): Promise<void> => {
    const { navigation } = this.props
	const { name } = this.state
    const nama_pengunjung = name
	this.setState({ loading: true })
	await Visitor.add({ nama_pengunjung })
	this.setState({ loading: false, name: '' })
    navigation.navigate('Questions')
  }

  private back = (): void => {
    const { navigation } = this.props
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Landing')
    }
  }

  private onChangeName = (name: string) => {
    this.setState({ name })
  }
  
  private renderInputs(): JSX.Element {
    const { name } = this.state
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama Pengunjung"
          value={name}
          onChangeText={this.onChangeName}
        />
      </View>
    )
  }

  private renderButtons(): JSX.Element {
    const { name } = this.state
    const disabled = !name
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
	const { name, loading } = this.state
    return (
      <View style={styles.container}>
		<Loader visible={loading} />
        <Text style={styles.title}>Masukkan Data Pengunjung</Text>
        {this.renderInputs()}
        {this.renderButtons()}
      </View>
    )
  }
}

export default VisitorInput
