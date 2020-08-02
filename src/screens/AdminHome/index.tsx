import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { Menu } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { AdminData } from 'api/Admin'

interface Props extends StackScreenProps<RootStackParamsList, 'AdminHome'> {
  data: AdminData
}

class AdminHome extends PureComponent<Props> {
  public render(): JSX.Element {
    const { navigation, data } = this.props
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Selamat Datang, {data.username}</Text>
          <Menu navigation={navigation} />
          <View style={styles.picContainer}>
            <Text style={styles.title}>FOTO</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ AdminReducer }: any) => ({
  data: AdminReducer.data
})

export default connect(mapStateToProps)(AdminHome)
