import { useMutation } from 'react-query';
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart"
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";

const CartItem = ({
  imageUrl,
  price,
  title,
  amount,
  id,
}: CartType) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation((
    {id, amount}:{id: string, amount: number}) => graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(QueryKeys.CART);
        if (!prevCart?.[id]) return prevCart;

        const newCart = {
          ...(prevCart || {}),
          [id]: { ...prevCart[id], amount },
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);
        return prevCart
      },
      onSuccess: newValue => {
        // item 하나에 대한 데이터
        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(QueryKeys.CART);
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        queryClient.setQueriesData(QueryKeys.CART, newCart); // cart 전체에 대한 데이터
      }
    },
  );

  // cart useQuery를 쓰는 뷰가 10개다 -> 1개로 전부 업데이트 반영 ok
  const { mutate: deleteCart } = useMutation((
    {id}:{id: string}) => graphqlFetcher(DELETE_CART, { id }), {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART)
      }
    }
  )

  const handleUpdateEvent = (e:SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id })
  }
  
  return (
    <li className="cart-item">
      <input className='cart-item__checkbox' type='checkbox'/>
      <img className="cart-item__image" src={imageUrl} alt={title} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
      <input 
        className="cart-item__amount" 
        type="number" 
        value={amount} 
        onChange={handleUpdateEvent}
      />
      <button className='cart-item__button' type="button" onClick={handleDeleteItem}>
        삭제
      </button>
    </li>
  )
};

export default CartItem;