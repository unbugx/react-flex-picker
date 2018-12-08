import * as moment from 'moment';
import {Moment} from 'moment';
import {IYearProps} from '../components/year/Year';

export function isMonthSelected(month: Moment, startDate: Moment, endDate: Moment) {
  if (!startDate || !endDate) {
    return false;
  }

  const firstMonthDay = moment(month).startOf('month');
  const lastMonthDay = moment(month).endOf('month');

  return firstMonthDay.isBetween(startDate, endDate, 'month', '[]')
    || lastMonthDay.isBetween(startDate, endDate, 'month', '[]');
}

export function isMonthHovered(month: Moment, startDate: Moment, endDate: Moment, hoveredDate: Moment | Moment[]) {
  return !Array.isArray(hoveredDate) && !endDate && startDate && hoveredDate
    && (
      month.isBetween(startDate, hoveredDate, 'month', '(]')
      || month.isBetween(hoveredDate, startDate, 'month', '[)')
    );
}

export function isMonthDisabled(month: Moment, props: IYearProps) {
  const {minDate, maxDate, minDaysCount, maxDaysCount, startDate, endDate} = props;

  const firstMonthDay = moment(month).startOf('month');
  const lastMonthDay = moment(month).endOf('month');

  let isDisabled = false;

  const minPrevAvailableMonth = moment(startDate).endOf('month').add(-minDaysCount + 1, 'day');
  const minNextAvailableMonth = moment(startDate).startOf('month').add(minDaysCount - 1, 'day');

  let endMonthDate = moment(startDate).endOf('month');
  endMonthDate = maxDate ? moment.min(endMonthDate, maxDate) : endMonthDate;

  const maxPrevAvailableMonth = moment(endMonthDate).add(-maxDaysCount + 1, 'day');
  const maxNextAvailableMonth = moment(startDate).startOf('month').add(maxDaysCount - 1, 'day');

  if (minDaysCount && startDate && !endDate
    && (
      month.isBetween(minPrevAvailableMonth, startDate, 'month', '()') || month.isBetween(startDate, minNextAvailableMonth, 'month', '()')
    )
  ) {
    isDisabled = true;
  }

  if (maxDaysCount && startDate && !endDate
    && (
      month.isBefore(maxPrevAvailableMonth, 'month') || month.isAfter(maxNextAvailableMonth, 'month')
    )
  ) {
    isDisabled = true;
  }

  // отключаем даты вне валидного диапазона
  if (minDate && lastMonthDay.isBefore(minDate, 'day') || maxDate && firstMonthDay.isAfter(maxDate, 'day')) {
    isDisabled = true;
  }

  return isDisabled;
}

export function isSameMonth(month: Moment, b: Moment) {
  if (!b || !month.isValid()) {
    return false;
  }

  return month.isSame(b, 'month');
}
