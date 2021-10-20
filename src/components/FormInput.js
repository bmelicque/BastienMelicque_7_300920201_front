import React, { useState } from 'react';
import { isEmail } from 'validator';
import zxcvbn from 'zxcvbn';

const DEFAULT_INPUT_TYPE = "text"

const FormInput = props => {
    const { name, setParentValue } = props;
    const type = props.type || DEFAULT_INPUT_TYPE;

    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(null);

    const checkValidity = userInput => {
        switch (type) {
            case 'email':
                return isEmail(userInput);
            case 'password':
                return (zxcvbn(userInput).score > 2);
            default:
                return true;
        }
    }

    return (
        <>
            <label htmlFor={name}>
                {props.children}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                className={`form__input ${isValid === false && "form__input--invalid"}`}
                onChange={e => {
                    setValue(e.target.value);
                    if (setParentValue)
                        setParentValue(e.target.value);
                    setIsValid(checkValidity(e.target.value));
                }}
                isvalid={isValid ? "true" : "false"}
                value={value}
            />
        </>
    );
};

export default FormInput;