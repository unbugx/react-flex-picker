import * as React from 'react';
import * as cn from 'classnames';
import * as defaultStyles from './style/wrapper.module.styl';
import {PickerConsumer} from '../PickerProvider';

export function Wrapper(props: IWrapperProps) {
  const styles = {...defaultStyles, ...props.styles};

  return (
    <PickerConsumer>
      {({unitWrapper, unitWidth, translateX, currentMonth, isAnimating, height, pickerProps, handleHover}) => (
        <div
          ref={unitWrapper}
          className={cn(styles.wrapper)}
          style={{width: unitWidth * pickerProps.unitCount || 'auto'}}
          onMouseLeave={() => handleHover(null)}
        >
          <div
            className={isAnimating ? styles.transition : null}
            style={{
              height,
              width: 'auto',
              transform: `translateX(${unitWidth ? translateX : 0}px)`,
            }}
          >
            {props.children}
          </div>
        </div>
      )}
    </PickerConsumer>
  );
}

interface IWrapperProps {
  children: React.ReactNode;
  styles?: {[key: string]: string};
}
