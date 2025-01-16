import { ShopEventType, Product } from "../../shopMachine";
import { ShopContext } from "../../ShopContext";
import styles from "./styles.module.css";

const products = [
  { id: 1, img: "🔋", title: "Battery ", price: 10 },
  { id: 2, img: "🐳", title: "Whale", price: 20 },
  { id: 3, img: "🛵", title: "Scooter", price: 30 },
];

function Item({ product }: { product: Product }) {
  const actorRef = ShopContext.useActorRef();
  return (
    <div
      className={styles.item}
      onClick={() => {
        actorRef.send({
          type: ShopEventType.ADD_TO_CART,
          value: product,
        });
      }}
    >
      <div className={styles.img}>{product.img}</div>
      <div>{product.title}</div>
      <div>{product.price} €</div>
    </div>
  );
}

export function Products() {
  const length = ShopContext.useSelector((state) => state.context.products.length);
  const actorRef = ShopContext.useActorRef();

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
      <div
        className={styles.item}
        onClick={() => {
          actorRef.send({
            type: ShopEventType.CART_CONFIRM,
          });
        }}
      >
        🛒{length}
        </div>
    </div>
  );
}
