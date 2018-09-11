import * as moment from 'moment';
import {Moment} from 'moment';

export function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}

export function pipe(...fns) {
  return compose.apply(compose, fns.reverse());
}

export function initRange(props, state) {
  return (clickedDay: Moment, currentFocus) => {
    return {
      clickedDay,
      currentFocus,
      nextFocus: currentFocus === 'startDate' ? 'endDate' : 'startDate',
      startDate: currentFocus === 'startDate' ? moment(clickedDay) : state.startDate,
      endDate: currentFocus === 'endDate' ? moment(clickedDay) : null,
    };
  };
}

export function setWeekBounds(props, state) {
  return (range) => {

    // Если выбираются недели, то начальной датой диапазона будет первый день недели, по которой был сделан клик
    const startDate = props.isWeeksSelection && range.currentFocus === 'startDate'
      ? moment(range.startDate).locale(props.locale).startOf('week')
      : range.startDate;

    let endDate = range.endDate;

    // Если выбираются недели, то конечной датой диапазона будет последний день недели, по которой был сделан клик
    if (props.isWeeksSelection && range.currentFocus === 'endDate') {
      // если при выборе недель начальная дата меньше, чем выбранная, то конечная дата становится началом выбранном недели
      // такое возможно, когда выделение происходит не слева направо, а справа налево.
      endDate = range.startDate.isAfter(range.clickedDay)
        ? moment(range.clickedDay).locale(props.locale).startOf('week')
        : moment(endDate).locale(props.locale).endOf('week');
    }

    return {
      ...range,
      startDate,
      endDate,
    };
  };
}

export function reverseDates(props, state) {
  return (range) => {
    if (range.currentFocus === 'startDate' || !range.endDate || range.endDate.isAfter(range.startDate, 'day')) {
      return range;
    }

    // если получилось так, что конечная дата меньше начальной (выделение справа налево), то меняем эти даты местами
    return {
      ...range,
      nextFocus: 'startDate',
      startDate: props.isWeeksSelection
        ? moment(range.clickedDay).locale(props.locale).startOf('week')
        : moment(range.clickedDay),
      endDate: range.startDate.clone(),
    };
  };
}

export function setMonthBounds(props, state) {
  return (range) => {
    if (state.pickerType !== 'month') {
      return range;
    }

    return {
      ...range,
      startDate: moment(range.startDate).startOf('month'),
      endDate: range.endDate ? moment(range.endDate).endOf('month') : null,
    };
  };
}

export function validateRange(props, state) {
  return (range) => {
    // нужно убедиться, что выбранные даты не выходят за рамки разрешенного диапазона
    return {
      ...range,
      startDate: range.startDate && props.minDate
        ? moment.max(props.minDate, range.startDate)
        : range.startDate,
      endDate: range.endDate && props.maxDate
        ? moment.min(props.maxDate, range.endDate)
        : range.endDate,
    };
  };
}
