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
    paddingTop: 25,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logoImage: {
    width: 100,
    height: 98
  },
  userImage: {
    width: 70,
    height: 70,
    backgroundColor: '#1b364e',
    borderRadius: 35,
    marginRight: 10
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
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  bannerAd: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
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
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
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