import { StyleSheet } from 'react-native'

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
  picContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectUser: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 80
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    marginVertical: 15
  },
  btn: {
    padding: 10
  }
})
