import { StyleSheet } from 'react-native'
import Theme from 'configs/theme'

export default StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Theme.primary
  }
})
