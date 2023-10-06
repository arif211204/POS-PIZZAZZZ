import { Grid, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveProducts } from '../../../states/products/action';
import CustomModal from './modalVariants';
import ProductItem from './ProductItem';

export function ProductsCard({ variants, setVariants }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    dispatch(asyncReceiveProducts({ perPage: 1000 }));
  }, [dispatch]);

  const getGridTemplateColumns = () => {
    if (isSmallScreen) {
      return 'repeat(1, 1fr)';
    }
    return 'repeat(3, 1fr)';
  };

  return (
    <>
      <Grid templateColumns={getGridTemplateColumns()} maxWidth="1200x">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            setIsModalOpen={setIsModalOpen}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </Grid>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        variants={variants}
        setVariants={setVariants}
      />
    </>
  );
}
