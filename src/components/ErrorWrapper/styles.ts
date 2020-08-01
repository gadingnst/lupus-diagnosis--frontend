import { StyleSheet } from 'react-native'
import { Theme } from 'configs'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: Theme.danger,
    marginBottom: 15
  }
})
