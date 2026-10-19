function addToCart(cart, product, quantity = 1) {
  if (quantity <= 0 || quantity > product.stock) {
    throw new RangeError("Invalid quantity");
  }

  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex !== -1) {
    const newQuantity = cart[existingIndex].quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError("Invalid quantity");
    }
    const updatedCart = [...cart];
    updatedCart[existingIndex] = {
      ...updatedCart[existingIndex],
      quantity: newQuantity,
    };
    return updatedCart;
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, productId, quantity) {
  const item = cart.find((i) => i.id === productId);
  if (!item) {
    return [...cart];
  }

  if (quantity <= 0 || quantity > item.stock) {
    throw new RangeError("Invalid quantity");
  }

  return cart.map((i) => (i.id === productId ? { ...i, quantity } : i));
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode = "") {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  const discountedSubtotal = subtotal - discount;
  const delivery = discountedSubtotal >= 50000 ? 0 : 30000;
  const total = discountedSubtotal + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
