import { theme } from '../../theme';
import * as classNames from 'classnames';
import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import { compose, setDisplayName } from 'recompose';

type CompProps = Readonly<{
  active?: boolean;
  onClick: () => void;
}>;

type Props = WithStyles<ClassKey> & CompProps;

const PaginationDotComp = ({ classes, active, onClick }: Props) => (
  <button className={classes.root} onClick={onClick}>
    <div
      className={classNames({
        [classes.active]: active,
        [classes.dot]: true
      })}
    />
  </button>
);

type ClassKey = 'root' | 'dot' | 'active';

const styles: StyleSheet<ClassKey> = {
  root: {
    height: 18,
    width: 18,
    cursor: 'pointer',
    border: 0,
    background: 'none',
    padding: 0
  },
  dot: {
    backgroundColor: theme.palette.grey[400],
    height: 12,
    width: 12,
    borderRadius: 6,
    margin: 3
  },
  active: {
    backgroundColor: theme.palette.primary.main
  }
};

export const PaginationDot = compose<Props, CompProps>(
  setDisplayName('PaginationDot'),
  injectSheet(styles)
)(PaginationDotComp);