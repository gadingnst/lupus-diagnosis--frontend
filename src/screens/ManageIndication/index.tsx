import { PureComponent, ReactText, Fragment, ReactNode } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-community/picker'
import Indication, { IndicationsApi } from 'api/Indication'
import { Menu, Loader, ErrorWrapper } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'

interface Props
  extends StackScreenProps<RootStackParamsList, 'ManageIndication'> {}

interface State {
  selected?: IndicationsApi
  data: IndicationsApi[]
  loading: boolean
  error: string
  edit: boolean
}

class ManageIndication extends PureComponent<Props, State> {
  public state: State = {
    loading: true,
    error: '',
    data: [],
    edit: false
  }

  public componentDidMount() {
    this.getData()
  }

  private async getData(): Promise<void> {
    try {
      const { data } = await Indication.getData()
      this.setState({
        data: data as IndicationsApi[],
        selected: (data as IndicationsApi[])[0]
      })
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

  private setIndication = (indication: ReactText) => {
    this.setState({ selected: JSON.parse(indication as string) })
  }

  private renderPicker(): ReactNode {
    const { data, selected } = this.state
    return (
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={JSON.stringify(selected)}
          style={styles.picker}
          onValueChange={this.setIndication}
        >
          {data.map((indication) => (
            <Picker.Item
              key={indication.kode_gejala}
              label={indication.kode_gejala}
              value={JSON.stringify(indication)}
            />
          ))}
        </Picker>
      </View>
    )
  }

  private renderIndications() {
    const { selected } = this.state
    return (
      <View style={styles.indicationsContainer}>
        <Text>Kode Gejala: {selected?.kode_gejala}</Text>
        <Text>Gejala: {selected?.gejala}</Text>
        <Text>Deskripsi: {selected?.des_gejala}</Text>
      </View>
    )
  }

  private renderView(): JSX.Element {
    const { navigation } = this.props
    return (
      <Fragment>
        <Text style={styles.title}>Selamat Datang, (nama admin)</Text>
        <Menu navigation={navigation} />
        <Text style={styles.title}>Daftar Data Gejala</Text>
        {this.renderPicker()}
        {this.renderIndications()}
      </Fragment>
    )
  }

  public render(): JSX.Element {
    const { loading, error } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <Loader visible={loading} />
          {!loading && (
            <ErrorWrapper
              error={error}
              fallbackTitle="Refresh"
              fallbackFunc={this.refresh}
              component={this.renderView()}
            />
          )}
        </View>
      </ScrollView>
    )
  }
}

export default ManageIndication
