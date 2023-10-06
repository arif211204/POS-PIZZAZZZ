/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Switch,
  IconButton,
  ButtonGroup,
  Avatar,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetAllUser,
  asyncDeleteUser,
  asyncEditUser,
} from '../../../states/users/action';
import RegisterAdminModal from './NewAdmin';

function TableAdmin() {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const data = useSelector((state) => state.users);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();
  console.log(editedUserData, 'editUserData');
  useEffect(() => {
    dispatch(asyncGetAllUser());
  }, [dispatch]);

  const filterDataByRole = () => {
    if (selectedRole === '') {
      setFilteredData(data);
    } else {
      const filteredUsers = data.filter(
        (user) => user.isAdmin === (selectedRole === 'admin')
      );
      setFilteredData(filteredUsers);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    filterDataByRole();
  }, [selectedRole, data]);

  const handleEditUser = (userId) => {
    const userToEdit = filteredData.find((user) => user.id === userId);
    setEditedUserData(userToEdit);
    setIsEditModalOpen(true);
    console.log(userToEdit, 'edit');
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview({
        blob: file,
        url: imageURL,
      });
    }
  };

  const handleToggleStatus = async (userId, isActive) => {
    try {
      const updatedUserData = {
        isActive: !isActive,
      };
      await dispatch(asyncEditUser(userId, updatedUserData));
      dispatch(asyncGetAllUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(asyncDeleteUser(userId));
      dispatch(asyncGetAllUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (selectedUserId) => {
    try {
      const formdata = new FormData();
      formdata.append('username', editedUserData.username);
      formdata.append('fullname', editedUserData.fullname);
      formdata.append('password', editedUserData.password);
      formdata.append('email', editedUserData.email);
      if (imagePreview) formdata.append('image', imagePreview.blob);
      await dispatch(asyncEditUser(selectedUserId, formdata));
      setIsEditModalOpen(false);
      dispatch(asyncGetAllUser());
      toast({
        title: 'User Edited',
        description: 'User information has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          // eslint-disable-next-line no-use-before-define
          onClick={() => paginate(i)}
          colorScheme={currentPage === i ? 'teal' : 'gray'}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box p="6">
      <Flex justify="space-between" alignItems="center" mb="2">
        <Text fontSize="2xl" fontWeight="bold">
          Admin
        </Text>
        <Button
          bg="red.500"
          color="white"
          onClick={() => setIsRegisterModalOpen(true)}
        >
          + Admin
        </Button>
      </Flex>

      <Flex mb="4">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            mr="2"
            variant="outline"
          >
            Filter by Role
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSelectedRole('')}>All Roles</MenuItem>
            <MenuItem onClick={() => setSelectedRole('admin')}>Admin</MenuItem>
            <MenuItem onClick={() => setSelectedRole('cashier')}>
              Cashier
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData?.map((user, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={index}>
              <Td>
                <Flex align="center">
                  <Avatar
                    size="sm"
                    src={`${import.meta.env.VITE_API_URL}/users/image/${
                      user?.id
                    }`}
                    mb="1"
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                  />
                  <Text p={2}>{user.fullname}</Text>
                </Flex>
              </Td>
              <Td>{user.isAdmin ? 'Admin' : 'Cashier'}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Switch
                  colorScheme="teal"
                  isChecked={user.isActive}
                  onChange={() => handleToggleStatus(user.id, user.isActive)}
                />
              </Td>
              <Td>
                <ButtonGroup size="sm" spacing={2}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => handleEditUser(user.id)}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <RegisterAdminModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      <Flex justify="center" mt="4">
        {totalPages > 1 && (
          <ButtonGroup spacing={2}>{renderPaginationButtons()}</ButtonGroup>
        )}
      </Flex>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" alignItems="center">
              <label htmlFor="file-input">
                <Avatar
                  size="xl"
                  src={
                    imagePreview?.url ||
                    `${import.meta.env.VITE_API_URL}/users/image/${
                      editedUserData?.id
                    }`
                  }
                  mb="4"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <FormControl>
                <FormLabel>Fullname</FormLabel>
                <Input
                  type="text"
                  name="fullname"
                  value={editedUserData.fullname || ''}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      fullname: e.target.value,
                    })
                  }
                />
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={editedUserData.username || ''}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      username: e.target.value,
                    })
                  }
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  value={editedUserData.email || ''}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      email: e.target.value,
                    })
                  }
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={editedUserData.password || ''}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={() => handleSubmit(editedUserData.id)}
            >
              Simpan
            </Button>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TableAdmin;
