//BackButton.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowForward';
import classnames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme =>
    createStyles({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    });

const sanitizeRestProps = ({
    basePath,
    className,
    classes,
    label,
    invalid,
    variant,
    translate,
    handleSubmit,
    handleSubmitWithRedirect,
    submitOnEnter,
    record,
    redirect,
    resource,
    locale,
    ...rest
}) => rest;

class BackButton extends Component {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  static propTypes = {
          label: PropTypes.string,
          refreshView: PropTypes.func.isRequired,
          icon: PropTypes.element,
      };

  static defaultProps = {
      label: 'ra.action.back',
      icon: <ArrowBack />,
  };

  render() {
    const {
                className,
                classes = {},
                invalid,
                label = 'ra.action.back',
                pristine,
                redirect,
                saving,
                submitOnEnter,
                translate,
                icon,
                onClick,
                ...rest
            } = this.props;
    return (
      <Button
            onClick={this.context.router.history.goBack}
            label={label}
            className={classnames(
                'ra-back-button',
                classes.backButton,
                className
            )}
            key="button"
            {...sanitizeRestProps(rest)}>
          {icon} {label && translate(label, { _: label })}
      </Button>
    )
  }
}

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(BackButton);