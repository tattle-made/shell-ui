import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faUsers,
  faSearch,
  faTimes,
  faSignOutAlt,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import tattle_monogram_dark from '../../assets/img/tattle_monogram_dark.png';
import PropTypes from 'prop-types';

//components
import SearchInput from '../pages/Search';
import PostsTable from '../pages/Posts';
import UsersTable from '../pages/Users';
import UserCreate from '../pages/UserCreate';
import UserUpdate from '../pages/UserUpdate';
import PostsTableItem from './PostData';
import MenuItem from '../atomic-components/MenuItem';

import { Grommet, Box, Button, Image, Heading} from 'grommet'
import { Layout, Atoms} from '@tattle-made/ui';

//action
import { logoutUser } from '../../redux/actions/auth';

// access control
import AccessControl from './AccessControl';
import Queue from '../pages/Queue';
import { LogOut } from 'react-feather';

const {AppShell, LayoutPortal} = Layout;
const {Status} = Atoms;

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onUserOptionClick = this.onUserOptionClick.bind(this);
  }

  toggle(e) {
    this.setState({
      open: !this.state.open
    });
  }

  onMenuItemClick(e) {
    e.stopPropagation();
  }

  onUserOptionClick(e) {
    this.props.logoutUser();
    e.stopPropagation();
  }

  mainContent(route) {
    if (route === '/posts' || route.includes('/posts/')) {
      return <PostsTable />;
    } else if (route === '/search') {
      return <SearchInput />;
    } else if (route === '/users/create') {
      return <UserCreate />;
    } else if (route.includes('/users/update')) {
      return <UserUpdate />;
    } else if (
      route === '/users' ||
      route === '/users/page' ||
      route.includes('/users/page/')
    ) {
      return <UsersTable />;
    } else if (route === '/queue') {
      return <Queue/>
    } else {
      return <PostsTableItem />;
    }
  }

  render() {
    return (
      <AppShell full>
        <LayoutPortal
          primaryNavigationContent={
            <Box pad={'small'} gap={'small'}>
              <Heading level={3}> Tattle </Heading>

              <div className='links' onClick={e => this.onMenuItemClick(e)}>
                <MenuItem
                  route={'/posts'}
                  icon={'post'}
                  label={'Posts'}
                  className={classnames({
                    active:
                      this.props.location.pathname.includes('/posts') ||
                      this.props.location.pathname.includes('/post')
                  })}
                />
                <MenuItem
                  route={'/search'}
                  icon={'search'}
                  label={'Search'}
                  className={classnames({
                    active: this.props.location.pathname.includes('/search')
                  })}
                />
                <MenuItem
                  route={'/queue'}
                  icon={'queue'}
                  label={'Queues'}
                  className={classnames({
                    active: this.props.location.pathname.includes('/queue')
                  })}
                />
                <AccessControl
                  allowedPermissions={['user:canView']}
                  text={() => this.dothis()}
                  renderNoAccess={() => {}}
                >
                  <MenuItem
                    route={'/users'}
                    icon={'user'}
                    label={'Users'}
                    className={classnames({
                      active: this.props.location.pathname.includes('/users')
                    })}
                  />
                </AccessControl>
              </div>

              <Button
                plain
                onClick={e => this.onUserOptionClick(e)}
              >
                <LogOut />
              </Button>

            </Box>
          }
          mainSectionContent={
            this.mainContent(this.props.location.pathname)
          }
        >
        </LayoutPortal>

        <Status
          type={'ok'}
          visibility={true}
          message={'Error fetching resources'}
        />
      </AppShell>
    );
  }
}

SideNav.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const SideNavBar = withRouter(
  connect(
    null,
    { logoutUser }
  )(SideNav)
);

export default SideNavBar;