import React from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function Sidebar({
  variants,
  voucherCode,
  handleVoucherCodeChange,
  handleCharge,
  handleRemoveVariant,
}) {
  return (
    <Box
      border="1px solid black"
      padding="16px"
      position="fixed"
      top="0"
      right="0"
      height="660px"
      width="300px"
      backgroundColor="white"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      zIndex="999"
    >
      <Heading marginBottom="16px">Order Details</Heading>
      <UnorderedList padding="0" listStyleType="none">
        {variants.map((variant, index) => (
          <React.Fragment key={variant.variantId}>
            <ListItem
              marginBottom="8px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                Variant ID: {variant.variantId}
                <br />
                Quantity: {variant.quantity}
              </div>
              <DeleteIcon
                onClick={() => handleRemoveVariant(variant.variantId)}
                color="red.500"
                cursor="pointer"
              />
            </ListItem>
            {index < variants.length - 1 && (
              <div
                style={{
                  borderBottom: '1px dashed black',
                  marginBottom: '16px',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </UnorderedList>

      <Box display="block">
        <label htmlFor="voucher-code">Voucher Code</label>
        <Input
          id="voucher-code"
          type="text"
          value={voucherCode}
          onChange={handleVoucherCodeChange}
          backgroundColor="grey"
          width="calc(100% - 1px)"
          padding="10px"
          border="1px solid #ccc"
          borderRadius="4px"
        />
      </Box>

      <Box marginTop="16px">
        <Button
          onClick={handleCharge}
          width="100%"
          padding="12px"
          backgroundColor="#4CAF50"
          color="white"
          border="none"
          borderRadius="4px"
          cursor="pointer"
        >
          Charge
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
