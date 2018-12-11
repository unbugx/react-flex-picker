import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../components/PickerProvider';
import {DayPickerController} from '../components/DayPickerController';
import {MonthPickerController} from '../components/MonthPickerController';
import * as styles from './styles.styl';
import * as moment from 'moment';

storiesOf('SinglePicker/DayPicker', module)
  .add('The simplest one', () => (
    <PickerProvider
      initialStartDate={moment().add(-7, 'day')}
      onDatesChange={action('onDatesChange')}
      isSingle
    >
      <PickerConsumer>
        {({handlePrevUnit, handleNextUnit}) => (
          <div className={styles.calendar}>
            <div className={styles.right} onClick={handleNextUnit}>&rarr;</div>
            <div className={styles.left} onClick={handlePrevUnit}>&larr;</div>
            <DayPickerController />
          </div>
        )}
      </PickerConsumer>
    </PickerProvider>
  ));

storiesOf('SinglePicker/MonthPicker', module)
  .add('The simplest one', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      isSingle
    >
      <PickerConsumer>
        {({handlePrevUnit, handleNextUnit}) => (
          <div className={styles.calendar}>
            <div className={styles.right} onClick={handleNextUnit}>&rarr;</div>
            <div className={styles.left} onClick={handlePrevUnit}>&larr;</div>
            <MonthPickerController />
          </div>
        )}
      </PickerConsumer>
    </PickerProvider>
  ));
