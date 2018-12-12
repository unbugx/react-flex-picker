import * as React from 'react';
import * as moment from 'moment';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../../components/PickerProvider';
import {DayPickerController} from '../../components/DayPickerController';
import * as styles from '../styles.styl';

export class CalendarWithPresets extends React.Component<any, any> {
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
    if (this.state.selectedStartDate && this.state.selectedEndDate) {
      console.log(this.state.selectedStartDate.format('DD.MM.YYYY'), this.state.selectedEndDate.format('DD.MM.YYYY'));
      action('onApply')(this.state.selectedStartDate, this.state.selectedEndDate);
    }
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
