import {
  PixelRatio,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1142',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#7646e4',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});


export default styles;
