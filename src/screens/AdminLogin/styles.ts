import { StyleSheet } from 'react-native'
import { Theme } from 'configs'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 80
  },
  title: {
    fontSize: 24
  },
  input: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: Theme.black,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  inputContainer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    marginVertical: 15
  }
})
