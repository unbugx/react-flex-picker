import * as React from 'react';
import * as cn from 'classnames';
import * as styles from './style/day.module.styl';

export class Day extends React.PureComponent<IDayProps> {
  static defaultProps = {
    className: styles.day,
  };

  renderDay() {
    const {text} = this.props;

    if (!text) {
      return <span>&nbsp;</span>;
    }

    return text;
  }

  render() {
    const {
      isDisabled,
      isDayOff,
      isSelected,
      isFirstSelected,
      isLastSelected,
      isClickable,
      isHovered,
      onClick,
      onHover,
      className,
    } = this.props;

    return (
      <span
        className={cn(
          className,
          isDisabled && styles.dayDisabled,
          isDayOff && styles.dayOff,
          isSelected && styles.daySelected,
          isFirstSelected && styles.dayFirstSelected,
          isLastSelected && styles.dayLastSelected,
          isClickable && styles.dayClickable,
          isHovered && styles.dayHovered,
        )}
        onClick={onClick}
        onMouseOver={onHover}
      >
        {this.renderDay()}
      </span>
    );
  }
}

interface IDayProps {
  text?: number | string;
  isDisabled?: boolean;
  isDayOff?: boolean;
  isSelected?: boolean;
  isFirstSelected?: boolean;
  isLastSelected?: boolean;
  isClickable?: boolean;
  isHovered?: boolean;
  onClick?: (e) => void;
  onHover?: (e) => void;
  className?: string;
}
