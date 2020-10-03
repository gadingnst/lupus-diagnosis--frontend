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
    textAlign: 'center',
    fontSize: 22,
    paddingHorizontal: 30,
    marginVertical: 20
  },
  textArea: {
    borderColor: Theme.black,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%'
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
