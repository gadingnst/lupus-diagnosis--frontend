import { PureComponent, ReactNode } from 'react'
import { View, Text, ScrollView, Image, Button, Alert } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { Menu, ErrorWrapper, Loader } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { AdminData } from 'api/Admin'
import Feedback, { FeedbackData } from 'api/Feedback'
import { Theme } from 'configs'
interface Props extends StackScreenProps<RootStackParamsList, 'AdminHome'> {
  data: AdminData
}

interface State {
  loading: boolean
  error: string
  feedbacks: FeedbackData[]
}

class FeedbackList extends PureComponent<Props> {
  public state: State = {
    loading: true,
    error: '',
    feedbacks: []
  }

  componentDidMount() {
    Feedback.getData()
      .then(response => {
        const { data } = response
        this.setState({ feedbacks: data || [] })
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

  private confirmDelete = (id: number) => () => {
    Alert.alert(
      'Hapus data',
      'Apakah anda yakin akan menghapus data ini?',
      [
        { text: 'BATAL', onPress: () => false },
        { text: 'YAKIN', onPress: () => this.deleteFeedback(id) },
      ]
    )
  }

  private deleteFeedback = async (id: number) => {
    this.setState({ loading: true })
    try {
      await Feedback.deleteData(id)
      this.componentDidMount()
    } catch (reason) {
      const { message: error } = reason
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }

  private renderFeedback(): ReactNode {
    const { feedbacks } = this.state
    return feedbacks.map(data => (
      <View style={styles.historyCard} key={data.id}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.historyTitle}>Kritik</Text>
          <Text style={styles.historyTitle}>{data.id}.</Text>
        </View>
        <Text>{data.kritik}</Text>
        <View style={styles.border} />
        <Text style={styles.historyTitle}>Saran</Text>
        <Text>{data.saran}</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Hapus" color={Theme.danger} onPress={this.confirmDelete(+(data.id || 0))} />
        </View>
      </View>
    ))
  }

  public render(): JSX.Element {
    const { navigation, data } = this.props
    const { error, loading } = this.state
    return (
      <ScrollView>
        <Loader visible={loading} />
        <View style={styles.container}>
          <Text style={styles.title}>Selamat Datang, {data.username}</Text>
          <Menu navigation={navigation} />
        </View>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
          Kritik & Saran Pengunjung
        </Text>
        <View style={styles.historyCardContainer}>
          <ErrorWrapper
            error={error}
            fallbackTitle="Refresh"
            fallbackFunc={this.refresh}
            component={this.renderFeedback()}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ AdminReducer }: any) => ({
  data: AdminReducer.data
})

export default connect(mapStateToProps)(FeedbackList)
