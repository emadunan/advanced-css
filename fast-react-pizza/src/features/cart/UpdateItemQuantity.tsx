import React from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getPizzaQuantityById,
  increaseItemQuantity,
} from './cartSlice';

interface Props {
  pizzaId: string;
}

const UpdateItemQuantity: React.FC<Props> = ({ pizzaId }) => {
  const dispatch = useDispatch();

  const quantity = useSelector(getPizzaQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-3">
      <Button
        type="rounded"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        type="rounded"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
