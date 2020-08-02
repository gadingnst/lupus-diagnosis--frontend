import { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { clearData } from 'stores/Actions/Admin'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Theme } from 'configs'
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamsList } from 'navigator'

interface Props {
  clearAdminData: () => void
  navigation: StackNavigationProp<
    RootStackParamsList,
    keyof RootStackParamsList
  >
}

class Menu extends PureComponent<Props> {
  private navigate = (screens: keyof RootStackParamsList) => () => {
    const { navigation } = this.props
    navigation.navigate(screens)
  }

  private logout = async () => {
    const { clearAdminData, navigation } = this.props
    await AsyncStorage.removeItem('@admin:data')
    clearAdminData()
    navigation.replace('Splash')
  }

  private renderMenu(
    icon: string,
    text: string,
    screens: keyof RootStackParamsList,
    cb?: () => void
  ) {
    return (
      <TouchableOpacity
        style={styles.menu}
        onPress={cb || this.navigate(screens)}
      >
        <Icon name={icon} size={32} color={Theme.black} />
        <Text style={styles.iconText}>{text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        {this.renderMenu('home', 'HOME', 'AdminHome')}
        {this.renderMenu('database', 'DATA GEJALA', 'ManageIndication')}
        {this.renderMenu('sign-out', 'LOGOUT', 'AdminLogin', this.logout)}
      </View>
    )
  }
}

const mapDispatchToProps = {
  clearAdminData: clearData
}

export default connect(null, mapDispatchToProps)(Menu)
