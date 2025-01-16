import styles from "./styles.module.css";

export function Payment() {
  return (
    <div>
      Payment
      <div style={{ display: 'flex', gap: '4px', margin: '4px' }}>
        <div className={styles.item}>Credit card</div>
        <div className={styles.item}>PayPal</div>
      </div>
    </div>
  );
}
