import HomeScreen from './HomeScreen.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DetailScreen from './DetailScreen.js';

/**
 * App.js
 * This is the main initialiser for the App, it loads a navigation stack that originally shows the HomeScreen.js view
 */

// Navigation stack
const MainNavigator = createStackNavigator({
  Home : {screen:HomeScreen},
  Detail : {screen:DetailScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
