import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const Device = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
}
export default Device;
