import { useState } from "react";
import { TextField, Box, Icon } from "@shopify/polaris";
import { HideIcon, ViewIcon } from "@shopify/polaris-icons";

const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = false,
  disabled = false,
  error,
  helpText,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const passwordToggle = type === "password" && (
    <Box
      as="button"
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      cursor="pointer"
      paddingRight="2"
      display="flex"
      alignItems="center"
      background="transparent"
      border="none"
    >
      <Icon source={showPassword ? HideIcon : ViewIcon} color="subdued" />
    </Box>
  );

  return (
    <Box width="100%">
      <TextField
        label={label}
        type={inputType}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        error={error}
        helpText={helpText}
        placeholder={placeholder}
        suffix={passwordToggle}
        {...props}
      />
    </Box>
  );
};

export default CustomInput;
