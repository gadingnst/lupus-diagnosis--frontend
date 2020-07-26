import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { Theme } from 'configs'

interface Props extends StackScreenProps<RootStackParamsList, 'VisitorInput'> {}

class VisitorInput extends PureComponent<Props> {
  private save = async (): Promise<void> => {}

  private back = (): void => {
    const { navigation } = this.props
    navigation.goBack()
  }

  private renderInputs(): JSX.Element {
    return (
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nama Pengunjung" />
        <TextInput style={styles.input} placeholder="E-mail Pengunjung" />
      </View>
    )
  }

  private renderButtons(): JSX.Element {
    return (
      <View style={styles.btnContainer}>
        <Button color={Theme.info} title="SIMPAN" onPress={this.save} />
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
