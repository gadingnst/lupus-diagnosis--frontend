import { PureComponent } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { Menu, ErrorWrapper } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { AdminData } from 'api/Admin'
import Feedback, { FeedbackData } from 'api/Feedback'
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

  private renderHistory(): JSX.Element {
    const { feedbacks } = this.state
    return (
      <View style={styles.historyCardContainer}>
        {feedbacks.map(data => (
          <View style={styles.historyCard} key={data.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.historyTitle}>Kritik</Text>
              <Text style={styles.historyTitle}>{data.id}.</Text>
            </View>
            <Text>{data.kritik}</Text>
            <View style={styles.border} />
            <Text style={styles.historyTitle}>Saran</Text>
            <Text>{data.saran}</Text>
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
        </View>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
          Kritik & Saran Pengunjung
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

export default connect(mapStateToProps)(FeedbackList)
