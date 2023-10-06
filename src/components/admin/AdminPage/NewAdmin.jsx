import React, { useState } from 'react';
import {
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
  Checkbox,
  Avatar,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../../../states/authUser/action';

function RegisterAdminModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [newAdminData, setNewAdminData] = useState({
    fullname: '',
    username: '',
    email: '',
    image: null,
    password: '',
    isAdmin: false,
    isCashier: false,
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewAdminData({ ...newAdminData, image: file });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleRegisterAdmin = async () => {
    try {
      const formdata = new FormData();
      formdata.append('username', newAdminData.username);
      formdata.append('fullname', newAdminData.fullname);
      formdata.append('password', newAdminData.password);
      formdata.append('email', newAdminData.email);
      formdata.append('image', newAdminData.image);
      formdata.append('isAdmin', newAdminData.isAdmin);
      formdata.append('isCashier', newAdminData.isCashier);
      formdata.append('isActive', newAdminData.isActive);

      await dispatch(asyncRegisterUser(formdata));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Daftar Admin Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex flexDirection="column" alignItems="center">
              <label htmlFor="file-input">
                <Avatar
                  size="xl"
                  src={imagePreview || newAdminData.image}
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
            </Flex>

            <FormLabel>Fullname</FormLabel>
            <Input
              type="text"
              name="fullname"
              value={newAdminData.fullname}
              onChange={(e) =>
                setNewAdminData({ ...newAdminData, fullname: e.target.value })
              }
            />
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={newAdminData.username}
              onChange={(e) =>
                setNewAdminData({ ...newAdminData, username: e.target.value })
              }
            />
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              value={newAdminData.email}
              onChange={(e) =>
                setNewAdminData({ ...newAdminData, email: e.target.value })
              }
            />

            <FormLabel>Kata Sandi</FormLabel>
            <Input
              type="password"
              name="password"
              value={newAdminData.password}
              onChange={(e) =>
                setNewAdminData({ ...newAdminData, password: e.target.value })
              }
            />
            <FormLabel>Role</FormLabel>
            <Stack spacing={2}>
              <Flex align="center">
                <Checkbox
                  isChecked={newAdminData.isAdmin}
                  onChange={() =>
                    setNewAdminData({
                      ...newAdminData,
                      isAdmin: !newAdminData.isAdmin,
                    })
                  }
                />
                <FormLabel ml={2}>Admin</FormLabel>
              </Flex>
              <Flex align="center">
                <Checkbox
                  isChecked={newAdminData.isCashier}
                  onChange={() =>
                    setNewAdminData({
                      ...newAdminData,
                      isCashier: !newAdminData.isCashier,
                    })
                  }
                />
                <FormLabel ml={2}>Cashier</FormLabel>
              </Flex>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleRegisterAdmin}>
            Daftar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegisterAdminModal;
