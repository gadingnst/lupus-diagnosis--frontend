import { PureComponent, ReactText, Fragment, ReactNode } from 'react'
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-community/picker'
import { connect } from 'react-redux'
import Indication, { IndicationsApi } from 'api/Indication'
import { Menu, ErrorWrapper } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { Theme } from 'configs'
import { AdminData } from 'api/Admin'

interface Props
  extends StackScreenProps<RootStackParamsList, 'ManageIndication'> {
  admin: Partial<AdminData>
}

interface Selected extends IndicationsApi {
  idx: number
}

interface State {
  selected?: Selected
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
        selected: {
          ...(data as Selected[])[0],
          idx: 0
        }
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

  private cancelEdit = () => {
    const { selected, data } = this.state
    const rollData = {
      ...data[selected?.idx as number],
      idx: selected?.idx as number
    }
    this.setState({ selected: rollData })
    this.toggleEdit()
  }

  private onChangeData = (key: keyof IndicationsApi) => (text: string) => {
    const { selected } = this.state
    const data: Selected = {
      ...(selected as Selected),
      [key]: text
    }
    this.setState({ selected: data })
  }

  private saveData = async () => {
    const { admin } = this.props
    const { selected } = this.state
    this.toggleEdit()
    await Indication.updateData(
      selected?.kode_gejala as string,
      admin.token as string,
      selected as IndicationsApi
    )
    this.getData()
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
          {data.map((indication, idx) => (
            <Picker.Item
              key={indication.kode_gejala}
              label={indication.kode_gejala}
              value={JSON.stringify({ idx, ...indication })}
            />
          ))}
        </Picker>
      </View>
    )
  }

  private renderToggleEdit() {
    const { edit, selected } = this.state
    const { gejala: indication = '', des_gejala: desc = '' }: any = selected
    const disabled = !(indication && desc)
    return (
      <View style={styles.toggleEditContainer}>
        {edit && (
          <View style={styles.btnManage}>
            <Button
              disabled={disabled}
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
            onPress={edit ? this.cancelEdit : this.toggleEdit}
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
          <Text style={styles.indicationTextResult}>
            {selected?.kode_gejala}
          </Text>
        </View>
        <View style={styles.indicationDetail}>
          <Text style={styles.indicationText}>Gejala:</Text>
          {edit ? (
            <TextInput
              style={styles.indicationInput}
              value={selected?.gejala}
              placeholder="Gejala"
              onChangeText={this.onChangeData('gejala')}
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
              onChangeText={this.onChangeData('des_gejala')}
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
    const { loading } = this.state
    const { navigation, admin } = this.props
    return (
      <Fragment>
        <Text style={styles.title}>Selamat Datang, {admin.username}</Text>
        <Menu navigation={navigation} />
        <Text style={styles.title}>Daftar Data Gejala</Text>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color={Theme.primary}
            size="large"
          />
        ) : (
          <Fragment>
            {this.renderPicker()}
            {this.renderIndications()}
            {this.renderToggleEdit()}
          </Fragment>
        )}
      </Fragment>
    )
  }

  public render(): JSX.Element {
    const { error } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <ErrorWrapper
            error={error}
            fallbackTitle="Refresh"
            fallbackFunc={this.refresh}
            component={this.renderView()}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ AdminReducer }: any) => ({
  admin: AdminReducer.data
})

export default connect(mapStateToProps)(ManageIndication)
