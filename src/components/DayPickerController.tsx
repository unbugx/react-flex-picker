import * as React from 'react';
import * as moment from 'moment';
import {Month} from './month/Month';
import {Wrapper} from './wrapper/Wrapper';
import {PickerConsumer} from './PickerProvider';

export function DayPickerController() {
  return (
    <PickerConsumer>
      {({setRef, currentMonth, startDate, endDate, hoveredDate, handleClick, handleHover, pickerProps, handleTitleClick}) => {
        const prevInvisibleMonth = moment(currentMonth).add(-1, 'month');
        const nextInvisibleMonth = moment(currentMonth).add(pickerProps.unitCount, 'month');
        const monthList = [
          prevInvisibleMonth,
          currentMonth,
          ...Array.from({length: pickerProps.unitCount - 1}, (v, k) => moment(currentMonth).add(1 + k, 'month')),
          nextInvisibleMonth,
        ];

        return (
          <Wrapper>
            {monthList.map((month) => {
              const key = `${month.format('YYYY-MM')}`;

              return (
                <Month
                  key={key}
                  ref={setRef(key)}
                  month={Number(month.format('MM'))}
                  year={Number(month.format('YYYY'))}
                  locale={pickerProps.locale}
                  showOutsideDays={pickerProps.showOutsideDays}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={pickerProps.minDate}
                  maxDate={pickerProps.maxDate}
                  hoveredDate={hoveredDate}
                  onTitleClick={handleTitleClick}
                  onClick={handleClick}
                  onHover={handleHover}
                  minDaysCount={pickerProps.minDaysCount}
                  maxDaysCount={pickerProps.maxDaysCount}
                />
              );
            })}
          </Wrapper>
        );
      }}
    </PickerConsumer>
  );
}
