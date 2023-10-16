import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';

const mockProducts = Array.from({ length: 20 }).map(
  (_, i) => ({ 
    id: uuid(),
    imageUrl: `https://dummyimage.com/640x480/bab8ba/${i}`,
    price: 50000,
    title: `임시 상품 ${i}`,
    description: `임시 상세내용 ${i}`,
    createdAt: new Date(1697443237253 + (i*1000*24*60*60)).toString(),
  })
);

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
    return res(ctx.data(mockProducts[0]))
  }),
];