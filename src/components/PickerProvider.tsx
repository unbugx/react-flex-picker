import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Month} from './month/Month';
import {Year} from './year/Year';
import {initRange, pipe, reverseDates, setMonthBounds, setWeekBounds, validateRange} from '../utils/provider';

const PickerContext = React.createContext<IPickerState>(null);

export class PickerProvider extends React.Component<IPickerProps, IPickerState> {
  static defaultProps = {
    pickerType: 'day',
    unitCount: 1,
    classNames: [],
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
    const currentFocus = this.props.isSingle ? 'startDate' : this.state.focus;

    const {startDate, endDate, nextFocus} = pipe(
      initRange(this.props, this.state),
      setWeekBounds(this.props, this.state),
      reverseDates(this.props, this.state),
      setMonthBounds(this.props, this.state),
      validateRange(this.props, this.state),
    )(day, currentFocus);

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
   * Классы, которые можно переопредилить
   * wrapperClass - Обертка пикера
   */
  classNames?: {
    wrapperClass?: string;
    transitionClass?: string;
  };
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
