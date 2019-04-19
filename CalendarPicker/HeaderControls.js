import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Utils } from './Utils';
import Controls from './Controls';
import PropTypes from 'prop-types';

export default function HeaderControls(props) {
  const {
    styles,
    initialDate,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    previousTitle,
    nextTitle,
    textStyle,
  } = props;
  const MONTHS = months? months : Utils.MONTHS; // English Month Array
  // getMonth() call below will return the month number, we will use it as the
  // index for month array in english
  const previous = previousTitle ? previousTitle : 'قبلی';
  const next = nextTitle ? nextTitle : 'بعدی';
  const month = MONTHS[currentMonth];
  const year = currentYear;
  const initialScale = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) / 375;
  return (
    <View style={{ alignItems: "center", alignSelf: "center", backgroundColor: "rgba(0,0,0,0.0)", flexDirection: "row", marginBottom: 10*initialScale, padding: 5*initialScale, paddingBottom: 3*initialScale }}>
      <View style={{ width: 80*initialScale }}>
        <Controls
          label={previous}
          onPressControl={onPressPrevious}
          styles={{ fontSize: 14*initialScale, textAlign: "right" }}
          textStyles={{ fontFamily: 'IRANSans' }}
        />
      </View>
      <View>
        <Text style={{ color: "#000", fontSize: 16*initialScale, textAlign: "center", width: 180*initialScale, fontFamily: 'IRANSans' }}>
           { month } { year }
        </Text>
      </View>
      <View style={{ width: 80*initialScale }}>
        <Controls
          label={next}
          onPressControl={onPressNext}
          styles={{ fontSize: 14*initialScale, textAlign: "left" }}
          textStyles={{ fontFamily: 'IRANSans' }}
        />
      </View>
    </View>
  );
}

HeaderControls.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
};
