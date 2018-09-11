import * as React from 'react';
import * as moment from 'moment';
import {Year} from './year/Year';
import {Wrapper} from './wrapper/Wrapper';
import {PickerConsumer} from './PickerProvider';

export function MonthPickerController() {
  return (
    <PickerConsumer>
      {({setRef, currentMonth, startDate, endDate, hoveredDate, handleClick, handleHover, pickerProps, focus, handleTitleClick}) => {
        const prevInvisibleMonth = moment(currentMonth).add(-1, 'year');
        const nextInvisibleMonth = moment(currentMonth).add(pickerProps.unitCount, 'year');
        const monthList = [
          prevInvisibleMonth,
          currentMonth,
          ...Array.from({length: pickerProps.unitCount - 1}, (v, k) => moment(currentMonth).add(1 + k, 'year')),
          nextInvisibleMonth,
        ];

        return (
          <Wrapper>
            {monthList.map((month) => {
              const key = `${month.format('YYYY-MM')}`;
              return (
                <Year
                  key={key}
                  ref={setRef(key)}
                  year={Number(month.format('YYYY'))}
                  locale={pickerProps.locale}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={pickerProps.minDate}
                  maxDate={pickerProps.maxDate}
                  hoveredDate={hoveredDate}
                  onTitleClick={handleTitleClick}
                  onClick={handleClick}
                  onHover={handleHover}
                  focus={focus}
                />
              );
            })}
          </Wrapper>
        );
      }}
    </PickerConsumer>
  );
}
