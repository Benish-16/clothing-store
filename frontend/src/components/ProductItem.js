import React, { useState,useContext } from "react";
import "./ProductItem.css";
import { useCart } from "../context/cart/CartState";
import authContext from "../context/auth/authContext";
import { useNavigate} from "react-router-dom";
import alertContext from "../context/alert/alertContext";


export default function ProductItem({ product,onDelete }) {
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const { cartItems, addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return null;

  const variants = product.variants || [];
  const { name, price} = product;

const handleColorClick = (variant) => {
 
  setSelectedVariant(variant);
  setSelectedSize(""); 
};

const handleSizeClick = (size) => {

  setSelectedSize(size);

    console.log("Size clicked:", size);
    console.log("Product active:", product.isActive);
    console.log("Variant active:", selectedVariant?.isActive);
};

const handleAddToCart = async () => {
  if (!selectedVariant || !selectedSize) return;

  const cartItem = {
    productId: product._id,
    color: selectedVariant.color,
    size: selectedSize,
    image: selectedVariant.images,
    quantity: 1,
    price: product.price,
 
  };

    addToCart(cartItem, 1);
 
  const updatedVariant = {
    ...selectedVariant,
    sizes: selectedVariant.sizes.map(s =>
      s.size === selectedSize
        ? { ...s, quantity: s.quantity - 1 }
        : s
    )
  };

  setSelectedVariant(updatedVariant);
  

};
const deleteProduct = async (productId) => {
  
  const token = localStorage.getItem("token");

  const response = await fetch(
    "https://clothing-store-backcheck.onrender.com/api/product/delete",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    }
  );

  const _data = await response.json();

  if (response.ok) {
    showAlert("Product deleted","success");
       onDelete(productId);
  } else {
    showAlert( "Delete failed","danger");
  }
};



  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card product-card h-100 border-0 shadow-sm">
        <div className="position-relative">
          <div className="position-relative">
  <img
    src={selectedVariant?.images || variants?.[0]?.images || ""}
    className="card-img-top product-img"
    alt={name}

  />


   {(selectedSize && selectedVariant.sizes.find(s => s.size === selectedSize)?.quantity === 0)
 && (
    <span className="badge bg-danger position-absolute top-50 start-50 translate-middle">
      Not Available
    </span>
  )}
</div>

          
         
        </div>

        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>

          <p className="fw-bold">₹{price}</p>

      
          <div className="d-flex justify-content-center mb-2">
            {variants.map((v, i) => (
              <span
                key={i}
                className={`color-circle mx-1 ${
                  selectedVariant?.color === v.color ? "selected" : ""
                }`}
                style={{ backgroundColor: v.color }}
                onClick={() => handleColorClick(v)}
              />
            ))}
          </div>

      
         <div className="d-flex justify-content-center gap-2 flex-wrap mb-2">
  {selectedVariant?.sizes.map((s, i) => (
    <span
      key={i}
      className={`size-box ${
        selectedSize === s.size ? "selected" : ""
      } ${s.quantity === 0 ? "out-of-stock" : ""}`}
      onClick={() => handleSizeClick(s.size)}
      style={{ cursor: "pointer" }} 
    >
      {s.size}
    </span>
  ))}
</div>


        
         {selectedVariant && selectedSize && selectedVariant.sizes.find((s) => s.size === selectedSize)?.quantity > 0 && (
  <span className="badge bg-secondary mt-2">
    Available:{" "}
    {selectedVariant.sizes.find((s) => s.size === selectedSize)?.quantity}
  </span>
)}

        
      
{user?.admin && (
  <div className="d-flex gap-2 mt-2">
    <button
  className="btn btn-outline-dark btn-sm w-50 d-flex align-items-center justify-content-center gap-2"
onClick={() => navigate("/editproduct", { state: product})}

>
  <i className="bi bi-pencil-square"></i>
  
</button>

<button
  className="btn btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-2"
  onClick={() => deleteProduct(product._id)}
>
  <i className="bi bi-trash"></i>

</button>

  </div>
)}
{!user?.admin && (
  <button
    className="btn btn-dark w-100 mt-2"
    disabled={!selectedVariant || !selectedSize}
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>
)}

        </div>
      </div>
    </div>
  );
}
