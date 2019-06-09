import React, {Component} from 'react';
import {TouchableOpacity,View,Text} from 'react-native';

/**
 * TouchListItem.js
 * This is used to show the users in the list
 * Providing the touch ability to launch a detail view when touched
 */
export default class TouchListItem extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }
    //Shows the detail view when the item is selected
    _onPress() {
        this.props.navigation.navigate('Detail',{name:this.props.value,id:this.props.id,styles:this.props.styles});
        // Alert.alert(this.props.value);
    }
    render() {
        return (
          <TouchableOpacity onPress={this._onPress} keyExtractor={this.props.id}>
            <View>
              <Text style={this.props.style}>{this.props.value}</Text>
            </View>
          </TouchableOpacity>
        );
      }
}