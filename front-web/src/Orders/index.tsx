import { useEffect, useState } from 'react';
import { fetchProducts, saveOrder } from '../api';
import { checkIsSelected } from './helpers';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import ProductsList from './ProducstList';
import StepsHeader from './StepsHeader';
import { toast } from 'react-toastify';

import './styles.css';
import { OrderLocationData, Product } from './types';

function Orders() {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProducts, setselectedProducts] = useState<Product[]>([])
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price
    }, 0);

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(() => {
                toast.warning('Erro ao listar peprodutos');
              })
    }, []);


    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setselectedProducts(selected);
        } else {
            setselectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
          ...orderLocation!,
          products: productsIds
        }
      
        saveOrder(payload).then((response) => {
          toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
          setselectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
      }

    return (
        <div className="orders-container">
            <StepsHeader />
            <ProductsList
                products={products}
                onSelectProduct={handleSelectProduct}
                selectedProducts={selectedProducts}
            />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
            <OrderSummary 
            amount={selectedProducts.length} 
            totalPrice={totalPrice}
            onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Orders;