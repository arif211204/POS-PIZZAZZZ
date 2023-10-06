import {
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function ProductItem({ product, setIsModalOpen, setSelectedProduct }) {
  return (
    <Card
      maxW="320px"
      borderWidth="1px"
      borderRadius="lg"
      m="2"
      cursor="pointer"
      onClick={() => {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }}
    >
      <CardBody p="2">
        <Image
          width="300px"
          height="150px"
          objectFit="cover"
          src={`${import.meta.env.VITE_API_URL}/products/image/${product.id}`}
          alt={product.name || ''}
          borderRadius="lg"
        />
        <Stack mt="4" spacing="2">
          <Heading size="sm">{product.name}</Heading>
          <Text fontSize="sm">{product.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
}

export default ProductItem;
