/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink as RouterLink, matchPath, useLocation, useNavigate,
} from 'react-router-dom';
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from './Iconify';
import { logout } from '../../app/auth-slice';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const {
    title, path, icon, info, children,
  } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => setOpen((prev) => !prev);

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText onClick={item?.onClick} disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  async function doLogout() {
    dispatch(
      await logout(),
    );

    navigate('/login', { replace: true });
  }

  const match = (path) => {
    if (path) {
      const result = !!matchPath({ path, end: true }, pathname);
      return result;
    }
    return false;
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        <>
          {navConfig(user).map((item) => (
            <NavItem key={item.title} item={item} active={match} />
          ))}
          <NavItem
            item={{
              title: 'logout',
              path: '#',
              onClick: doLogout,
              icon: <Iconify icon="eva:people-fill" width={22} height={22} />,
            }}
            active={match}
          />
        </>
      </List>
    </Box>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};
