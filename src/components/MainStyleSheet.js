import { StyleSheet } from 'react-native';

const Background = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
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
  primaryAlertText: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  englishAlertText: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
})

export { Background, CardSectionStyle, TextStyles };