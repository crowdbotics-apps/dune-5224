import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
    zIndex: -1,
  },
  list: {
    padding: 10,
  }
})

export default styles;