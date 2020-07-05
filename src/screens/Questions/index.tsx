import { PureComponent, ReactNode, Fragment } from 'react'
import { View, Text, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RadioGroup, Loader, Carousel } from 'components'
import { RootStackParamsList } from 'navigator'
import Indication, { IndicationsApi } from 'api/Indication'
import Case from 'api/Case'
import { Theme } from 'configs'
import styles from './styles'

interface State {
  interval: number
  loading: boolean
  error: string
  indicationsData: IndicationsApi[]
  indications: string[]
}

interface Props extends StackScreenProps<RootStackParamsList, 'Questions'> {}

class Questions extends PureComponent<Props, State> {
  public state: State = {
    interval: 1,
    loading: true,
    error: '',
    indicationsData: [],
    indications: []
  }

  public componentDidMount(): void {
    this.getIndications()
  }

  private getIndications = async (): Promise<void> => {
    try {
      const { data: indicationsData = [] } = await Indication.getData()
      this.setState({ indicationsData })
    } catch (reason) {
      const { message: error } = reason
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  private refresh = (): void => {
    this.setState({ loading: true, error: '' }, this.componentDidMount)
  }

  private predict = (): void => {
    const { navigation } = this.props
    const { indications } = this.state
    this.setState({ loading: true }, async () => {
      try {
        const { data: prediction } = await Case.predict(indications)
        navigation.navigate('Result', { prediction })
      } catch (reason) {
        const { message: error } = reason
        this.setState({ error })
      } finally {
        this.setState({ loading: false })
      }
    })
  }

  private handleAnswer = (code: string, value?: string): void => {
    const { indications: state } = this.state
    const indications = value
      ? [...new Set([...state, value])]
      : state.filter((indication) => code !== indication)
    this.setState({ indications })
  }

  private renderQuisoner(): ReactNode {
    const { indicationsData: data } = this.state
    return data.map(({ code, name }, idx) => (
      <View key={idx}>
        <Text>Apakah anda merasakan gejala {name} ?</Text>
        <RadioGroup
          style={{ marginVertical: 10 }}
          onChange={(value) => this.handleAnswer(code, value)}
          group={[
            { text: 'Ya', value: code },
            { text: 'Tidak', value: '' }
          ]}
        />
      </View>
    ))
  }

  private renderViewError(): JSX.Element {
    const { error } = this.state
    return (
      <View>
        <Text style={styles.errorText}>Terjadi Kesalahan. Error: {error}</Text>
        <Button title="Refresh" onPress={this.refresh} />
      </View>
    )
  }

  private renderView(): ReactNode {
    const { error, loading, interval, indicationsData: data } = this.state
    const isMaxInterval = interval === data.length
    if (!loading) {
      if (error) {
        return this.renderViewError()
      }
      return (
        <Fragment>
          <Carousel
            dotted
            interval={interval}
            slideStyle={styles.carousel}
            onChangeInterval={(interval) => {
              this.setState({ interval })
            }}
          >
            {this.renderQuisoner()}
          </Carousel>
          <View style={styles.btnContainer}>
            <Button
              disabled={interval === 1}
              color={Theme.secondary}
              title="< Sebelumnya"
              onPress={() => this.setState({ interval: interval - 1 })}
            />
            <Button
              color={isMaxInterval ? Theme.info : Theme.primary}
              title={isMaxInterval ? 'Diagnosa' : 'Lanjut >'}
              onPress={() =>
                isMaxInterval
                  ? this.predict()
                  : this.setState({ interval: interval + 1 })
              }
            />
          </View>
        </Fragment>
      )
    }
  }

  public render(): JSX.Element {
    const { loading } = this.state
    return (
      <View style={styles.container}>
        <Loader visible={loading} />
        {this.renderView()}
      </View>
    )
  }
}

export default Questions