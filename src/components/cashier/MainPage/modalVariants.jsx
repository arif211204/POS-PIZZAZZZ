/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  // Box,
  ModalHeader,
} from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
// import { asyncTransaction } from '../../../states/transaction/action';
// import { asyncReceiveProducts } from '../../../states/products/action';

function CustomModal({
  isOpen,
  onClose,
  selectedProduct: product,
  variants,
  setVariants,
}) {
  const [selectedVariants, setSelectedVariants] = useState();
  useEffect(() => {
    setSelectedVariants(product?.Variants.map((variant) => ({ ...variant })));
  }, [product, isOpen]);

  const handleAddVariantQuantity = (variantId) => {
    setSelectedVariants(
      selectedVariants?.map((variant) => {
        const newVariant = { ...variant };
        if (newVariant.id === variantId && newVariant.stock - 1 >= 0) {
          newVariant.quantity = newVariant.quantity + 1 || 0;
          return newVariant;
        }
        return newVariant;
      })
    );
  };

  // const arrSelectedVariantsId = selectedVariants.map(({ id, quantity }) => {
  //   if (quantity && quantity > 0) return id;
  //   return null;
  // });
  const handleOnSave = () => {
    // Create an array to store the selected variants with additional information
    // const arrSelectedVariantsId = selectedVariants
    //   .map(({ id, name, price, quantity }) => {
    //     if (quantity && quantity > 0) {
    //       return {
    //         id,
    //         name,
    //         price,
    //         quantity,
    //       };
    //     }
    //     return null;
    //   })
    //   .filter((variant) => variant !== null);

    const arrSelectedVariantsId = selectedVariants.map(({ id, quantity }) => {
      if (quantity && quantity > 0) return id;
      return null;
    });
    const newVariants = variants.filter(
      (variant) => !arrSelectedVariantsId.includes(variant.variantId)
    );
    console.log(newVariants);
    console.log(arrSelectedVariantsId);
    selectedVariants.forEach((variant) => {
      if (arrSelectedVariantsId.includes(variant.id)) {
        newVariants.push({
          variantId: variant.id,
          quantity: variant.quantity,
        });
      }
    });

    setVariants(newVariants);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="40%">
        <ModalHeader>{product?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            width="700px"
            height="300px"
            objectFit="cover"
            src={`${import.meta.env.VITE_API_URL}/products/image/${
              product?.id
            }`}
            alt={product?.name || ''}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="2">
            <Text>{product?.description}</Text>
          </Stack>
          <FormControl mt="4">
            <FormLabel>Variant | Choose Many</FormLabel>
            <Stack direction="row" spacing={3}>
              {selectedVariants &&
                selectedVariants?.map((variant) => (
                  <Button
                    key={variant.id}
                    size="sm"
                    colorScheme={variant.quantity ? 'red' : 'gray'}
                    onClick={() => handleAddVariantQuantity(variant.id)}
                    width="250px"
                  >
                    {variant.name} ({variant.quantity || 0})
                  </Button>
                ))}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            size="sm"
            border="1px solid black"
            // colorScheme="red"
            onClick={onClose}
            color="black"
          >
            Close
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="red"
            color="white"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
