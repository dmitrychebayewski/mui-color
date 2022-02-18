/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { useStyles } from './AdornedColorPicker.style';

import ColorButton from './ColorButton';
import ColorBox from './ColorBox';
import * as ColorTool from '../helpers/colorTool';
import uncontrolled from '../helpers/uncontrolled';
import * as CommonTypes from '../helpers/commonTypes';
import useTranslate from '../helpers/useTranslate';

const generateClassName = createGenerateClassName({
  seed: 'AdornedColorPicker',
});

const getColorText = (color, disablePlainColor) => {
  let text = disablePlainColor ? `color-${color.hex}` : color.name;
  if (text.startsWith('color-')) {
    if (typeof color.raw !== 'string' || !color.raw.startsWith('#')) {
      text = ColorTool.getCssColor(color, 'hex');
    } else {
      text = color.raw;
    }
  } else if (text === 'none') {
    text = color.raw;
  }
  return text;
};

const AdornedColorPicker = ({
  value,
  deferred,
  palette,
  inputFormats,
  openAtStart,
  onChange,
  onOpen,
  doPopup,
  disableAlpha,
  hslGradient,
  disablePlainColor,
  startAdornment,
  ...custom
}) => {
  const classes = useStyles();
  const refPicker = useRef(null);
  const [open, setOpen] = useState(false);
  const [textFieldProps, setTextFieldProps] = useState(custom);
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(value, disableAlpha, t, i18n.language, disablePlainColor);
  const raw = getColorText(color, disablePlainColor);

  useEffect(() => {
    if (openAtStart) {
      setOpen(true);
    }
  }, [openAtStart]);

  const handleClick = () => {
    const b = Boolean(refPicker.current);
    setOpen(b);
    if (onOpen) onOpen(b);
  };

  const handleClose = () => {
    setOpen(false);
    if (onOpen) onOpen(false);
  };

  const handleColorChange = newColor => {
    onChange(newColor);
    if (deferred) {
      handleClose();
    }
  };

  const handleChange = event => {
    onChange(event.target.value);
  };

  let box = (
    <ColorBox
      value={color}
      style={{ position: 'relative' }}
      deferred={deferred}
      palette={palette}
      inputFormats={inputFormats}
      disableAlpha={disableAlpha}
      hslGradient={hslGradient}
      onChange={handleColorChange}
    />
  );
  if (doPopup) {
    box = doPopup(box);
  } else {
    box = (
      <Popover
        id="color-popover"
        open={open}
        anchorEl={refPicker.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {box}
      </Popover>
    );
  }

  const InputPropsKey = startAdornment ? 'startAdornment' : 'endAdornment';
  const position = startAdornment ? 'start' : 'end';

  const colorButton = (
    <InputAdornment position={position}>
      <ColorButton
        data-testid="colorpicker-button"
        className="muicc-colorpicker-button"
        color={color}
        style={{ minWidth: 0, right: '0px', background: 0, padding: 0 }}
        onClick={handleClick}
      />
    </InputAdornment>
  );

  useEffect(() => {
    setTextFieldProps({
      ...textFieldProps,
      InputProps: {
        ...textFieldProps.InputProps,
        [InputPropsKey]: colorButton,
      },
    });
  }, []);

  const textField = (
    <TextField
      color="primary"
      value={raw}
      onChange={handleChange}
      data-testid="colorpicker-input"
      {...textFieldProps}
    />
  );

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div ref={refPicker} className={classes.root}>
        {textField}
        {box}
      </div>
    </StylesProvider>
  );
};

AdornedColorPicker.propTypes = {
  value: CommonTypes.color,
  deferred: PropTypes.bool,
  palette: CommonTypes.palette,
  inputFormats: CommonTypes.inputFormats,
  onChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  openAtStart: PropTypes.bool,
  doPopup: PropTypes.func,
  /**
   Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  hslGradient: PropTypes.bool,
  disablePlainColor: PropTypes.bool,
  startAdornment: PropTypes.bool,
};

AdornedColorPicker.defaultProps = {
  value: 'none',
  deferred: false,
  palette: undefined,
  inputFormats: ['hex', 'rgb'],
  onOpen: undefined,
  openAtStart: false,
  doPopup: undefined,
  disableAlpha: false,
  hslGradient: false,
  disablePlainColor: false,
  startAdornment: false,
};

export default uncontrolled(AdornedColorPicker);
