import React, {Component} from 'react';
import {Text, FlatList, ScrollView} from 'react-native';
import axios from 'axios';
import ListItemSeparator from './ListItemSeparator';
import LoadingScreen from './LoadingScreen.js';
import NoConnectionScreen from './NoConnectionScreen';

/**
 * DetailScreen.js
 * This view shows the tasks, completed and incomplete for a specific user
 */
export default class DetailScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam('name',"No name")
        };
    }
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        let id = navigation.getParam("id","Some id");
        let styles = navigation.getParam('styles',"Some styles");
        this.state = {
            id : id,
            dataCollected : 'no',
            data:[],
            styles:styles
        }
        this.getData = this.getData.bind(this);
        this.getData();
    }

    //Gets all the tasks from the website
    getData() {
        let self = this;
        let errorBool = false;
        axios.get('https://jsonplaceholder.typicode.com/todos/')
        .catch((error) => {
            // handle error
            self.setState({dataCollected:'no connection'});
            console.log("Error collecting data");
            console.log(error);
            errorBool = true;
        }).then(res => {
            // console.log(res);
            if(errorBool === false) {
                self.setState({ data : res.data, dataCollected: 'yes'});
            }
        });
    }

    //Returns 2 arrays that include completed and incomplete tasks
    //These tasks are specific to the user selected
    splitTasks(data,id) {
        let completedTasks = [];
        let incompletedTasks = [];
        for(let x =0;x < data.length;x++) {
            if(data[x].userId == id) {
                if(data[x].completed == true) {
                    completedTasks.push({data:data[x],key:data[x].id.toString()});
                } else {
                    incompletedTasks.push({data:data[x],key:data[x].id.toString()});
                }
            }
        }
        return {completed:completedTasks,incompleted:incompletedTasks};
    }

    render() {
        if(this.state.dataCollected === "yes") {
            let tasks = this.splitTasks(this.state.data,this.state.id);
            return (
                <ScrollView contentContainerStyle={this.state.styles.container}>
                    <Text style={{fontWeight:'bold',fontSize:20,padding:10}}>Completed tasks</Text>
                    <FlatList data={tasks.completed} ItemSeparatorComponent={ListItemSeparator} renderItem={({item})=> <Text style={this.state.styles.listItem}>{item.data.title}</Text>} />
                    <Text style={{fontWeight:'bold',fontSize:20,padding:10}}>Incompleted tasks</Text>
                    <FlatList data={tasks.incompleted} ItemSeparatorComponent={ListItemSeparator} renderItem={({item})=> <Text style={this.state.styles.listItem}>{item.data.title}</Text>} />
                </ScrollView>
            );
        } else if(this.state.dataCollected === "no") {
            return (
                <LoadingScreen styles={this.state.styles} />
            );
        } else if(this.state.dataCollected === 'no connection') {
            return (
                <NoConnectionScreen _onPress={this.getData} styles={this.state.styles} />
            );
        }
    }
}

