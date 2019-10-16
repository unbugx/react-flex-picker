import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {CalendarWithPresets} from './CalendarWithPresets';
import {CalendarMonthAndDayPicker} from './CalendarMonthAndDayPicker';
import {Calendar} from './Calendar';

storiesOf('Complex examples', module)
  .add('Date presets with Apply button', () => {
    return <CalendarWithPresets />;
  })
  .add('Calendar with Month and Day picker', () => {
    return (
      <React.Fragment>
        <p>Try click on month/year header</p>
        <CalendarMonthAndDayPicker />
      </React.Fragment>
    );
  })
  .add('Custom template', () => {
    return (
      <Calendar />
    );
  });
