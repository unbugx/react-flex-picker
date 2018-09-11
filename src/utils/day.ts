import * as moment from 'moment';
import {Moment} from 'moment';
import {IMonthProps} from '../components/month/Month';

export function isWeekEnd(day: Moment) {
  return day.isoWeekday() === 6 || day.isoWeekday() === 7;
}

export function isDaySelected(day: Moment, startDate: Moment, endDate: Moment) {
  /*index >= firstDayOfMonth && index <= (daysInMonth - 1) + firstDayOfMonth */
  if (!startDate || !endDate || !day.isValid()) {
    return false;
  }

  return day.isBetween(startDate, endDate, 'day', '[]');
}

export function isDayHovered(day: Moment, startDate: Moment, endDate: Moment, hoveredDate: Moment | Moment[]) {
  if (Array.isArray(hoveredDate)) {
    const [startHoveredDate, endHoveredDate] = hoveredDate;

    if (startDate && !endDate) {
      return (
        day.isBetween(startDate, endHoveredDate, 'day', '(]')
        || day.isBetween(startHoveredDate, startDate, 'day', '[)')
      );
    }

    return false;
  }

  return !endDate && startDate && hoveredDate
    && (
      day.isBetween(startDate, hoveredDate, 'day', '(]')
      || day.isBetween(hoveredDate, startDate, 'day', '[)')
    );
}

export function isDayDisabled(day: Moment, props: IMonthProps) {
  if (!day.isValid()) {
    return true;
  }

  const {startDate, endDate, minDate, maxDate, minDaysCount, maxDaysCount, month} = props;

  const minPrevAvailableDay = moment(startDate).add(-minDaysCount + 1, 'day');
  const minNextAvailableDay = moment(startDate).add(minDaysCount - 1, 'day');

  const maxPrevAvailableDay = moment(startDate).add(-maxDaysCount + 1, 'day');
  const maxNextAvailableDay = moment(startDate).add(maxDaysCount - 1, 'day');

  // отключаем дни из смежных месяцев
  let isDisabled = Number(day.format('MM')) !== month;

  // отключаем даты вне валидного диапазона
  if (minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day')) {
    isDisabled = true;
  }

  if (minDaysCount && startDate && !endDate
    && (
      day.isBetween(startDate, minNextAvailableDay, 'day', '[)')
      || day.isBetween(minPrevAvailableDay, startDate, 'day', '(]')
    )
  ) {
    isDisabled = true;
  }

  if (maxDaysCount && startDate && !endDate && (day.isAfter(maxNextAvailableDay, 'day') || day.isBefore(maxPrevAvailableDay, 'day'))) {
    isDisabled = true;
  }

  return isDisabled;
}

export function isSameDay(day: Moment, b: Moment) {
  if (!b || !day.isValid()) {
    return false;
  }

  return day.isSame(b, 'day');
}
