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
  pickerContainer: {
    width: '100%',
    paddingHorizontal: 15
  },
  picker: {
    marginVertical: 5,
    height: 50,
    width: 120
  },
  indicationsContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  indicationDetail: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  indicationText: {
    flex: 0.35,
    fontSize: 18
  },
  indicationTextResult: {
    flex: 0.65,
    fontWeight: 'bold',
    fontSize: 18
  },
  indicationInput: {
    flex: 0.65,
    borderStyle: 'solid',
    borderColor: Theme.black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  toggleEditContainer: {
    width: 120,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  btnManage: {
    marginHorizontal: 5
  }
})
