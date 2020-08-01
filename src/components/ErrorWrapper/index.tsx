import { PureComponent, ReactNode } from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles'

interface Props {
  error: string
  component: ReactNode
  fallbackTitle: string
  fallbackFunc: () => void
}

class ErrorWrapper extends PureComponent<Props> {
  public render(): ReactNode {
    const { error, component, fallbackTitle, fallbackFunc } = this.props
    if (error) {
      return (
        <View>
          <Text style={styles.errorText}>
            Terjadi Kesalahan. Error: {error}
          </Text>
          <Button title={fallbackTitle} onPress={fallbackFunc} />
        </View>
      )
    }
    return component
  }
}

export default ErrorWrapper
