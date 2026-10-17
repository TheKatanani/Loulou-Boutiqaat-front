import React from 'react';
import { StyledPhoneContainer } from './styled';

const PhoneInputGroup = ({
  label = "رقم الجوال",
  phoneId = "phone",
  selectId = "selectPhone",
  phoneValue = "",
  selectValue = "",
  onPhoneChange,
  onSelectChange,
  options = [],
  placeholder = "59-123-4567",
  required = false
}) => {
  const defaultVal = options?.[0]?.value || '+970';
  return (
    <StyledPhoneContainer>
      {label && <label htmlFor={phoneId} className="labelRow">{label}</label>}
      <div className="phoneBox">
        <select
          id={selectId}
          value={selectValue || defaultVal}
          onChange={onSelectChange}
          className="countrySelect"
        >
          {options?.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id={phoneId}
          type="tel"
          placeholder={placeholder}
          value={phoneValue}
          onChange={onPhoneChange}
          required={required}
          className="numberInput"
          autoComplete="tel"
        />
      </div>
    </StyledPhoneContainer>
  );
};

export default PhoneInputGroup;
