import { StyleSheet } from 'react-native'
  
 const styles = StyleSheet.create({ 
    logoContainer: {
        paddingTop: 25,
        paddingBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center'
      },
      forgotPassStyle: {
        color: '#fff',
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 17
      },
      logoImage: {
        width: 100,
        height: 98
      },
      bottomBanner: {
        position: "absolute",
        bottom: 0
      },
      backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#094e6b'
      },
      sectionView: {
        justifyContent: 'center',
      },
      mainLangStyleLrg: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      },
      mainLangStyleSml: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 8
      },
      englishLangStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        paddingTop: 2,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
      },
      alertBox: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#f8cd81',
        borderRadius: 5,
        padding: 5,
        flex: 1,
      },
      alertText: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'bold',
      },
      jobsListStyle: {
        flex: 1,
        backgroundColor: 'white'
      },
      jobsDetailStyle: {
        flex: 1,
        paddingBottom: 20,
      },
      textStyle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
      textStyleTwo: {
        fontSize: 15,
        color: 'white',
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderWidth: 0.3,
        marginBottom: 2,
        borderColor: '#ccc',
      },
      title: {
        color: '#fff',
        fontSize: 18
      },
      nameText: {
        color: '#fff',
        fontSize: 18
      },
      nameView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 5,
        flex: 1,
      },
      buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
      }
  })

 export {styles};