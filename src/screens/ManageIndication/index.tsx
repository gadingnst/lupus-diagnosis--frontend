import { PureComponent, ReactText, Fragment, ReactNode } from 'react'
import { ScrollView, View, Text, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-community/picker'
import Indication, { IndicationsApi } from 'api/Indication'
import { Menu, Loader, ErrorWrapper } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { Theme } from 'configs'
import { TextInput } from 'react-native-gesture-handler'
import { AdminData } from 'api/Admin'
import { connect } from 'react-redux'

interface Props
  extends StackScreenProps<RootStackParamsList, 'ManageIndication'> {
  admin: AdminData
}

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

  private toggleEdit = () => {
    const { edit } = this.state
    this.setState({ edit: !edit })
  }

  private saveData = () => {}

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

  private renderToggleEdit() {
    const { edit } = this.state
    return (
      <View style={styles.toggleEditContainer}>
        {edit && (
          <View style={styles.btnManage}>
            <Button
              title="Simpan"
              color={Theme.success}
              onPress={this.saveData}
            />
          </View>
        )}
        <View style={styles.btnManage}>
          <Button
            title={edit ? 'Batal' : 'Edit'}
            color={edit ? Theme.danger : Theme.primary}
            onPress={this.toggleEdit}
          />
        </View>
      </View>
    )
  }

  private renderIndications() {
    const { selected, edit } = this.state
    return (
      <View style={styles.indicationsContainer}>
        <View style={styles.indicationDetail}>
          <Text style={styles.indicationText}>Kode:</Text>
          {edit ? (
            <TextInput
              style={styles.indicationInput}
              value={selected?.kode_gejala}
              placeholder="Kode Gejala"
            />
          ) : (
            <Text style={styles.indicationTextResult}>
              {selected?.kode_gejala}
            </Text>
          )}
        </View>
        <View style={styles.indicationDetail}>
          <Text style={styles.indicationText}>Gejala:</Text>
          {edit ? (
            <TextInput
              style={styles.indicationInput}
              value={selected?.gejala}
              placeholder="Gejala"
            />
          ) : (
            <Text style={styles.indicationTextResult}>{selected?.gejala}</Text>
          )}
        </View>
        <View style={styles.indicationDetail}>
          <Text style={styles.indicationText}>Deskripsi:</Text>
          {edit ? (
            <TextInput
              style={styles.indicationInput}
              value={selected?.des_gejala}
              placeholder="Deskripsi Gejala"
            />
          ) : (
            <Text style={styles.indicationTextResult}>
              {selected?.des_gejala}
            </Text>
          )}
        </View>
      </View>
    )
  }

  private renderView(): JSX.Element {
    const { navigation, admin } = this.props
    return (
      <Fragment>
        <Text style={styles.title}>Selamat Datang, {admin.username}</Text>
        <Menu navigation={navigation} />
        <Text style={styles.title}>Daftar Data Gejala</Text>
        {this.renderPicker()}
        {this.renderIndications()}
        {this.renderToggleEdit()}
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

const mapStateToProps = ({ AdminReducer }: any) => ({
  admin: AdminReducer.data
})

export default connect(mapStateToProps)(ManageIndication)
