import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../components/PickerProvider';
import {DayPickerController} from '../components/DayPickerController';
import * as styles from './styles.styl';
import * as customStyles from './customCalendarStyles.styl';
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
  .add('Date presets with Apply button', () => {
    class CalendarWithPresets extends React.Component<any, any> {
      constructor(props) {
        super(props);

        this.state = {
          initialStartDate: moment().add(-7, 'day'),
          initialEndDate: moment(),
          selectedStartDate: moment().add(-7, 'day'),
          selectedEndDate: moment(),
        };

        this.handlePreset = this.handlePreset.bind(this);
        this.handleDatesChange = this.handleDatesChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
      }

      handlePreset(newStartDate, newEndDate) {
        this.setState({
          initialStartDate: newStartDate,
          initialEndDate: newEndDate,
          selectedStartDate: newStartDate,
          selectedEndDate: newEndDate,
        });
      }

      handleDatesChange(selectedStartDate, selectedEndDate) {
        this.setState({selectedStartDate, selectedEndDate});
      }

      handleApply() {
        console.log(this.state.selectedStartDate.format('DD.MM.YYYY'), this.state.selectedEndDate.format('DD.MM.YYYY'));
        action('onApply')(this.state.selectedStartDate, this.state.selectedEndDate);
      }

      render() {
        return (
          <PickerProvider
            onDatesChange={this.handleDatesChange}
            unitCount={3}
            showOutsideDays
            initialStartDate={this.state.initialStartDate}
            initialEndDate={this.state.initialEndDate}
          >
            <PickerConsumer>
              {({handlePrevUnit, handleNextUnit}) => (
                <div className={styles.calendar}>
                  <div className={styles.right} onClick={handleNextUnit}>&rarr;</div>
                  <div className={styles.left} onClick={handlePrevUnit}>&larr;</div>
                  <DayPickerController />
                  <div>
                    <button
                      onClick={() => this.handlePreset(moment(), moment())}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => this.handlePreset(moment().add(-1, 'day'), moment().add(-1, 'day'))}
                    >
                      Yesterday
                    </button>
                    <button
                      onClick={() => this.handlePreset(moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month'))}
                    >
                      Next month
                    </button>

                    <button style={{color: 'blue'}} onClick={this.handleApply}>Apply</button>
                  </div>
                </div>
              )}
            </PickerConsumer>
          </PickerProvider>
        );
      }
    }

    return <CalendarWithPresets />;
  })
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
  ))
  .add('Custom styles', () => (
    <PickerProvider
      onDatesChange={action('onDatesChange')}
      unitCount={3}
      styles={customStyles}
    >
      <PickerConsumer>
        {({handlePrevUnit, handleNextUnit}) => (
          <div className={customStyles.calendar}>
            <div className={customStyles.right} onClick={handleNextUnit}>&rarr;</div>
            <div className={customStyles.left} onClick={handlePrevUnit}>&larr;</div>
            <DayPickerController />
          </div>
        )}
      </PickerConsumer>
    </PickerProvider>
  ));
