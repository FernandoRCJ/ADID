import { registerRootComponent } from 'expo';

import App from './App';

// RN >= 0.63
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;



// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
