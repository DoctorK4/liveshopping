import { useQuery } from "react-query";
import { Querykeys, fetcher } from "../../queryClient";
import { Product } from "../../types";
import ProductItem from "../../components/product/item";
import '../../scss/index.scss';

const ProductList = () => {
  const { data } = useQuery<Product[]>(Querykeys.PRODUCTS, () => fetcher({
    method: 'GET',
    path: '/products'
  }))
  
  console.log(data)
  /* 
  id: 1
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  price: 109.95
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
  category: "men's clothing"
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
▶ rating 
    rate: 3.9
    count: 120
   */

  return (
    <div>
      <ul className="products">{data?.map(product => (
        <ProductItem {...product} key={product.id} />
      ))}</ul>
    </div>
  )
}

export default ProductList;