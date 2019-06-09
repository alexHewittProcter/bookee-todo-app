import React, {Component} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import TouchListItem from './TouchListItem';
import ListItemSeparator from './ListItemSeparator';
import LoadingScreen from './LoadingScreen';
import NoConnectionScreen from './NoConnectionScreen';

/**
 * HomeScreen.js
 * This view displays a list of all the users, when a user is selected it loads the DetailScreen.js
 */
export default class HomeScreen extends Component {
    static navigationOptions = {
        title : "Users"
    }
    constructor(props) {
      super(props);
      this.state = {
        dataCollected:'no',
        userData:[]
      }
      this.getData = this.getData.bind(this);
      this.getData();
    }

    // Gets the user data from the website
    getData() {
      // console.log("Get data");
      let self = this;
      let errorBool = false;
      //Gets todo tasks from website
      axios.get('https://jsonplaceholder.typicode.com/users/')
      .catch((error) => {
        // handle error
        self.setState({dataCollected:'no connection'});
        console.log(error);
        errorBool = true;
      }).then(res => {
        // console.log(res);
        if(errorBool !== true) {
          self.setState({ userData : res.data, dataCollected: 'yes'});
        }
      });
    }

    // Add keys to the data to be used when displaying in a list
    addKeyToData(data) {
        let newData = [];
        for(let x =0; x<data.length;x++) {
            newData.push({data:data[x],key:data[x].id.toString()});
        }
        return newData;
    }

    render() {
      // Return a particular view based on if data has been collected or if there is a network connection
     if(this.state.dataCollected == 'yes') {
      return (
        <View style = {styles.container}>
          <FlatList
            ItemSeparatorComponent={ListItemSeparator}
            data={this.addKeyToData(this.state.userData)}
            renderItem={({item}) => <TouchListItem style={styles.listItem} styles={styles} navigation={this.props.navigation} id={item.data.id} value={item.data.name}/>}
          />
        </View>
      );
    } else if(this.state.dataCollected == 'no') {
      return (
        <LoadingScreen styles={styles} />
      );
    } else {
      return (
        <NoConnectionScreen _onPress={this.getData} styles={styles}/>
        
      );
    }
  }
}

const styles = StyleSheet.create({
  button:{
    width:260,
    margin:20,
    alignSelf:'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black',
    padding:20
  },
  buttonText:{
    textAlign:'center',
    fontSize:18
  },
  list: {alignSelf:'flex-start'
  },
  header:{
    alignSelf:'center',
    fontSize:25,
    fontWeight:'bold'
  },
  listItem : {fontSize:18,
    padding:10

  },
  container: {
    flex:1,
    // marginTop:(Platform.OS === 'ios') ? 18 : 0,
    backgroundColor:'white',
    alignContent:'center',
    justifyContent: 'center',
  },
});