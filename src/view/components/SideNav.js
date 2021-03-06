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
import { useSelector, useDispatch } from 'react-redux';
import PostMetadata from '../pages/PostMetadata';

const {AppShell, LayoutPortal} = Layout;
const { Status, AppLogo } = Atoms;

const SideNav = ({location}) => {

  const sectionStatus = useSelector(state => state.sectionStatus)
  const dispatch = useDispatch();

  // console.log('===')
  // console.log(sectionStatus);
  
  const onMenuItemClick = (e) => {
    e.stopPropagation();
  }

  const onUserOptionClick = (e) => {
    dispatch(logoutUser());
    e.stopPropagation();
  }

  const mainContent = (route) => {
    console.log('route : ', route)

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
    } else if (route.includes('/posts') && route.includes('/metadata')){
      return <PostMetadata/>
    } else {
      return <PostsTableItem />;
    }
  }

  return (
    <AppShell>
      <LayoutPortal
        primaryNavigationContent={
          <Box pad={'small'}>
            <Box margin={{bottom: 'medium'}}>
              <AppLogo name={'Archive'} />
            </Box>

          
            <Box pad={'medium'} >
              <div className='links' onClick={e => onMenuItemClick(e)}>
                <MenuItem
                  route={'/posts'}
                  icon={'post'}
                  label={'Posts'}
                  className={classnames({
                    active:
                      location.pathname.includes('/posts') ||
                      location.pathname.includes('/post')
                  })}
                />
                <MenuItem
                  route={'/search'}
                  icon={'search'}
                  label={'Search'}
                  className={classnames({
                    active: location.pathname.includes('/search')
                  })}
                />

                <AccessControl
                  allowedPermissions={['user:canView']}
                  text={() => this.dothis()}
                  renderNoAccess={() => {}}
                >
                  <MenuItem
                    route={'/queue'}
                    icon={'queue'}
                    label={'Queues'}
                    className={classnames({
                      active: location.pathname.includes('/queue')
                    })}
                  />
                </AccessControl>

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
                      active: location.pathname.includes('/users')
                    })}
                  />
                </AccessControl>
              </div>

              <Box margin={{top: 'large'}}>
                <Button
                  plain
                  onClick={onUserOptionClick}
                >
                  <LogOut />
                </Button>
              </Box>
                      
            </Box>
          </Box>
        }
        mainSectionContent={
          mainContent(location.pathname)
        }
      >
      </LayoutPortal>

      <Status
        type={sectionStatus.status}
        message={sectionStatus.message}
      />
    </AppShell>
  );
  
}

SideNav.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};


export default SideNav;