import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import BaseInput from '../BaseInput';
import { CaretUp, CaretDown } from '../icons';
import { omit } from '../../utils/helpers';
import useFlexibleRef from '../../hooks/useFlexibleRef';

/**
 * Input Number just only support UNCONTROLLED COMPONENT
 * 
 * */
const InputNumber = React.forwardRef(({
  className,
  disabled,
  onChange,
  ...otherProps
}, ref) => {
  const wrapperRef = useFlexibleRef(ref);
  const stepUpRef = useRef();
  const stepDownRef = useRef();

  const passedProps = useMemo(() => omit(otherProps, ['value']), [otherProps]);

  useEffect(() => {
    const stepUp = () => {
      wrapperRef.current.stepUp();
      onChange({ target: wrapperRef.current });
    };
    const stepDown = () => {
      wrapperRef.current.stepDown();
      onChange({ target: wrapperRef.current });
    };

    stepUpRef.current.addEventListener('click', stepUp);
    stepDownRef.current.addEventListener('click', stepDown);

    return () => {
      stepUpRef.current.removeEventListener('click', stepUp);
      stepDownRef.current.removeEventListener('click', stepDown);
    };
  }, []);

  return (
    <div className={cn('fui-input-number', className)}>
      <BaseInput
        {...passedProps}
        ref={wrapperRef}
        disabled={disabled}
        onChange={onChange}
        htmlType="number"
        className="fui-input-number-input"
      />
      <div className="fui-input-number-handler">
        <button className="fui-select-up" disabled={disabled} ref={stepUpRef}>
          <CaretUp />
        </button>
        <button className="fui-select-down" disabled={disabled} ref={stepDownRef}>
          <CaretDown />
        </button>
      </div>
    </div>
  );
});

InputNumber.displayName = 'InputNumber';
InputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
InputNumber.defaultProps = {
  onChange: f => f,
};

export default InputNumber;
