const sql = {
  savedCart: cartId => `SELECT shopping_cart.item_id, shopping_cart.attributes, shopping_cart.quantity, shopping_cart.product_id, product.name, product.price, product.image, (shopping_cart.quantity * product.price ) AS subtotal
  FROM shopping_cart
  INNER JOIN product 
  ON shopping_cart.product_id = product.product_id
  WHERE shopping_cart.cart_id = '${cartId}';`,
  savedOrder: orderId => `SELECT order_id, attributes, quantity, product_id, product_name, unit_cost, (quantity * unit_cost ) AS subtotal
  FROM order_detail
  WHERE order_id = '${orderId}';`,
  customerEmail: order_id => `SELECT customer.email
  FROM orders
  INNER JOIN customer 
  ON orders.customer_id = customer.customer_id
  WHERE orders.order_id = '${order_id}';`,
};
export default sql;
