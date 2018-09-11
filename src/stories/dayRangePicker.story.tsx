import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../components/PickerProvider';
import {DayPickerController} from '../components/DayPickerController';
import * as styles from './styles.styl';
import * as moment from 'moment';

storiesOf('DayRangePicker', module)
  .add('The simplest one', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
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
  ))
  .add('Initial dates', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      initialStartDate={moment().add(-7, 'day')}
      initialEndDate={moment()}
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
  ))
  .add('With outside days enabled', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      showOutsideDays
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
  ))
  .add('3 month', () => (
    <PickerProvider
      unitCount={3}
      showOutsideDays
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
  ))
  .add('Weeks selection', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      showOutsideDays
      isWeeksSelection
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
  ))
  .add('With minimum and maximum dates set', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      showOutsideDays
      minDate={moment().add(-50, 'day')}
      maxDate={moment().add(50, 'day')}
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
  ))
  .add('With minimum and maximum days in range', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      showOutsideDays
      minDaysCount={3}
      maxDaysCount={7}
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
  ))
  .add('With russian locale', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      locale='ru'
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
  ))
  .add('With german locale', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      locale='de'
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
