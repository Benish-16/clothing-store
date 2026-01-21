import React, { useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
export default function EditProduct() {
    const navigate = useNavigate();
          const { showAlert } = useContext(alertContext);
  const { state: product } = useLocation();
  const handleSaveChanges = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `https://clothing-store-backc-p6nl.onrender.com/api/product/update/${product._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, 
        },
        body: JSON.stringify({
          name,
          variants,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
       showAlert("Product updated successfully!",'success');
      navigate(-1); 
    } else {
      alert("Failed to update product: " ,'danger');
    }
  } catch (err) {
    console.error("Error updating product:", err);
    showAlert("Server error while updating product.",'danger');
  }
};


  const [name, setName] = useState(product.name);
  const [variants, setVariants] = useState(product.variants);

  if (!product) return <p>No product data</p>;
const addColor = () => {
  setVariants([
    ...variants,
    {
      color: "",
      images: "",
      sizes: []
    }
  ]);
};
const deleteColor = (index) => {
  setVariants(variants.filter((_, i) => i !== index));
};
const addSize = (index) => {
  const updated = [...variants];
  updated[index].sizes.push({ size: "", quantity: 0 });
  setVariants(updated);
};
const deleteSize = (index, sindex) => {
  const updated = [...variants];
  updated[index].sizes =
    updated[index].sizes.filter((_, i) => i !==sindex);
  setVariants(updated);
};


 return (
  <div className="container my-4">
    <h3>Edit Product</h3>

    <input
      className="form-control mb-3"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Product name"
    />

    {variants.map((variant, index) => (
      <div key={index} className="border p-3 mb-3 rounded">

        <div className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            value={variant.color}
            placeholder="Color"
            onChange={(e) => {
              const updated = [...variants];
              updated[index].color = e.target.value;
              setVariants(updated);
            }}
          />

         
        </div>

     
        <input
          className="form-control mb-2"
          value={variant.images}
          placeholder="Image URL"
          onChange={(e) => {
            const updated = [...variants];
            updated[index].images = e.target.value;
            setVariants(updated);
          }}
        />

     
        {variant.sizes.map((s, sindex) => (
          <div key={sindex} className="d-flex gap-2 mb-2">
            <input
              className="form-control"
              placeholder="Size"
              value={s.size}
              onChange={(e) => {
                const updated = [...variants];
                  const value = e.target.value.toUpperCase();
                 const exists = updated[index].sizes.some(
      (item, i) => item.size === value && i !== sindex
    );

    if (exists) {
      alert("Size already exists for this color");
      return;
    }
                updated[index].sizes[sindex].size = e.target.value;
                setVariants(updated);
              }}
            />

            <input
              type="number"
              className="form-control"
              placeholder="Qty"
              value={s.quantity}
              onChange={(e) => {
                const updated = [...variants];
                updated[index].sizes[sindex].quantity = Number(e.target.value);
                setVariants(updated);

              }}
               onKeyDown={(e) => {

    e.preventDefault();
  }}
  step={1}
            />

            <button
              className="btn btn-outline-danger"
              onClick={() => deleteSize(index, sindex)}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          className="btn btn-outline-secondary mx-2"
          onClick={() => addSize(index)}
        >
          + Add Size
        </button>
         <button
            className="btn btn-danger"
            onClick={() => deleteColor(index)}
          >
           <i className="bi bi-trash"></i>
          </button>
      </div>
    ))}

    <button className="btn btn-outline-dark mb-3" onClick={addColor}>
      + Add Color
    </button>

    <div className="d-flex gap-2">
      <button onClick={handleSaveChanges} className="btn btn-success">
        Save Changes
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  </div>
);
}


