/* eslint-disable no-underscore-dangle */

import React, { useCallback } from 'react';
import useConstant from './useConstant';

export default function useForm(initialValues) {
  const defaults = useConstant(() => initialValues);
  const [state, setState] = React.useState(defaults);

  function _resetForm() {
    setState(initialValues);
  }

  function _handleChange(e) {
    const { value, name, type, files, checked } = e.target;
    let valueToUse = value;
    if (type === 'file') {
      valueToUse = { value, files };
    } else if (type === 'number') {
      valueToUse = parseFloat(value);
    } else if (type === 'checkbox') {
      valueToUse = checked;
    }
    setState(s => ({ ...s, [name]: valueToUse }));
  }
  const onHandleChange = useCallback(_handleChange, []);
  const resetForm = useCallback(_resetForm, [initialValues]);

  return [state, onHandleChange, { initialValues: defaults, resetForm }];
}
