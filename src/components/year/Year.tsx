import * as React from 'react';
import * as moment from 'moment';
import {Moment} from 'moment';
import * as cn from 'classnames';
import {Day} from '../day/Day';
import {isMonthDisabled, isMonthSelected, isSameMonth, isMonthHovered} from '../../utils/month';
import * as styles from './style/year.module.styl';
import {Focus} from '../PickerProvider';

export class Year extends React.PureComponent<IYearProps> {
  constructor(props) {
    super(props);
  }

  handleClick(date: Moment) {
    return (e) => {
      let selectedDate = moment(date).startOf('month');
      if (this.props.focus === 'endDate') {
        selectedDate = moment(date).endOf('month');
      }
      this.props.onClick(selectedDate);
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
    const {year, locale, startDate, endDate, hoveredDate, onTitleClick} = this.props;
    const localeData = moment.localeData(locale);
    const monthList = Array.from(localeData.monthsShort());

    return (
      <div className={styles.year}>
        <div className='header'>
          <div className={cn(styles.headerYear, onTitleClick && styles.headerClickable)} onClick={this.handleTitleClick(moment(year, 'YYYY'))}>
            {year}
          </div>
        </div>
        <div className='days'>
          <div className={styles.daysWeek}>
            {monthList.map((month, index) => {
              const currentMonth = moment(`${year}-${index + 1}`, 'YYYY-MM');
              const isSelected = isMonthSelected(currentMonth, startDate, endDate);
              const isFirstSelected = isSameMonth(currentMonth, startDate);
              const isLastSelected = isSameMonth(currentMonth, endDate);
              const isDisabled = isMonthDisabled(currentMonth, this.props);
              const isClickable = !isDisabled;
              const isHovered = isMonthHovered(currentMonth, startDate, endDate, hoveredDate);

              return (
                <Day
                  className={styles.yearMonth}
                  key={index}
                  text={month}
                  isDisabled={isDisabled}
                  isSelected={isSelected}
                  isFirstSelected={isFirstSelected}
                  isLastSelected={isLastSelected}
                  isClickable={isClickable}
                  isHovered={isHovered}
                  onClick={isClickable ? this.handleClick(currentMonth) : null}
                  onHover={this.handleHover(currentMonth)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export interface IYearProps {
  ref: any;
  year: number;
  locale?: string;
  startDate?: Moment;
  endDate?: Moment;
  onClick: (date: Moment) => void;
  onTitleClick: (date: Moment) => void;
  minDate?: Moment;
  maxDate?: Moment;
  hoveredDate?: Moment | Moment[];
  onHover: (date: Moment) => void;
  focus: Focus;
}
