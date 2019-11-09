import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {Box, Heading, Text} from 'grommet'

const MenuItem = props => {
  return (
    <Link to={props.route}>
      <Box direction={'row'} gap={'small'}>
        {/* <FontAwesomeIcon icon={props.icon} color='#000637' /> */}
        <Heading level={2}> {props.label} </Heading>
      </Box>
    </Link>
  );
};

MenuItem.propTypes = {
  route: PropTypes.string.isRequired
};

export default MenuItem;
