import * as React from 'react';
import * as moment from 'moment';
import {Moment} from 'moment';
import * as cn from 'classnames';
import {Day} from '../day/Day';
import {isDayHovered, isDaySelected, isSameDay, isWeekEnd, isDayDisabled} from '../../utils/day';
import * as styles from './style/month.module.styl';

export class Month extends React.PureComponent<IMonthProps> {
  constructor(props) {
    super(props);
  }

  handleClick(date: Moment) {
    return (e) => {
      this.props.onClick(date);
    };
  }

  handleHover(date: Moment) {
    return (e) => {
      this.props.onHover(date);
    };
  }

  handleTitleClick(date) {
    return () => {
      if (this.props.onTitleClick) {
        this.props.onTitleClick(date);
      }
    };
  }

  render() {
    const {month, year, locale, showOutsideDays, startDate, endDate, hoveredDate, onTitleClick} = this.props;
    const yearMonth = `${year}-${month}`;
    const localeData = moment.localeData(locale);

    const prevMonth = moment(yearMonth, 'YYYY-MM').add(-1, 'month');
    const currentMonth = moment(yearMonth, 'YYYY-MM');
    const nextMonth = moment(yearMonth, 'YYYY-MM').add(1, 'month');

    const daysInPrevMonth = prevMonth.daysInMonth();
    const daysInMonth = currentMonth.daysInMonth();

    const weekDays = Array.from(localeData.weekdaysShort());
    const firstDayOfWeek = localeData.firstDayOfWeek();
    let firstDayOfMonth = Number(currentMonth.startOf('month').format('E'));

    if (firstDayOfWeek === 1) {
      const sunday = weekDays.shift();
      weekDays.push(sunday);
      // index of week's day from weekDays that is first day of current month
      firstDayOfMonth = firstDayOfMonth - 1 < 0 ? 6 : firstDayOfMonth - 1;
    }

    // if month doesn't start from monday then add days from previous month to complete week
    const daysOfPrevMonth = Array.from({length: firstDayOfMonth}, (v, k) => !showOutsideDays ? null : daysInPrevMonth - k).reverse();
    const days = Array.from({length: daysInMonth}, (v, k) => k + 1);
    days.unshift(...daysOfPrevMonth);

    // Month may cross five or six weeks (35 or 42 days) so add days from next month to complete 5-th or 6-th week just for beauty perfomance
    const daysOfNextMonth = Array.from(
      {length: (days.length > 35 ? 42 : 35) - daysInMonth - firstDayOfMonth},
      (v, k) => !showOutsideDays ? null : k + 1,
    );
    days.push(...daysOfNextMonth);

    return (
      <div className={styles.month}>
        <div className='header'>
          <div className={cn(styles.headerMonth, onTitleClick && styles.headerClickable)} onClick={this.handleTitleClick(currentMonth)}>
            {localeData.months(currentMonth)}, {currentMonth.format('YYYY')}
          </div>
          <div className={styles.headerWeekDays}>
            {weekDays.map((monthName, index) => (<span key={index}>{monthName}</span>))}
          </div>
        </div>
        <div className='days'>
          <div className={styles.daysWeek}>
            {days.map((day, index) => {
              let currentDay = moment(currentMonth).date(day);

              if (index < firstDayOfMonth) {
                currentDay = !showOutsideDays ? moment.invalid() : moment(prevMonth).date(day);
              }

              if (index > (daysInMonth - 1) + firstDayOfMonth) {
                currentDay = !showOutsideDays ? moment.invalid() : moment(nextMonth).date(day);
              }

              const isDayOff = isWeekEnd(currentDay);
              const isSelected = isDaySelected(currentDay, startDate, endDate);
              const isFirstSelected = isSameDay(currentDay, startDate);
              const isLastSelected = isSameDay(currentDay, endDate);
              const isDisabled = isDayDisabled(currentDay, this.props);
              const isClickable = !isDisabled;
              const isHovered = isDayHovered(currentDay, startDate, endDate, hoveredDate);

              return (
                <Day
                  key={index}
                  text={day}
                  isDisabled={isDisabled}
                  isDayOff={isDayOff}
                  isSelected={isSelected}
                  isFirstSelected={isFirstSelected}
                  isLastSelected={isLastSelected}
                  isClickable={isClickable}
                  isHovered={isHovered}
                  onClick={isClickable ? this.handleClick(currentDay) : null}
                  onHover={this.handleHover(currentDay.isValid() ? currentDay : null)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export interface IMonthProps {
  ref: any;
  month: number;
  year: number;
  locale: string;
  showOutsideDays: boolean;
  startDate?: Moment;
  endDate?: Moment;
  onClick: (date: Moment) => void;
  onTitleClick: (date: Moment) => void;
  minDate?: Moment;
  maxDate?: Moment;
  hoveredDate?: Moment | Moment[];
  onHover: (date: Moment) => void;
  minDaysCount?: number;
  maxDaysCount?: number;
}
