import { PureComponent, ReactText } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from '@react-native-community/picker'
import { StackScreenProps } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import { RootStackParamsList } from 'navigator'
import { Loader } from 'components'
import Visitor, { VisitorApi } from 'api/Visitor'
import styles from './styles'
import { Theme } from 'configs'
import { range } from 'utils/Helpers'
import { setData } from 'stores/Actions/Visitor'

interface Props extends StackScreenProps<RootStackParamsList, 'VisitorInput'> {
  setVisitorData: (data: VisitorApi) => void
}

interface State {
  umur: number,
  jenis_kelamin: string
  pekerjaan: string
  loading: boolean
  error: string
}

class VisitorInput extends PureComponent<Props, State> {
  public state: State = {
    umur: 18,
    pekerjaan: '',
    jenis_kelamin: 'L',
    loading: false,
    error: ''
  }

  private save = async (): Promise<void> => {
    const { navigation, setVisitorData } = this.props
    const { pekerjaan, umur, jenis_kelamin } = this.state
    this.setState({ loading: true, error: '' })
    const data = { pekerjaan, umur, jenis_kelamin }
    try {
      const { error, message } = await Visitor.add(data)
      if (error) throw new Error(message)
      await AsyncStorage.setItem('@visitor:data', JSON.stringify(data))
      setVisitorData(data)
      this.setState({
        umur: 18,
        pekerjaan: '',
        jenis_kelamin: 'L'
      })
      navigation.navigate('Questions')
    } catch (reason) {
      const { message: error } = reason
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  private back = (): void => {
    const { navigation } = this.props
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Landing')
    }
  }

  private onChangeInput = <T extends string>(key: keyof State) => (value: T) => {
    this.setState({ [key]: value } as any)
  }
  
  private renderInputs(): JSX.Element {
    const { pekerjaan, umur, jenis_kelamin } = this.state
    return (
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>Umur:</Text>
          </View>
          <View style={styles.inputView}>
            <Picker
              mode="dropdown"
              style={{ width: '100%' }}
              selectedValue={umur}
              onValueChange={this.onChangeInput('umur') as (val: ReactText, idx: number) => void}
            >
              {range(1, 60).map((umur, idx) => (
                <Picker.Item
                  key={idx}
                  label={`${umur} Tahun`}
                  value={umur}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputView}>
            <Text style={styles.inputTxt}>Jenis Kelamin:</Text>
          </View>
          <View style={styles.inputView}>
            <Picker
              mode="dropdown"
              style={{ width: '100%' }}
              selectedValue={jenis_kelamin}
              onValueChange={this.onChangeInput('jenis_kelamin') as (val: ReactText, idx: number) => void}
            >
              <Picker.Item label="Laki-Laki" value="L" />
              <Picker.Item label="Perempuan" value="P" />
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Pekerjaan"
          value={pekerjaan}
          onChangeText={this.onChangeInput('pekerjaan')}
        />
      </View>
    )
  }

  private renderButtons(): JSX.Element {
    const { pekerjaan, umur, jenis_kelamin } = this.state
    const disabled = !pekerjaan || !umur || !jenis_kelamin
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
	const { loading, error } = this.state
    return (
      <View style={styles.container}>
        <Loader visible={loading} />
        <Text style={styles.title}>Masukkan Data Pengunjung</Text>
        {this.renderInputs()}
        {this.renderButtons()}
        <Text style={{ color: Theme.danger }}>{error}</Text>
      </View>
    )
  }
}

const mapDispatchProps = {
  setVisitorData: setData
}

export default connect(null, mapDispatchProps)(VisitorInput)
