import { Modal, InlineStack, Box, Divider } from "@shopify/polaris";
import CustomButton from "../CustomButton";

const CustomModal = ({
  open,
  onClose,
  heading,
  children,
  addButtonLabel,
  onClick,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={heading} sectioned backdrop>
      {/* Children content */}
      <div style={{ marginBottom: "2rem" }}>{children}</div>

      {/* Footer with actions */}
      <Box paddingBlockEnd={"400"}>
        <Divider />
      </Box>
      <InlineStack align="end" gap="100">
        {addButtonLabel && (
          <CustomButton submit primary onClick={onClick} size="large">
            {addButtonLabel}
          </CustomButton>
        )}
        <CustomButton variant="secondary" onClick={onClose} size="large">
          Close
        </CustomButton>
      </InlineStack>
    </Modal>
  );
};

export default CustomModal;
