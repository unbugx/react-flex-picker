import * as React from 'react';
import * as styles from './style/wrapper.module.styl';
import {PickerConsumer} from '../PickerProvider';

export function Wrapper(props: IWrapperProps) {
  return (
    <PickerConsumer>
      {({unitWrapper, unitWidth, translateX, currentMonth, isAnimating, height, pickerProps, handleHover}) => (
        <div
          ref={unitWrapper}
          className={pickerProps.classNames.wrapperClass || styles.wrapper}
          style={{width: unitWidth * pickerProps.unitCount || 'auto'}}
          onMouseLeave={() => handleHover(null)}
        >
          <div
            className={isAnimating ? (pickerProps.classNames.transitionClass || styles.transition) : null}
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
}
