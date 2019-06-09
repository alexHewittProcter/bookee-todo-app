import React, {Component} from 'react';
import {View} from 'react-native';

/**
 * ListItemSeparator.js
 * Shows a visuable line to be used in Lists to separate items
 */
export default class ListItemSeparator extends Component {
    render() {
        return (
          <View style={{height:1, backgroundColor:'grey',margin:5}} />
        );
      }
}
