import React, {Component} from 'react';
import {Text, View} from 'react-native';

/**
 * LoadingScreen.js
 * This view is used when the view is loading data
 */
export default class LoadingScreen extends Component {
    render() {
        return(
            <View style={this.props.styles.container}>
                <Text style={this.props.styles.header}>Loading data</Text>
            </View>
        );
    }
}