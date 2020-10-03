import { PureComponent } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { Loader } from 'components'
import { Theme } from 'configs'
import Feedback from 'api/Feedback'
import styles from './styles'

interface Props extends StackScreenProps<RootStackParamsList, 'Landing'> {}

interface State {
  kritik: string
  saran: string
  message: string
  loading: boolean
}

class FeedbackInput extends PureComponent<Props, State> {
  public state: State = {
    kritik: '',
    saran: '',
    message: '',
    loading: false
  }

  onChangeInput = (input: keyof State) => (text: String) => {
    this.setState({ [input]: text } as any)
  }

  sendFeedback = async () => {
    const { kritik, saran } = this.state;
    this.setState({ loading: true, message: '' })
    try {
      await Feedback.send({ kritik, saran })
      this.setState({
        kritik: '',
        saran: '',
        message: 'Terima kasih, feedback anda telah dikirim.'
      })
    } catch (reason) {
      const { message } = reason
      this.setState({ message })
    } finally {
      this.setState({ loading: false })
    }
  }

  back = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  public render() {
    const { loading, kritik, saran, message } = this.state
    const disabled = !kritik || !saran
    return (
      <View style={styles.container}>
        <Loader visible={loading} />
        <View>
          <Text style={styles.title}>Kritik & Saran</Text>
        </View>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Kritik"
          placeholderTextColor="grey"
          numberOfLines={4}
          multiline={true}
          value={kritik}
          onChangeText={this.onChangeInput('kritik')}
        />
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Saran"
          placeholderTextColor="grey"
          numberOfLines={4}
          multiline={true}
          value={saran}
          onChangeText={this.onChangeInput('saran')}
        />
        <View style={styles.btnContainer}>
          <Button
            color={Theme.success}
            title="KIRIM"
            disabled={disabled}
            onPress={this.sendFeedback}
          />
          <Button
            color={Theme.danger}
            title="KEMBALI"
            onPress={this.back}
          />
        </View>
        <Text>{message}</Text>
      </View>
    )
  }
}

export default FeedbackInput
