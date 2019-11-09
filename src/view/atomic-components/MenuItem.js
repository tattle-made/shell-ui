import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Database, Search, Terminal, User} from 'react-feather';

import styled from 'styled-components'
import {Box, Heading, Text} from 'grommet'

const icons = {
  'post': <Database/>,
  'search': <Search/>,
  'queue': <Terminal/>,
  'user': <User/>
}

const MenuItem = props => {
  return (
    <Link to={props.route}>
      <Box direction={'row'} gap={'small'} align={'center'}>
        {icons[props.icon]}
        <Heading level={2}> {props.label} </Heading>
      </Box>
    </Link>
  );
};

MenuItem.propTypes = {
  route: PropTypes.string.isRequired
};

export default MenuItem;
