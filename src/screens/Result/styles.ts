import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    marginTop: 30,
    textAlign: 'center'
  },
  result: {
    marginTop: 40,
    width: '100%'
  },
  classification: {
    marginVertical: 8,
    fontSize: 16
  },
  subtitle: {
    marginTop: 25,
    fontSize: 14
  },
  prediction: {
    fontWeight: 'bold'
  },
  btnContainer: {
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  landingImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 120,
    borderRadius: 10
  }
})
