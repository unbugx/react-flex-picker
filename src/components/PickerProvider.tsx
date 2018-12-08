import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Month} from './month/Month';
import {Year} from './year/Year';
// import {initRange, pipe, reverseDates, setMonthBounds, setWeekBounds, validateRange} from '../utils/provider';

const PickerContext = React.createContext<IPickerState>(null);

export class PickerProvider extends React.Component<IPickerProps, IPickerState> {
  static defaultProps = {
    pickerType: 'day',
    unitCount: 1,
    locale: 'en',
    isSingle: false,
  };

  static getDerivedStateFromProps(props: IPickerProps, state: IPickerState) {
    if (state.pickerType !== props.pickerType) {
      return {pickerType: props.pickerType, unitWidth: null};
    }

    if (state.pickerProps.initialStartDate !== props.initialStartDate) {
      return {
        startDate: props.initialStartDate,
        endDate: state.pickerProps.initialEndDate !== props.initialEndDate ? props.initialEndDate : state.endDate,
        currentMonth: props.initialStartDate,
        pickerProps: props,
        unitWidth: null,
      };
    }

    if (state.pickerProps.initialEndDate !== props.initialEndDate) {
      return {
        endDate: props.initialEndDate,
        pickerProps: props,
        unitWidth: null,
      };
    }

    return null;
  }

  units: Map<string, HTMLDivElement>;

  constructor(props: IPickerProps) {
    super(props);

    this.handlePrevUnit = this.handlePrevUnit.bind(this);
    this.handleNextUnit = this.handleNextUnit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.setRef = this.setRef.bind(this);
    this.units = new Map();

    this.state = {
      focus: 'startDate',
      pickerType: props.pickerType,
      setRef: this.setRef,
      handlePrevUnit: this.handlePrevUnit,
      handleNextUnit: this.handleNextUnit,
      handleTitleClick: this.props.onTitleClick,
      handleClick: this.handleClick,
      handleHover: this.handleHover,
      currentMonth: props.initialStartDate || moment(),
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
      unitWidth: null,
      height: null,
      translateX: 0,
      isAnimating: false,
      unitWrapper: React.createRef(),
      pickerProps: this.props,
    };
  }

  componentDidMount() {
    this.setUnitSize();
  }

  componentDidUpdate(prevProps: IPickerProps) {
    if (prevProps.pickerType !== this.props.pickerType || prevProps.initialStartDate !== this.props.initialStartDate) {
      this.setUnitSize();
    }
  }

  getUnit() {
    return this.state.pickerType === 'day' ? 'month' : 'year';
  }

  getPickerHeight(currentMonth = this.state.currentMonth) {
    let visibleHeight = 0;
    for (let i = 0; i < this.props.unitCount; i = i + 1) {
      const key = moment(currentMonth).add(i, this.getUnit()).format('YYYY-MM');
      visibleHeight = Math.max(visibleHeight, this.units.get(key).offsetHeight);
    }

    return visibleHeight;
  }

  setUnitSize() {
    const unitWidth = this.state.unitWrapper.current.offsetWidth / (this.props.unitCount + 2);

    if (this.props.onChangeWidth) {
      this.props.onChangeWidth(unitWidth * this.props.unitCount);
    }

    this.setState({
      unitWidth,
      height: this.getPickerHeight(),
      translateX: -unitWidth,
    });
  }

  setRef(key) {
    return e => this.units.set(key, ReactDOM.findDOMNode(e));
  }

  handleUnit(add) {
    if (this.state.isAnimating) {
      return;
    }

    // Shift to the next month/year and get new height of new visible part of picker
    this.setState({
      translateX: this.state.translateX + (this.state.unitWidth * (add < 0 ? 1 : -1)),
      isAnimating: true,
      height: this.getPickerHeight(moment(this.state.currentMonth).add(add, this.getUnit())),
    });

    // After animation set new current month
    setTimeout(() => {
      this.setState({
        translateX: -this.state.unitWidth,
        isAnimating: false,
        currentMonth: moment(this.state.currentMonth).add(add, this.getUnit()),
      });
    }, 200);
  }

  handlePrevUnit() {
    this.handleUnit(-1);
  }

  handleNextUnit() {
    this.handleUnit(1);
  }

  handleClick(day: Moment) {
    const {locale, isWeeksSelection, maxDate, minDate, isSingle, maxDaysCount} = this.props;
    const {focus, pickerType} = this.state;

    let newStartDate = moment(day);
    let newEndDate = moment(day);
    let currentFocus = focus;

    if (isSingle) {
      currentFocus = 'startDate';
    }

    // Если выбираются недели, то начальной датой диапазона будет первый день недели, по которой был сделан клик
    if (isWeeksSelection && currentFocus === 'startDate') {
      newStartDate = moment(day).locale(locale).startOf('week');
    }

    let startDate = currentFocus === 'startDate' ? newStartDate : this.state.startDate;
    const maxEndDate = moment(startDate).add(maxDaysCount - 1, 'day');

    // Если выбираются недели, то конечной датой диапазона будет последний день недели, по которой был сделан клик
    if (isWeeksSelection && currentFocus === 'endDate') {
      newEndDate = moment(day).locale(locale).endOf('week');

      if (moment(newEndDate).locale(locale).isSame(moment(maxEndDate).locale(locale), 'week')) {
        newEndDate = moment.min(newEndDate, maxEndDate);
      }
    }

    let endDate = currentFocus === 'endDate' ? newEndDate : this.state.endDate;
    let nextFocus: Focus = currentFocus === 'startDate' ? 'endDate' : 'startDate';

    // если снова выбираем начальную дату, то сбрасываем конечную
    if (currentFocus === 'startDate') {
      endDate = null;
    }

    const maxStartDate = moment(startDate).add(-maxDaysCount + 1, 'day');

    // если при выборе недель начальная дата меньше, чем выбранная, то конечная дата становится началом выбранном недели
    // такое возможно, когда выделение происходит не слева направо, справа налево.
    if (isWeeksSelection && currentFocus === 'endDate' && startDate.isAfter(day)) {
      endDate = moment(day).locale(locale).startOf('week');
    }

    // если получилось так, что конечная дата меньше начальной (выделение справа налево), то меняем эти даты местами
    if (currentFocus === 'endDate') {
      if (endDate.isBefore(startDate, 'day')) {
        endDate = startDate.clone();
        startDate = moment(day);

        if (isWeeksSelection) {
          startDate = moment(day).locale(locale).startOf('week');

          if (moment(startDate).locale(locale).isSame(moment(maxStartDate).locale(locale), 'week')) {
            startDate = moment.max(startDate, maxStartDate);
          }
        }

        if (pickerType === 'month') {
          startDate = moment(startDate).startOf('month');
          endDate = moment(endDate).endOf('month');
          endDate = endDate && maxDate ? moment.min(maxDate, endDate) : endDate;

          const maxStartDate = moment(endDate).add(-maxDaysCount + 1, 'day');

          if (maxDaysCount) {
            startDate = moment.max(startDate, maxStartDate);
          }
        }

        nextFocus = 'startDate';
      } else {
        if (pickerType === 'month') {
          startDate = moment(startDate).startOf('month');
          endDate = endDate ? moment(endDate).endOf('month') : endDate;

          const maxEndDate = moment(startDate).add(maxDaysCount - 1, 'day');

          if (maxDaysCount && endDate && endDate.isSame(maxEndDate, 'month')) {
            endDate = moment.min(endDate, maxEndDate);
          }
        }
      }
    }

    // нужно убедиться, что новые выбранные даты не выходят за рамки разрешенного диапазона
    endDate = endDate && maxDate ? moment.min(maxDate, endDate) : endDate;
    startDate = startDate && minDate ? moment.max(minDate, startDate) : startDate;

    if (this.props.onDatesChange) {
      this.props.onDatesChange(startDate, endDate);
    }

    this.setState({startDate, endDate, focus: nextFocus});
  }

  handleHover(hoveredDate?: Moment) {
    const {locale, isWeeksSelection, minDate, maxDate, isSingle} = this.props;
    const {startDate, endDate, pickerType} = this.state;

    if (isSingle) {
      return;
    }

    if (isWeeksSelection && hoveredDate && pickerType === 'day') {
      // Highlight the whole week if startDate is picked
      let startHoveredDate = moment(hoveredDate).locale(locale).startOf('week');
      startHoveredDate = minDate ? moment.max(startHoveredDate, minDate) : startHoveredDate;
      let endHoveredDate = moment(hoveredDate).locale(locale).endOf('week');
      endHoveredDate = maxDate ? moment.min(endHoveredDate, maxDate) : endHoveredDate;

      let newStartDate = startDate ? startDate.clone() : null;

      // if cursor is being moved set proper date
      if (startDate && !endDate) {
        if (hoveredDate.isBefore(startDate)) {
          newStartDate = moment(startDate).locale(locale).endOf('week');
          newStartDate = maxDate ? moment.min(newStartDate, maxDate) : newStartDate;
        }

        if (hoveredDate.isAfter(startDate)) {
          newStartDate = moment(startDate).locale(locale).startOf('week');
          newStartDate = minDate ? moment.max(newStartDate, minDate) : newStartDate;
        }
      }

      this.setState({hoveredDate: [startHoveredDate, endHoveredDate], startDate: newStartDate});
      return;
    }

    this.setState({hoveredDate});
  }

  render() {
    return (
      <PickerContext.Provider value={this.state}>
        {this.props.children}
      </PickerContext.Provider>
    );
  }
}

export type Focus = 'startDate' | 'endDate';

export interface IPickerProps {
  /** Number of month/years for displaying */
  unitCount?: number;
  /** Initial start date in range */
  initialStartDate?: Moment;
  /** Initial end date in range */
  initialEndDate?: Moment;
  /** Current locale is used by Moment */
  locale?: string;
  /** Show days from adjoining month for filling a week */
  showOutsideDays?: boolean;
  /** Minimal valid date */
  minDate?: Moment;
  /** Maximum valid date */
  maxDate?: Moment;
  /** Minimal count of days in range */
  minDaysCount?: number;
  /** Maximum count of days in range */
  maxDaysCount?: number;
  /** Weeks selection */
  isWeeksSelection?: boolean;
  /** Type of elements in unit (day for DayPickerController or month for MonthPickerController */
  pickerType?: 'day' | 'month';
  /** Single picker or range picker */
  isSingle?: boolean;
  /** When new date is picked up */
  onDatesChange?: (startDate: Moment, endDate: Moment) => void;
  /** When unit title is clicked */
  onTitleClick?: () => void;
  /** When picker width was changed sometimes this info can be useful when you build your own calendar */
  onChangeWidth?: (width: number) => void;
  /**
   *
   */
  styles?: {[key: string]: string};
}

export interface IPickerState {
  pickerType: string;
  setRef: (key: string) => (e: Month | Year) => any;
  handlePrevUnit: () => void;
  handleNextUnit: () => void;
  handleTitleClick: (date: Moment) => void;
  handleClick: (date: Moment) => void;
  handleHover: (date: Moment) => void;
  focus: Focus;
  startDate?: Moment;
  endDate?: Moment;
  currentMonth: Moment;
  hoveredDate?: Moment | Moment[];
  height: number;
  unitWidth: number;
  translateX: number;
  isAnimating: boolean;
  unitWrapper: React.RefObject<HTMLDivElement>;
  pickerProps: IPickerProps;
}

export const PickerConsumer = PickerContext.Consumer as React.ComponentType<{
  children: (value: IPickerState) => React.ReactNode;
}>;
