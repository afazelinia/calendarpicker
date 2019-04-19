import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Utils } from './Utils';
import PropTypes from 'prop-types';

export default function Weekdays(props) {
  const { styles, startFromMonday, weekdays, textStyle } = props;
  const initialScale = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) / 375;
  let wd = weekdays;
  if (!wd) {
    wd = startFromMonday? Utils.WEEKDAYS_MON : Utils.WEEKDAYS; // English Week days Array
  }
  return (
    <View style={{ alignSelf: "center", backgroundColor: "rgba(0,0,0,0.0)", borderBottomWidth: 1, borderColor: "rgba(0,0,0,0.2)", borderTopWidth: 1, flexDirection: "row", marginBottom: 10*initialScale, paddingBottom: 10*initialScale, paddingTop: 10*initialScale }}>
      { wd.map((day, key) => {
          return (
            <Text key={key} style={{ color: '#000', fontSize: 12*initialScale, textAlign: 'center', width: 50*initialScale, fontFamily: 'IRANSans' }}>
              {day}
            </Text>
          );
        })
      }
    </View>
  );
}

Weekdays.propTypes = {};
