
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Fragment, useState } from 'react';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function MyDrawer({drawOpen, setDrawOpen,toggleDrawer, menuDirection}) {
  const classes = useStyles();




  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key='Hi'>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Sup' />
          </ListItem>

      </List>
    </div>
  );

  return (
    <div>
      {[menuDirection].map((anchor) => (
        <Fragment key={anchor}>
          <Drawer anchor={anchor} open={drawOpen[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
