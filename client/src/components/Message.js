import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div class='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}
      <button
        type='button'
        class='btn-close'
        data-bs-dismiss='alert'
        aria-label='Close'
      ></button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
