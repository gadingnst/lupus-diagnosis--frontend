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
  carousel: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  errorText: {
    color: Theme.danger,
    marginBottom: 15
  },
  subtitle: {
    marginVertical: 10,
    color: '#999999'
  }
})
