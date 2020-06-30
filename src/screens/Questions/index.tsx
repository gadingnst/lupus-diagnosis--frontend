import { PureComponent, Fragment } from 'react'
import { View, Text } from 'react-native'
import { RadioGroup, Loader } from 'components'
import Indication, { IndicationsApi } from 'api/Indication'
import Case from 'api/Case'
import style from './style'
import { ScrollView } from 'react-native-gesture-handler'

interface State {
  loading: boolean
  indicationsData: IndicationsApi[]
  indications: string[]
}

class Questions extends PureComponent<{}, State> {
  state: State = {
    loading: true,
    indicationsData: [],
    indications: []
  }

  componentDidMount() {
    Indication.getData()
      .then(({ data: indicationsData = [] }) => {
        this.setState({ indicationsData })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  predict(indications: string[]) {
    this.setState({ loading: true }, async () => {
      try {
        const response = await Case.predict(indications)
      } finally {
        this.setState({ loading: false })
      }
    })
  }

  handleAnswer = (code: string, value?: string) => {
    const { indications: state } = this.state
    const indications = value
      ? [...new Set([...state, value])]
      : state.filter((indication) => code !== indication)
    this.setState({ indications }, () => {
      alert(JSON.stringify(indications))
    })
  }

  renderQuisoner() {
    const { indicationsData: data } = this.state
    return data.map(({ code, name }, idx) => (
      <Fragment key={idx}>
        <Text>Apakah anda merasakan gejala {name} ?</Text>
        <RadioGroup
          onChange={(value) => this.handleAnswer(code, value)}
          group={[
            { text: 'Ya', value: code },
            { text: 'Tidak', value: '' }
          ]}
        />
      </Fragment>
    ))
  }

  render() {
    const { loading } = this.state
    return (
      <ScrollView>
        <Loader visible={loading} />
        <View style={style.container}>{this.renderQuisoner()}</View>
      </ScrollView>
    )
  }
}

export default Questions
