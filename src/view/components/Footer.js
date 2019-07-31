import React, { Component } from 'react';
import Footer from '../atomic-components/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IsEmpty from 'is-empty';

//action
import { error } from '../../redux/actions/utils';
import { String } from 'es6-shim';

class FooterSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      visible: false
    };
    this.onFooterClose = this.onFooterClose.bind(this);
  }

  onFooterClose() {
    this.setState({
      message: ''
    });
    this.props.error(this.props.error);
  }

  componentWillReceiveProps(nextProps) {
    let msg = '';

    if (nextProps.message !== this.props.message) {
      let msg = '';
      if (typeof nextProps.message === 'string') {
        msg = nextProps.message;
      } else if (typeof nextProps.message === 'object') {
        msg = JSON.stringify(nextProps.message);
      }
      this.setState({
        message: msg,
        visible: true
      });
    }
  }

  render() {
    const { message } = this.state;
    if (!IsEmpty(message)) {
      return (
        <Footer
          alert_type=''
          message={message}
          visible={this.state.visible}
          closeFooter={this.onFooterClose}
        />
      );
    } else {
      return null;
    }
  }
}

FooterSite.prototypes = {
  message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  message: state.error
});

const FooterBottom = connect(
  mapStateToProps,
  { error }
)(FooterSite);

export default FooterBottom;
