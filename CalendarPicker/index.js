import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Dimension,
} from 'react-native';
import { makeStyles } from './makeStyles';
import { Utils } from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import moment from 'moment-jalaali';

const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: null,
      currentYear: null,
      selectedStartDate: this.props.selectedStartDate ? moment(this.props.selectedStartDate, 'YYYY-MM-DD') : null,
      selectedEndDate: null,
      styles: {},
    };
    this.updateScaledStyles = this.updateScaledStyles.bind(this);
    this.updateMonthYear = this.updateMonthYear.bind(this);
    this.handleOnPressPrevious = this.handleOnPressPrevious.bind(this);
    this.handleOnPressNext = this.handleOnPressNext.bind(this);
    this.handleOnPressDay = this.handleOnPressDay.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  static defaultProps = {
    initialDate: moment(),
    scaleFactor: 375,
  }

  componentWillMount() {
	const { disabledDates } = this.props;
	  if (disabledDates && Array.isArray(disabledDates)) {
      disabledDates.map(function(date, index, disabledDates){
        date.setHours(0,0,0,0);
        disabledDates[index] = date.getTime();
      });
    }
    this.setState({...this.updateScaledStyles(this.props), ...this.updateMonthYear(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    let newStyles = {};
    if (nextProps.width !== this.props.width ||
        nextProps.height !== this.props.height)
    {
      newStyles = this.updateScaledStyles(nextProps);
    }

    let newMonthYear = {}
    if (Utils.getTime(nextProps.initialDate) !== Utils.getTime(this.props.initialDate)) {
      this.updateMonthYear(nextProps, {});
    }

    this.setState({...newStyles, ...newMonthYear});
  }

  updateScaledStyles(props) {
    const {
      selectedDayBorderColor,
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width, height,
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;
    const initialScale = Math.min(containerWidth, containerHeight) / scaleFactor;
    return {styles: makeStyles(initialScale, selectedDayColor, selectedDayBorderColor, selectedDayTextColor, todayBackgroundColor)};
  }

  updateMonthYear(props) {
    return {
      currentMonth: parseInt(props.initialDate.jMonth()),
      currentYear: parseInt(props.initialDate.jYear()),
    };
  }

  handleOnPressDay(day, type) {
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate,
    } = this.state;

    const {
      allowRangeSelection,
      onDateChange,
    } = this.props;

    const date = moment(currentYear+'/'+(currentMonth+1)+'/'+(day), 'jYYYY/jM/jD');

    if (allowRangeSelection &&
        selectedStartDate &&
        date >= selectedStartDate &&
        !selectedEndDate) {
      this.setState({
        selectedEndDate: date,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.END_DATE);
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.START_DATE);
    }
  }

  handleOnPressPrevious() {
    const { currentMonth, currentYear } = this.state;
    const previousMonth = currentMonth - 1;
    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (previousMonth < 0) {
      this.setState({
        currentMonth: parseInt(11), // setting month to December
        currentYear: parseInt(currentYear) - 1, // decrement year
      });
    } else {
      this.setState({
        currentMonth: parseInt(previousMonth),
        currentYear: parseInt(currentYear),
      });
    }
  }

  handleOnPressNext() {
    const { currentMonth, currentYear } = this.state;
    const nextMonth = currentMonth + 1;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (nextMonth > 11) {
      this.setState({
        currentMonth: parseInt(0), // setting month to January
        currentYear: parseInt(currentYear) + 1, // increment year
      });
    } else {
      this.setState({
        currentMonth: parseInt(nextMonth),
        currentYear: parseInt(currentYear),
      });
    }
  }

  onSwipe(gestureName) {
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handleOnPressNext();
        break;
      case SWIPE_RIGHT:
        this.handleOnPressPrevious();
        break;
    }
  }

  render() {
    const {
      currentMonth,
      currentYear,
      selectedStartDate,
      selectedEndDate,
      styles,
    } = this.state;

    const {
      allowRangeSelection,
      startFromMonday,
      initialDate,
      minDate,
      maxDate,
      weekdays,
      months,
      previousTitle,
      nextTitle,
      textStyle,
	  disabledDates,
    } = this.props;
    const scaler = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) / 375;
    return (
        <View style={{ display: 'flex', flexDirection: 'column', height: 320*scaler, marginTop: 10*scaler }}>
          <View style={{ flex: 1 }}>
          <HeaderControls
            styles={styles}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={initialDate}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            months={months}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            textStyle={textStyle}
          />
          </View>
          <View style={{ flex: 1.2 }}>
          <Weekdays
            styles={styles}
            startFromMonday={startFromMonday}
            weekdays={weekdays}
            textStyle={textStyle}
          />
          </View>
          <View style={{ flex: 5 }}>
          <DaysGridView
            month={currentMonth}
            year={currentYear}
            styles={styles}
            onPressDay={this.handleOnPressDay}
            startFromMonday={startFromMonday}
            allowRangeSelection={allowRangeSelection}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            minDate={minDate && minDate.setHours(0,0,0,0)}
            maxDate={maxDate && maxDate.setHours(0,0,0,0)}
			disabledDates={disabledDates}
            textStyle={textStyle}
          />
          </View>
        </View>
    );
  }
}
