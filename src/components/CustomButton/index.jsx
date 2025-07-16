import { Button } from "@shopify/polaris";

const CustomButton = ({
  children,
  primary = false,
  submit = false,
  fullWidth = false,
  loading = false,
  size = "medium",
  variant = "primary",
  icon,
  iconOnly = false,
  disabled = false,
  onClick,
  accessibilityLabel,
  ...restProps
}) => {
  const buttonContent = iconOnly ? (
    <span className="visually-hidden">{accessibilityLabel || children}</span>
  ) : (
    children
  );

  const resolvedVariant = primary ? "primary" : variant;

  return (
    <Button
      submit={submit}
      primary={primary}
      fullWidth={fullWidth}
      loading={loading}
      size={size}
      variant={resolvedVariant}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      accessibilityLabel={
        iconOnly ? accessibilityLabel || children : accessibilityLabel
      }
      {...restProps}
    >
      {buttonContent}
    </Button>
  );
};

export default CustomButton;
