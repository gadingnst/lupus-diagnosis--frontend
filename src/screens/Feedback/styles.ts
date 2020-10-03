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
    fontSize: 18,
    textAlign: 'center'
  },
  picContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  landingImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 120,
    borderRadius: 10
  },
  historyCardContainer: {
    marginVertical: 20,
    paddingHorizontal: 15
  },
  historyCard: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ebebeb',
    shadowColor: '#fcfcfc',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  border: {
    backgroundColor: '#ddd',
    height: 3,
    width: '75%',
    alignSelf: 'center',
    marginVertical: 10
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
})
