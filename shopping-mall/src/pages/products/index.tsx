import { useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import ProductItem from "../../components/product/item";
import '../../scss/index.scss';
import GET_PRODUCTS, { Products } from "../../graphql/products";

const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher<Products>(GET_PRODUCTS));

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">{data?.products?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (product: any) => { return <ProductItem {...product} key={product.id} /> }
        )}
      </ul>
    </div>
  )
}

export default ProductList;