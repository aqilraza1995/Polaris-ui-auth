import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Card,
  FormLayout,
  Layout,
  Banner,
  Frame,
  Text,
  Box,
  Divider,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login({ email, password });
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Frame>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box width="100%" maxWidth={"500px"}>
          <Page narrowWidth>
            <Layout>
              <Layout.Section>
                <Box paddingBlockEnd="400">
                  <Card
                    roundedAbove="xs"
                    background="bg-fill-info-secondary"
                    borderColor="border-info"
                  >
                    <BlockStack gap="100">
                      <InlineStack gap={"600"}>
                        <Text variant="headingMd" as="h6" alignment="start">
                          Email :
                        </Text>
                        <Text alignment="start">user@gmail.com</Text>
                      </InlineStack>

                      <InlineStack gap={"600"}>
                        <Text variant="headingMd" as="h6" alignment="start">
                          Password :
                        </Text>
                        <Text alignment="start">User@2025</Text>
                      </InlineStack>
                    </BlockStack>
                  </Card>
                </Box>

                <Card title="Welcome back" roundedAbove="xs">
                  <BlockStack gap="400">
                    <Text variant="headingXl" as="h4" alignment="center">
                      Login
                    </Text>
                    <Box paddingBlockEnd="400">
                      <Divider />
                    </Box>
                  </BlockStack>
                  <form onSubmit={handleSubmit}>
                    <FormLayout>
                      {error && (
                        <Banner
                          title={error}
                          tone="critical"
                          onDismiss={() => setError("")}
                        />
                      )}
                      <CustomInput
                        label={"Email"}
                        value={email}
                        onChange={(value) => setEmail(value)}
                        required
                      />
                      <CustomInput
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(value) => setPassword(value)}
                        autoComplete="current-password"
                        required
                      />
                      <Box paddingBlockStart={"200"}>
                        <CustomButton
                          submit
                          primary
                          fullWidth
                          loading={loading}
                          size="large"
                        >
                          Sign in
                        </CustomButton>
                      </Box>
                    </FormLayout>
                  </form>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </Box>
      </Box>
    </Frame>
  );
};

export default Login;
