import React, {Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';

/**
 * NoConnectionScreen.js
 * This view is used when there is no network connection
 * It has a button that allows the the connection to be reattempted
 */
export default class NoConnectionScreen extends Component {
    render() {
        return(
            <View style={this.props.styles.container}>
                <Text style={this.props.styles.header}>No internet connection</Text>
                <TouchableOpacity onPress={this.props._onPress} style={this.props.styles.button}>
                    <Text style={this.props.styles.buttonText}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    }
}