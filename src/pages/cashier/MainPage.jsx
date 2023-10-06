import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

import { ProductsCard } from '../../components/cashier/MainPage/Products';
import { asyncTransaction } from '../../states/transaction/action';
import { useValueInput } from '../../hooks';
import { asyncReceiveProducts } from '../../states/products/action';
import Sidebar from '../../components/cashier/MainPage/sidebar';

function MainPage() {
  const authUser = useSelector((states) => states.authUser);
  const toast = useToast();
  const dispatch = useDispatch();
  const [voucherCode, handleVoucherCodeChange] = useValueInput('');
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    dispatch(asyncReceiveProducts({ perPage: 1000 }));
  }, [dispatch]);
  const handleRemoveVariant = (variantId) => {
    const deletedVariants = variants.filter(
      (variant) => variant.variantId !== variantId
    );
    setVariants(deletedVariants);
    console.log(deletedVariants);
  };
  const handleCharge = async () => {
    try {
      await dispatch(
        asyncTransaction({
          userId: authUser.id,
          voucherCode: voucherCode || undefined,
          variants,
        })
      );

      toast({
        title: 'Transaction Successful',
        description: 'Your transaction has been successfully completed.',
        status: 'success',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });

      setVariants([]);
    } catch (error) {
      console.error('Transaction failed:', error);

      toast({
        title: 'Transaction Failed',
        description: 'There was an error processing your transaction.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <ProductsCard
        {...{
          variants,
          setVariants,
        }}
      />

      <Sidebar
        variants={variants}
        voucherCode={voucherCode}
        handleVoucherCodeChange={handleVoucherCodeChange}
        handleCharge={handleCharge}
        handleRemoveVariant={handleRemoveVariant}
      />
    </div>
  );
}

export default MainPage;
