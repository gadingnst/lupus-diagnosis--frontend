import { PureComponent } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { Menu, ErrorWrapper } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { AdminData } from 'api/Admin'
import Case, { HistoryData } from 'api/Case'
import { Theme } from 'configs'

interface Props extends StackScreenProps<RootStackParamsList, 'AdminHome'> {
  data: AdminData
}

interface State {
  loading: boolean
  error: string
  history: HistoryData[]
}

class AdminHome extends PureComponent<Props> {
  public state: State = {
    loading: true,
    error: '',
    history: []
  }

  componentDidMount() {
    Case.getHistory()
      .then(response => {
        const { data } = response
        this.setState({ history: data || [] })
      })
      .catch(reason => {
        const { message: error } = reason
        this.setState({ error })
      })
      .finally(() => this.setState({ loading: false }))
  }

  private refresh = (): void => {
    this.setState({ loading: true, error: '' }, this.componentDidMount)
  }

  private renderHistory(): JSX.Element {
    const { history } = this.state
    return (
      <View style={styles.historyCardContainer}>
        {history.map(data => (
          <View style={styles.historyCard} key={data.id}>
            <Text style={styles.historyTitle}>Data Pengunjung</Text>
            <Text>Umur: {data.visitor.umur}</Text>
            <Text>Jenis Kelamin: {data.visitor.jenis_kelamin}</Text>
            <Text>Pekerjaan: {data.visitor.pekerjaan}</Text>
            <View style={styles.border} />
            <Text style={[styles.historyTitle, { textAlign: 'center', marginBottom: 10 }]}>{data.result.prediction.nama_penyakit}</Text>
            <Text>Gejala: {data.indications.join(', ')}</Text>
            <Text>Persentase: {data.result.prediction.percentage}%</Text>
          </View>
        ))}
      </View>
    )
  }

  public render(): JSX.Element {
    const { navigation, data } = this.props
    const { error } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Selamat Datang, {data.username}</Text>
          <Menu navigation={navigation} />
          <View style={styles.picContainer}>
            <Image
              style={styles.landingImage}
              source={require('../../assets/landing.jpg')}
            />
          </View>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 18, fontWeight: 'bold' }}>
          History Diagnosa
        </Text>
        <ErrorWrapper
          error={error}
          fallbackTitle="Refresh"
          fallbackFunc={this.refresh}
          component={this.renderHistory()}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ AdminReducer }: any) => ({
  data: AdminReducer.data
})

export default connect(mapStateToProps)(AdminHome)
