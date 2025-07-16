import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Card,
  Button,
  Layout,
  Text,
  Box,
  Banner,
  InlineStack,
  BlockStack,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";

import { useAuth } from "../../context/AuthContext";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const Dashboard = () => {
  const { user, logout, fetUsers } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [errorText, setErrorText] = useState({});
  const [reload, setReload] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const userList =
    localStorage.getItem("users") !== null
      ? JSON.parse(localStorage.getItem("users"))
      : [];

  const columns = [
    { label: "Name", field: "name", bold: true },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    {
      label: "Action",
      field: "company",
      render: (elm) => (
        <InlineStack gap={"100"}>
          <Button
            icon={EditIcon}
            tone="success"
            onClick={() => handleOpenEditModal(elm)}
          />
          <Button
            icon={DeleteIcon}
            tone="critical"
            onClick={() => handleOpenDelteModal(elm)}
          />
        </InlineStack>
      ),
    },
  ];

  const handleOpenEditModal = (elm) => {
    setId(elm?.id);
    setUserData({
      name: elm?.name,
      email: elm?.email,
      phone: elm?.phone,
    });
    setOpen(true);
  };

  const handleOpenDelteModal = (elm) => {
    setOpenDeleteModal(true);
    setId(elm?.id);
  };

  const handleConfirmDelete = () => {
    const findIndex = data?.findIndex((item) => +item?.id === +id);
    if (findIndex !== -1) {
      data.splice(findIndex, 1);
      localStorage.setItem("users", JSON.stringify(data));
      console.log("data -", data);
      setReload(!reload);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteModal(false);
    setId("");
    setErrorText({});
    setUserData({ name: "", email: "", phone: "" });
  };

  const handleChange = (value, fieldName) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleValidation = () => {
    let isError = false;
    let errors = {};

    if (!name) {
      isError = true;
      errors.name = "Name is rquired";
    }
    if (!email) {
      isError = true;
      errors.email = "Email is rquired";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isError = true;
      errors.email = "Please enter a valid email";
    }
    if (!phone) {
      isError = true;
      errors.phone = "Phone is rquired";
    } else if (!/^[0-9]{10,15}$/.test(phone)) {
      isError = true;
      errors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    setErrorText(errors);
    return isError;
  };

const handleSubmit = () => {
  const { name, email, phone } = userData; // Destructure from userData here
  const validate = handleValidation();
  if (!validate) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (id) {
      // Update existing user
      const updatedUsers = users.map((item) => 
        item.id === id ? { ...item, name, email, phone } : item
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
    }

    handleClose();
    setReload(!reload);
  }
};


  // const handleSubmit = () => {
  //   const validate = handleValidation();
  //   if (!validate) {
  //     const users = JSON.parse(localStorage.getItem("users")) || [];

  //     if (id) {
  //       // Update existing user
  //       const userIndex = users.findIndex((item) => item.id === id);
  //       if (userIndex !== -1) {
  //         const updatedUsers = [...users];
  //         updatedUsers[userIndex] = {
  //           ...updatedUsers[userIndex],
  //           name,
  //           email,
  //           phone,
  //         };
  //         localStorage.setItem("users", JSON.stringify(updatedUsers));
  //       }
  //     } else {
  //       const newUser = {
  //         id: Date.now(),
  //         name,
  //         email,
  //         phone,
  //       };
  //       localStorage.setItem("users", JSON.stringify([...users, newUser]));
  //     }

  //     handleClose();
  //     setReload(!reload);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (userList?.length) {
        setData(userList);
      } else {
        try {
          const response = await fetUsers();
          setData(response);
        } catch (err) {
          setError("User fetch failed. Please try again.");
        }
      }
    };

    fetchData();
  }, [reload]);

  const { name, email, phone } = userData;

  return (
    <Page
      title={`Welcome, ${user?.name || "User"}`}
      primaryAction={{
        content: "Logout",
        onAction: handleLogout,
        destructive: true,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="400">
              <InlineStack align="space-between" block>
                <Text variant="headingMd" as="h2">
                  Users
                </Text>
                <CustomButton icon={PlusIcon} onClick={() => setOpen(true)}>
                  Add User{" "}
                </CustomButton>
              </InlineStack>

              <Box paddingBlockStart="400">
                {error && (
                  <Banner
                    title={error}
                    status="critical"
                    onDismiss={() => setError("")}
                  />
                )}
              </Box>
              <Box paddingBlockStart="400">
                <CustomTable columns={columns} data={data} />
              </Box>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>

      <CustomModal
        open={open}
        onClose={handleClose}
        heading={id ? "Update User" : "Add User"}
        addButtonLabel={id ? "Update" : "Submit"}
        onClick={handleSubmit}
      >
        <BlockStack gap={"400"}>
          <CustomInput
            name="name"
            label="Name"
            value={name}
            onChange={(value) => handleChange(value, "name")}
            autoComplete="off"
            error={!!errorText.name}
            helpText={errorText?.name}
          />
          <CustomInput
            name="email"
            label="Email"
            value={email}
            onChange={(value) => handleChange(value, "email")}
            autoComplete="off"
            error={!!errorText.email}
            helpText={errorText?.email}
          />

          <CustomInput
            label="Phone"
            name="phone"
            value={phone}
            onChange={(value) => handleChange(value, "phone")}
            autoComplete="off"
            error={!!errorText.phone}
            helpText={errorText?.phone}
          />
        </BlockStack>
      </CustomModal>

      <CustomModal
        open={openDeleteModal}
        onClose={handleClose}
        heading={"Confirm Dalete"}
        addButtonLabel={"Delete"}
        onClick={handleConfirmDelete}
      >
        <Text variant="headingMd" as="h6">
          Are you sure, you want to delete this record?
        </Text>
      </CustomModal>
    </Page>
  );
};

export default Dashboard;
