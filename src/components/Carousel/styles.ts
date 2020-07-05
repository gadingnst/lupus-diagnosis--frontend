import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12
  },
  container: {
    width: '100%',
    backgroundColor: '#fbfbfb',
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#fcfcfc',
    shadowOpacity: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  slide: {
    flex: 1,
    flexBasis: '100%',
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dots: {
    bottom: 15,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 5
  },
  dot: {
    paddingHorizontal: 5,
    fontSize: 20
  }
})
