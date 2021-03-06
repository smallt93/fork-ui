import React, { useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Link from './Link';
import Affix from '../Affix';

import { pick, omit } from '../../utils/helpers';

const Anchor = ({ className, affix, children, ...otherProps }) => {
  const [activeKey, setActiveKey] = useState(false);

  const affixProps = pick(otherProps, [
    'top',
    'bottom',
  ]);

  const passedProps = useMemo(() => omit(otherProps, ['top', 'bottom']), [otherProps]);

  const _onTriggered = useCallback(key => setActiveKey(key), [setActiveKey]);

  const customChildren = useMemo(() => (
    <ul className={cn('fui-anchor', className)} {...passedProps}>
      {React.Children.map(children, (elm) => {
        return React.cloneElement(elm, {
          _onTriggered: _onTriggered,
          _key: elm.key,
          _top: otherProps.top,
          _affix: affix,
          active: elm.key === activeKey,
        });
      })}
    </ul>
  ), [children, activeKey, _onTriggered]);

  if (!affix) {
    return customChildren;
  }

  return (
    <Affix {...affixProps}>
      {customChildren}
    </Affix>
  );
};

Anchor.Link = Link;

Anchor.displayName = 'Anchor';
Anchor.propTypes = {
  affix: PropTypes.bool,
  top: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
};
Anchor.defaultProps = {
  affix: true,
  top: 0,
};

export default Anchor;
