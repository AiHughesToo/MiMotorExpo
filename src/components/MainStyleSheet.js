import { StyleSheet } from 'react-native';

const Background = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
})

const Logo = StyleSheet.create({
  logoContainer: {
    paddingTop: 5,
    paddingBottom: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logoImage: {
    width: 55,
    height: 53
  },
  userImage: {
    width: 75,
    height: 75,
    backgroundColor: '#1b364e',
    borderRadius: 35,
    marginRight: 10
  },
  userImageMainScreen: {
    width: 60,
    height: 60,
    backgroundColor: '#1b364e',
    borderRadius: 35,
    marginRight: 10
  },
  adContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  }
})

const Award = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 87,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

const CardSectionStyle = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  containerTwo: {
    padding: 5,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    position: 'relative'
  },
  bannerAd: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 10
  },
  extraView: {
    flex: 1,
    paddingTop: 25,
  }
})

const AlertBox = StyleSheet.create({
  alertBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8cd81',
    borderRadius: 5,
    padding: 5,
    flex: 1,
  }
})

const TextStyles = StyleSheet.create({
  primaryLangStyleLrg: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 7,
    paddingBottom: 7
  },
  primaryLangStyleSml: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 8
  },
  primaryLangStyleLrgNoPad: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  primaryLangStyleSmlNoPad: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  verySmlNoPad: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  primaryAlertText: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
})

// colors
const redColor    = '#d94c35';
const yellowColor = '#fbc042';
const greenColor  = '#94cd65';

export { Background, Logo, CardSectionStyle, TextStyles, AlertBox, Award, redColor, yellowColor, greenColor };