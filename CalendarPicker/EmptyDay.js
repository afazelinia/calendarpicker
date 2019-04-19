import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Day(props) {
  const { styles } = props;
  const initialScale = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) / 375;
  return(
    <View style={{ alignItems: "center", backgroundColor: "rgba(0,0,0,0.0)", height: 40*initialScale, justifyContent: "center", width: 50*initialScale }}>
      <View style={{ alignSelf: "center", height: 40*initialScale, width: 50*initialScale }}>
        <TouchableOpacity
          style={{ alignSelf: "center", height: 40*initialScale, width: 50*initialScale }}
        >
          <Text style={{ fontSize: 14*initialScale, color: '#000', marginTop: 6*initialScale, alignSelf: 'center' }}>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Day.propTypes = {
  styles: PropTypes.shape({}),
  day: PropTypes.number,
  onPressDay: PropTypes.func,
}
