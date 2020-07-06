import { PureComponent, ReactNode } from 'react'
import { View, Text, Button } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { PredictApi } from 'api/Case'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'
import { Theme } from 'configs'

export interface ParamsList {
  prediction?: PredictApi
}

interface State {
  data?: PredictApi
}

interface Props extends StackScreenProps<RootStackParamsList, 'Result'> {}

class Result extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const { route } = props
    this.state = {
      data: route.params.prediction
    }
  }

  public done = (): void => {
    const { navigation } = this.props
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Questions' }]
      })
    )
  }

  public renderResult(): ReactNode {
    const { data } = this.state
    return data?.classification.map((item, idx) => (
      <Text key={idx} style={styles.classification}>
        {item.idName} : {item.percentage}
      </Text>
    ))
  }

  public render(): JSX.Element {
    const { data } = this.state
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Hasil Diagnosa</Text>
        <View style={styles.result}>{this.renderResult()}</View>
        <Text style={styles.subtitle}>Kesimpulan :</Text>
        <Text>
          Anda terindikasi Penyakit
          <Text style={styles.prediction}>
            &nbsp;{data?.prediction.idName} / {data?.prediction.name}.
          </Text>
        </Text>
        <View style={styles.btnContainer}>
          <Button title="Selesai" color={Theme.success} onPress={this.done} />
        </View>
      </ScrollView>
    )
  }
}

export default Result
