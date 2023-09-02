import React, { useState, useRef } from "react";
import "./Main.css";
import "../App.css";

export default function Main({ onAddToCartMain }) {
  const [activeImage, setActiveImage] = useState(1);
  const [counter, setCounter] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const addToCartRef = useRef();

  const handleGoLeft = () => {
    if (activeImage > 1) setActiveImage((active) => active - 1);
  };

  const handleGoRight = () => {
    if (activeImage < 4) setActiveImage((active) => active + 1);
  };

  const handleSetActiveImage = (i) => {
    setActiveImage((c) => i);
  };

  const handleViewPill = () => {
    setCounter(0);
    addToCartRef.current.classList.add("popup-pill-container-shown");
    setTimeout(
      () => addToCartRef.current.classList.remove("popup-pill-container-shown"),
      3000
    );
    clearTimeout();
  };
  return (
    <main className="main">
      <PhotoGallery
        activeImage={activeImage}
        onSetActiveImage={handleSetActiveImage}
        onShowGallery={() => setShowGallery(true)}
      >
        <CarouseleButtons
          handleGoLeft={handleGoLeft}
          handleGoRight={handleGoRight}
          activeImage={activeImage}
        />
      </PhotoGallery>
      {/* Enlarge gallery */}
      {showGallery && (
        <div className="gallery__overlay">
          <button onClick={() => setShowGallery(false)}>
            <img src="icon-close.svg" alt="close button" />
          </button>
          <PhotoGallery
            activeImage={activeImage}
            onSetActiveImage={handleSetActiveImage}
          ></PhotoGallery>
        </div>
      )}
      {/*  */}
      <div className="product-information">
        <ProductDescription
          company="SNEAKER COMPANY"
          productName="Fall Limited Edition Sneakers"
          description="These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer."
        />
        <ProductPrice discount="50" price="250" />
        <div className="counter-cart">
          <Counter counter={counter} setCounter={setCounter} />
          <AddToCart
            onAddToCart={onAddToCartMain}
            productName="Fall Limited Edition Sneakers"
            quantity={counter}
            price="125.00"
            onAddCart={handleViewPill}
          />
        </div>
      </div>
      <div ref={addToCartRef} className="popup-pill-container-hidden">
        <PopUpPill />
      </div>
    </main>
  );
}

function PopUpPill() {
  return (
    <div className="popup-pill-shown">
      <p>Added to Cart</p>
    </div>
  );
}

function PhotoGallery({
  activeImage,
  onSetActiveImage,
  onShowGallery,
  children,
}) {
  return (
    <div className="photo-gallery">
      <img
        className="active"
        src={`image-product-${activeImage}.jpg`}
        alt={`product view ${activeImage}`}
        loading="lazy"
        draggable={false}
        onClick={onShowGallery}
      />
      <div className="photo-selection">
        {Array.from({ length: 4 }, (_, i) => (
          <div className={activeImage === i + 1 ? "active" : ""} key={i}>
            <img
              className="thumbnail"
              src={`image-product-${i + 1}-thumbnail.jpg`}
              alt={`product thumb ${i + 1}`}
              loading="lazy"
              draggable={false}
              onClick={() => onSetActiveImage(i + 1)}
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

function AddToCart({
  onAddToCart,
  quantity,
  productName,
  price,
  onAddCart,
  onAddCartTimeout,
}) {
  return (
    <div
      className="add-to-cart-button"
      onClick={() => {
        if (quantity !== 0) {
          onAddToCart(productName, quantity, price);
          onAddCart();
        }
        // onAddCartTimeout();
      }}
    >
      <div role="button">
        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fill="#FFFFFF"
            fill-rule="nonzero"
          />
        </svg>
        <p>Add to cart</p>
      </div>
    </div>
  );
}

function Counter({ counter, setCounter }) {
  return (
    <div className="counter">
      <div className="container">
        <img
          src="icon-minus.svg"
          alt="minus counter button"
          role="button"
          onClick={() => setCounter((c) => (c >= 1 ? c - 1 : c))}
        />
        <p>{counter}</p>
        <img
          src="icon-plus.svg"
          alt="plus counter button"
          role="button"
          onClick={() => setCounter((c) => c + 1)}
        />
      </div>
    </div>
  );
}

function ProductDescription({ company, productName, description }) {
  return (
    <div className="description">
      <h1 className="company-name">{company}</h1>
      <h1 className="product-name">{productName}</h1>
      <p className="description-text">{description}</p>
    </div>
  );
}

function ProductPrice({ discount = 1, price }) {
  let discountDeduction = Number(price) * (Number(discount) / 100);
  let discountedPrice = (price - discountDeduction).toFixed(2);
  return (
    <div className="price-container">
      <div className="discount-container">
        <p className="discounted-price">${discountedPrice}</p>
        <p className="discount">{discount}%</p>
      </div>
      <div className="original-price-container">
        <p className="original-price">${price}</p>
      </div>
    </div>
  );
}

function CarouseleButtons({ handleGoLeft, handleGoRight, activeImage }) {
  return (
    <div className="gallery-buttons">
      <button
        className={activeImage === 1 ? "hidden" : ""}
        onClick={handleGoLeft}
      >
        <img src="icon-previous.svg" alt="previous button" />
      </button>
      <button
        className={activeImage === 4 ? "hidden" : ""}
        onClick={handleGoRight}
      >
        <img src="icon-next.svg" alt="next button" />
      </button>
    </div>
  );
}
