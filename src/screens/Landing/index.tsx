import { PureComponent } from 'react'
import { View, Text, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'
import { Theme } from 'configs'
import styles from './styles'

interface Props extends StackScreenProps<RootStackParamsList, 'Landing'> {}

class Home extends PureComponent<Props> {
  private navigateToAdmin = () => {
    const { navigation } = this.props
    navigation.navigate('AdminLogin')
  }

  private navigateToVisitor = () => {
    const { navigation } = this.props
    navigation.navigate('VisitorInput')
  }

  private renderButtons() {
    return (
      <View style={styles.selectUser}>
        <Text>Siapakah Anda ?</Text>
        <View style={styles.btnContainer}>
          <Button
            color={Theme.primary}
            title="ADMIN"
            onPress={this.navigateToAdmin}
          />
          <Button
            color={Theme.info}
            title="PENGUNJUNG"
            onPress={this.navigateToVisitor}
          />
        </View>
      </View>
    )
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Text>FOTO</Text>
        </View>
        <Text style={styles.title}>
          SELAMAT DATANG DI SISTEM PAKAR DIAGNOSA PENYAKIT LUPUS
        </Text>
        {this.renderButtons()}
      </View>
    )
  }
}

export default Home
