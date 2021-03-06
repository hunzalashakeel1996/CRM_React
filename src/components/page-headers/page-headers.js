import React from 'react';
import PropTypes from 'prop-types';
import { PageHeaderStyle } from './style';

const PageHeader = props => {
  const { title, subTitle, Switch, buttons, ghost, bgColor } = props;
  return (
    <>
      <div
        style={{
          backgroundColor: bgColor || '#F4F5F7',
        }}
      >
        <PageHeaderStyle
          style={{
            backgroundColor: 'rgb(244, 245, 247)',
          }}
          // onBack={() => window.history.back()}
          title={title}
          subTitle={subTitle}
          breadcrumb={Switch && { Switch }}
          extra={buttons}
          ghost={ghost}
        />
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  bgColor: PropTypes.string,
  Switch: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  buttons: PropTypes.array,
  ghost: PropTypes.bool,
};

export { PageHeader };
