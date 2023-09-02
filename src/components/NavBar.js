import { useEffect, useRef, useState } from "react";
import "./NavBar.css";

export default function NavBar({ cartItems, setCartItems }) {
  const navRef = useRef();

  const handleOpenMenu = () => {
    navRef.current.classList.add("navbar__shown");
  };

  const handleCloseMenu = () => {
    navRef.current.classList.remove("navbar__shown");
  };

  const handleRemoveItem = (id) => {
    setCartItems((c) => c.filter((i) => i.id !== id));
  };

  return (
    <div>
      <header>
        <Button
          icon="icon-menu.svg"
          altText="menu button"
          className="menu-button"
          onClick={() => handleOpenMenu()}
        />
        <div className="logo-container">
          <img src="logo.svg" alt="sneakers logo" id="logo" />
        </div>
        <nav id="navbar" className="navbar__hidden" ref={navRef}>
          <ul>
            <Button
              icon="icon-close.svg"
              altText="menu button"
              className="close-button"
              onClick={() => handleCloseMenu()}
            />
            <ListItem link="#collection" text="Collections" />
            <ListItem link="#men" text="Men" />
            <ListItem link="#women" text="Women" />
            <ListItem link="#about" text="About" />
            <ListItem link="#contact" text="Contact" />
          </ul>
        </nav>
        <div></div>
        <Button
          icon="icon-cart.svg"
          alt="cart"
          className="cart"
          hasBadge={true}
          len={cartItems.length}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
        />
        <Button
          icon="image-avatar.png"
          alt="user avatar"
          className="user-avatar"
        />
      </header>
    </div>
  );
}

function ListItem({ link, text }) {
  return (
    <li className="nav__list-item">
      <a href={link}>{text}</a>
    </li>
  );
}

function Button({
  icon,
  altText,
  className,
  onClick = () => {},
  hasBadge = false,
  len = 0,
  cartItems,
  onRemoveItem,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <button
      className={`button ${className}`}
      onClick={() => (cartItems ? setCartOpen(!cartOpen) : onClick())}
    >
      <img
        src={icon}
        alt={altText}
        // onClick={() => cartItems && setCartOpen((current) => !current)}
      />
      {hasBadge && <Badge len={len} />}
      <div className="cart-view-container">
        {cartOpen && (
          <CartView
            cartItems={cartItems}
            setCartOpen={setCartOpen}
            onRemoveItem={onRemoveItem}
          />
        )}
      </div>
    </button>
  );
}

function CartView({ cartItems, setCartOpen, onRemoveItem }) {
  const outerClickRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (!outerClickRef.current.contains(e.target)) {
      setCartOpen(false);
    }
  };
  return (
    <div className="cart-view" ref={outerClickRef}>
      <p className="header">Cart</p>
      {cartItems.length > 0 ? (
        <>
          <div className="cart__item-list">
            {cartItems?.map((item, i) => (
              <CartItem
                cartItems={item}
                productName={item.productName}
                quantity={item.quantity}
                price={item.price}
                key={i}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
          <div className="cart__checkout-btn-container">
            <button className="cart__checkout-btn">Checkout</button>
          </div>
        </>
      ) : (
        <div className="cart__empty">
          <p className="cart__empty-text">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

function CartItem({
  cartItems,
  productName,
  quantity,
  price,
  index,
  onRemoveItem,
}) {
  let totalItemPrice = (Number(price) * Number(quantity)).toFixed(2);
  let pprice = Number(cartItems?.price).toFixed(2);
  return (
    <div className="cart__cart-item">
      <img
        className="cart__product-image"
        src="image-product-1.jpg"
        alt={`${productName}`}
        width="40px"
        height="40px"
      />
      <div className="cart__product-description">
        <p>{productName}</p>
        <p>
          {`$${pprice} x ${quantity}`}
          <strong className="cart__total-item-price">{`$${totalItemPrice}`}</strong>
        </p>
      </div>
      <button
        className="cart__trash-btn"
        onClick={() => onRemoveItem(cartItems.id)}
      >
        <img
          role="button"
          className="cart__trash-btn-img"
          src="icon-delete.svg"
          alt="remove item from cart button"
        />
      </button>
    </div>
  );
}

function Badge({ len }) {
  return (
    <>
      {len > 0 && (
        <div className="badge">
          <p>{len}</p>
        </div>
      )}
    </>
  );
}
