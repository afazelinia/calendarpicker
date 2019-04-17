# react-native-jalali-calendar-picker


This is the Jalali (and Farsi) version of "react-native-calendar-picker" (https://github.com/stephy/CalendarPicker), Calendar Picker Component for React Native

I have tried to cast the `Date` object to `moment-jalali` (https://github.com/jalaali/moment-jalaali) but this is somehow ugly. 

It was a 5-hour work and there are still many issues (i.e `minDate` and `maxDate` does not work properly and might raise error)

Following features work at the moment:

 - Date picker grid
 - Single selection
 - Multi selection
 
 Please refer to the original author's README (https://github.com/stephy/CalendarPicker) for more options and examples.

![alt tag](https://raw.githubusercontent.com/afshinm/JalaliCalendarPicker/master/jalaliPicker.png)


To use the calendar you just need to:
```sh
npm install --save react-native-jalali-calendar-picker
```


# How to use it

```js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;

    const startDate = selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD [is] YYYY/M/D') : '';

    return (
      <View style={styles.container}>
        <JalaliCalendarPicker
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});
```
## JalaliCalendarPicker Props
| Prop | Type | Description |
:------------ |:---------------| :-----|
| **`weekdays`** | `Array` | Optional. List of week days. Eg. `['Mon', 'Tue', ...]` Must be 7 days |
| **`months`** | `Array` | Optional. List of months names. Eg. `['Jan', 'Feb', ...]` Must be 12 months |
| **`startFromMonday`** | `Boolean` | Optional. Default first day of week will be Sunday. You can set start of week from Monday by setting this to true. Default is `false` |
| **`allowRangeSelection`** | `Boolean` | Optional. Allow to select date ranges. Default is `false` |
| **`previousTitle`** | `String` | Optional. Title of button for previous month. Default is `Previous` |
| **`nextTitle`** | `String` | Optional. Title of button for next month. Default is `Next` |
| **`selectedDayColor`** | `String` | Optional. Color for selected day |
| **`selectedDayTextColor`** | `String` | Optional. Text color for selected day |
| **`todayBackgroundColor`** | `String` | Optional. Background color for today. Default is `#cccccc` |
| **`textStyle`** | `Object` | Optional. Style overall text. Change fontFamily, color, etc. |
| **`scaleFactor`** | `Number` | Optional. Default (375) scales to window width |
| **`minDate`** | `Date` | Optional. Specifies minimum date to be selected |
| **`maxDate`** | `Date` | Optional. Specifies maximum date to be selected |
| **`initialDate`** | `Date` | Optional. Date that calendar opens to. Defaults to today. |
| **`width`** | `Number` | Optional. Width of CalendarPicker's container. Defaults to Dimensions width.|
| **`height`** | `Number` | Optional. Height of CalendarPicker's container. Defaults to Dimensions height.|

# Styles
Some styles will overwrite some won't. For instance:
- If you provide textStyle with fontFamily and color, out of ranges dates will not apply your color, just fontFamily.

Order of precedence:

- defaultColor => textStyle => selectedDayColor
- defaultTodayBackgroundColor => todayBackgroundColor
- defaultBackgroundColor => selectedDayColor
- defaultTextStyles => textStyle => selectedDayTextColor

# Mutli select

```js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import JalaliCalendarPicker from 'react-native-calendar-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const startDate  =  selectedStartDate ? selectedStartDate.format('jYYYY/jM/jD [is] YYYY/M/D') : '';
    const endDate = selectedEndDate ? selectedEndDate.format('jYYYY/jM/jD [is] YYYY/M/D') : '';

    return (
      <View style={styles.container}>
        <JalaliCalendarPicker
          allowRangeSelection={true}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});
```

# Suggestions?

Open Issues. Submit PRs.


#### Running on device
```sh
npm start
```
#### Running on iOS Simulator
```sh
npm run ios
```
