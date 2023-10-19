import { graphql } from 'msw';
//  
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';
import {  GET_CART, ADD_CART, CartType, UPDATE_CART } from '../graphql/cart';

const mockProducts = (() => 
  Array.from({ length: 20 }).map((_, i) => ({ 
    id: (i + 1) + '',
    imageUrl: `https://dummyimage.com/640x480/000/fff/${i}`,
    price: 50000,
    title: `임시 상품 ${i}`,
    description: `임시 상세내용 ${i}`,
    createdAt: new Date(1697443237253 + (i*1000*24*60*60)).toString(),
  })))();


let cartData: { [key: string]: CartType } = {};

export const handlers = [
  // Handles a "GetUserInfo" query
  graphql.query(GET_PRODUCTS, (req, res, ctx)=>{
    return res(
      ctx.data({
        products: mockProducts,
      }),
    )
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find(item => item.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res()
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData))
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = {...cartData};
    const id = req.variables.id;
    const targetProduct = mockProducts.find(item => item.id === req.variables.id);
    if (!targetProduct) {throw new Error('상품이 없습니다.')}

    const newItem = {
      ...(newCartData[id] || {}),
      amount: (newCartData[id].amount || 0) +1,
    };
    newCartData[id] = newItem;
    
    cartData = newCartData
    return res(ctx.data(newItem));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw new Error('없는 데이터 입니다.');
    }
    const newItem = {
      ...newData[id],
      amount,
    };
    newData[id] = newItem;
    cartData = newData
    return res(ctx.data(newItem));
  })
];