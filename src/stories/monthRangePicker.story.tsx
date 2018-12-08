import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../components/PickerProvider';
import {MonthPickerController} from '../components/MonthPickerController';
import * as styles from './styles.styl';
import * as customStyles from './customCalendarStyles.styl';
import * as moment from 'moment';

storiesOf('MonthRangePicker', module)
  .add('The simplest one', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
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
  ))
  .add('Initial dates', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      initialStartDate={moment().add(-2, 'month')}
      initialEndDate={moment()}
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
  ))
  .add('3 years', () => (
    <PickerProvider
      unitCount={3}
      showOutsideDays
      pickerType='month'
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
  ))
  .add('With minimum and maximum dates set', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      unitCount={3}
      showOutsideDays
      minDate={moment().add(-1, 'year')}
      maxDate={moment().add(2, 'year')}
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
  ))
  .add('With russian locale', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      unitCount={3}
      locale='ru'
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
  ))
  .add('With german locale', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      unitCount={3}
      locale='de'
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
  ))
  .add('Custom styles', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      pickerType='month'
      styles={customStyles}
    >
      <PickerConsumer>
        {({handlePrevUnit, handleNextUnit}) => (
          <div className={customStyles.calendar}>
            <div className={customStyles.right} onClick={handleNextUnit}>&rarr;</div>
            <div className={customStyles.left} onClick={handlePrevUnit}>&larr;</div>
            <MonthPickerController />
          </div>
        )}
      </PickerConsumer>
    </PickerProvider>
  ));
