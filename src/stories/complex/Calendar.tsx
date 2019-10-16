import * as React from 'react';
import * as moment from 'moment';
import {action} from '@storybook/addon-actions';
import {PickerConsumer, PickerProvider} from '../../components/PickerProvider';
import {DayPickerController} from '../../components/DayPickerController';
import {MonthPickerController} from '../../components/MonthPickerController';
// import * as styles from '../styles.styl';
import * as styles from './calendar.styl';

export class Calendar extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      initialStartDate: moment().add(-7, 'day'),
      selectedStartDate: moment().add(-7, 'day'),
    };

    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  handleDatesChange(selectedStartDate) {
    this.setState({selectedStartDate});
  }

  handleApply() {
    if (this.state.selectedStartDate) {
      console.log(this.state.selectedStartDate.format('DD.MM.YYYY'));
      action('onApply')(this.state.selectedStartDate);
    }
  }

  render() {
    return (
      <PickerProvider
        onDatesChange={this.handleDatesChange}
        showOutsideDays
        initialStartDate={this.state.initialStartDate}
        isSingle
      >
        <PickerConsumer>
          {({handlePrevUnit, handleNextUnit}) => (
            <React.Fragment>
              <div className={styles.container}>
                <div className={styles['calendar-base']}>
                  <div className={styles.year}>2017</div>

                  <div className={styles['triangle-left']}></div>
                  <div className={styles['triangle-right']}></div>

                  <div className={styles.months}>
                    <span className={styles['month-hover']}>Jan</span>
                    <span className={styles['month-hover']}>Feb</span>
                    <span className={styles['month-hover']}>Mar</span>
                    <strong className={styles['month-color']}>Apr</strong>
                    <span className={styles['month-hover']}>May</span>
                    <span className={styles['month-hover']}>Jun</span>
                    <span className={styles['month-hover']}>July</span>
                    <span className={styles['month-hover']}>Aug</span>
                    <span className={styles['month-hover']}>Sep</span>
                    <span className={styles['month-hover']}>Oct</span>
                    <span className={styles['month-hover']}>Nov</span>
                    <span className={styles['month-hover']}>Dec</span>
                  </div>

                  <hr className={styles['month-line']} />

                  <div className={styles.days}>SUN MON TUE WED THU FRI SAT</div>

                  <div className={styles['num-dates']}>

                    <div className={styles['first-week']}><span className={styles.grey}>26 27 28 29 30 31</span> 01</div>
                    <div className={styles['second-week']}>02 03 04 05 06 07 08</div>
                    <div className={styles['third-week']}> 09 10 11 12 13 14 15</div>
                    <div className={styles['fourth-week']}> 16 17 18 19 20 21 22</div>
                    <div className={styles['fifth-week']}> 23 24 25 26 <strong className={styles.white}>27</strong> 28 29</div>
                    <div className={styles['sixth-week']}> 30 <span className={styles.grey}>01 02 03 04 05 06</span></div>
                  </div>
                  <div className={styles['event-indicator']}></div>
                  <div className={styles['active-day']}></div>
                  <div className={`${styles['event-indicator']} ${styles.two}`}></div>
                </div>
                <div className={styles['calendar-left']}>

                  <div className={styles.hamburger}>
                    <div className={styles['burger-line']}></div>
                    <div className={styles['burger-line']}></div>
                    <div className={styles['burger-line']}></div>
                  </div>

                  <div className={styles['num-date']}>27</div>
                  <div className={styles.day}>THURSDAY</div>
                  <div className={styles['current-events']}>Current Events
                    <br/>
                    <ul>
                      <li>Day 09 Daily CSS Image</li>
                    </ul>
                    <span className={styles.posts}>See post events</span></div>

                  <div className={styles['create-event']}>Create an Event</div>
                  <hr className={styles['event-line']} />
                  <div className={styles['add-event']}><span className={styles.add}>+</span></div>
                </div>
              </div>
              <DayPickerController />

              {/*<div className={styles.calendar}>
                <div className={styles.right} onClick={handleNextUnit}>&rarr;</div>
                <div className={styles.left} onClick={handlePrevUnit}>&larr;</div>
                <DayPickerController />
              </div>*/}
            </React.Fragment>
          )}
        </PickerConsumer>
      </PickerProvider>
    );
  }
}
