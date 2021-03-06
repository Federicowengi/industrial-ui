/*
 * Copyright 2020 Actyx AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { theme } from '../../theme';
import * as classNames from 'classnames';
import * as React from 'react';
import injectSheet, { StyleSheet, WithStyles } from 'react-jss';
import { compose, setDisplayName } from 'recompose';
import { Typography } from '../Typography';
import { MUIcon } from '../MUIcon';
import { Toolbar } from '../Toolbar';
import { TouchRipple } from '../TouchRipple';

export type SimpleToolbarIcon = Readonly<{
  icon: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}>;

export type SimpleToolbarRightComponent = Readonly<{
  component: React.ReactNode;
  onClick?: () => void;
}>;

type CompProps = Readonly<{
  variant: 'light' | 'dark';
  title: React.ReactNode;
  leftIcon?: SimpleToolbarIcon;
  rightIcon?: SimpleToolbarIcon;
  centerComponent?: React.ReactNode;
  rightComponent?: SimpleToolbarRightComponent;
}>;

type Props = WithStyles<ClassKey> & CompProps;

const COLOR_WHITE = theme.palette.common.white;
const COLOR_DARK = theme.palette.primary.dark;

const renderIcon = (
  btn: SimpleToolbarIcon,
  classes: Record<ClassKey, string>,
  variant: 'light' | 'dark'
) => (
  <button
    type={btn.type || 'button'}
    className={classNames(classes.button, classes.icon)}
    onClick={btn.onClick}
  >
    <TouchRipple className={classes.icon}>
      <MUIcon
        type={btn.icon}
        fontSize={48}
        color={variant === 'light' ? COLOR_DARK : COLOR_WHITE}
      />
    </TouchRipple>
  </button>
);

const renderRight = (
  rightComponent: SimpleToolbarRightComponent,
  classes: Record<ClassKey, string>
) => (
  <button
    type="submit"
    className={classNames(classes.button, classes.rightComponent)}
    onClick={rightComponent.onClick}
  >
    {rightComponent.component}
  </button>
);

const SimpleToolbarComp = ({
  classes,
  variant,
  title,
  leftIcon,
  rightIcon,
  centerComponent,
  rightComponent
}: Props) => (
  <Toolbar variant={variant}>
    <>
      {leftIcon && renderIcon(leftIcon, classes, variant)}
      <div className={classes.title}>
        <Typography variant="distance" color={variant === 'light' ? COLOR_DARK : COLOR_WHITE}>
          {title}
        </Typography>
      </div>
      {centerComponent && centerComponent}
      {rightIcon && renderIcon(rightIcon, classes, variant)}
      {rightComponent && renderRight(rightComponent, classes)}
    </>
  </Toolbar>
);

type ClassKey =
  | 'root'
  | 'title'
  | 'button'
  | 'lightBackground'
  | 'lightForeground'
  | 'darkBackground'
  | 'darkForeground'
  | 'icon'
  | 'rightComponent';

const styles: StyleSheet<ClassKey> = {
  root: {
    display: 'flex'
  },
  lightBackground: {
    backgroundColor: COLOR_WHITE
  },
  lightForeground: {
    color: COLOR_WHITE
  },
  darkBackground: {
    backgroundColor: COLOR_DARK
  },
  darkForeground: {
    color: COLOR_DARK
  },
  icon: {
    width: 80,
    height: 80
  },
  rightComponent: {
    height: 80
  },
  button: {
    outline: 'none',
    background: 'none',
    border: 'none',
    margin: 0,
    padding: 0,
    '&:focus': {
      outline: 'none'
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    marginRight: 'auto',
    marginLeft: 20
  }
};

export const SimpleToolbar = compose<Props, CompProps>(
  setDisplayName('SimpleToolbar'),
  injectSheet(styles)
)(SimpleToolbarComp);
