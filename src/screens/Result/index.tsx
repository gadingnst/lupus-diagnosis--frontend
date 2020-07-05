import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { PredictApi } from 'api/Case'

export interface ParamsList {
  prediction?: PredictApi
}

interface State {
  data?: PredictApi
}

interface Props extends StackScreenProps<RootStackParamsList, 'Result'> {}

class Result extends PureComponent<Props, State> {
  constructor(props: Props) {
    const { route } = props
    super(props)
    this.state = {
      data: route.params.prediction
    }
  }

  // TODO
  public render(): JSX.Element {
    const { data } = this.state
    return (
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
    )
  }
}

export default Result
