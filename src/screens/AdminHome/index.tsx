import { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Menu } from 'components'
import { RootStackParamsList } from 'navigator'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'

interface Props extends StackScreenProps<RootStackParamsList, 'AdminHome'> {}

class AdminHome extends PureComponent<Props> {
  public render(): JSX.Element {
    const { navigation } = this.props
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Selamat Datang, (nama admin)</Text>
          <Menu navigation={navigation} />
          <View style={styles.picContainer}>
            <Text style={styles.title}>FOTO</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default AdminHome
