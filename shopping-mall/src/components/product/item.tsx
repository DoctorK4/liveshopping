import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";

const ProductItem = ({
  imageUrl,
  price,
  title,
  description,
  createdAt,
  id
}: Product) => {
  return (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__title">{title}</p>
      <p className="product-item__title">{description}</p>
      <img className="product-item__image" src={imageUrl} />
      <span className="product-item__price">${price}</span>
      <p className="product-item__price">${createdAt}</p>
    </Link>
  </li>
  )
};

export default ProductItem;