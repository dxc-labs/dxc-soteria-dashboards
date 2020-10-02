import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <span>DXC Labs</span>
          {/* <span className="ml-1">&copy; 2020 creativeLabs.</span> */}
        </div>
        
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = {
  children: PropTypes.node,
};

DefaultFooter.defaultProps = {};

export default DefaultFooter;
