import React from 'react';
import { Link } from "react-router-dom";

import '../App.css'

export default function Home() {
  return (
    <>
      <section
        className="vh-100 d-flex align-items-center justify-content-center text-center position-relative"
        style={{
          backgroundImage:
            "url('https://media.everlane.com/image/upload/c_scale,dpr_1.5,f_auto,q_auto,w_auto/v1/i/40df86dd_2f14.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>

        <div className="position-relative container">
          <h1 className="display-4 fw-bold text-shadow">Exceptional Quality.</h1>
          <p className="lead mt-3 text-shadow">
            Ethical factories. Radical transparency.
          </p>
          <Link
            to="/women"
            className="btn btn-light btn-lg mt-4 fw-bold shadow-sm"
            style={{ borderRadius: "30px" }}
          >
            Shop Now
          </Link>
        </div>
      </section>

    <section className="py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold">Why Choose Us</h2>
      <p className="text-muted">
        We're redefining fashion with sustainability and transparency at our core
      </p>
    </div>

    <div className="row g-4">
      {[
        {
          title: "Sustainable Materials",
          desc: "Premium fabrics sourced from eco-friendly suppliers who share our commitment to the planet",
          icon: "bi-tree"
        },
        {
          title: "Fair Trade Certified",
          desc: "Every piece supports fair wages and safe working conditions for our manufacturing partners",
          icon: "bi-hand-thumbs-up"
        },
        {
          title: "Carbon Neutral",
          desc: "From production to your doorstep, we offset 100% of our carbon footprint",
          icon: "bi-globe"
        }
      ].map((feature, i) => (
        <div className="col-md-4" key={i}>
          <div className="card h-100 text-center shadow-sm border-0 rounded-4 hover-shadow">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: "70px", height: "70px", fontSize: "1.8rem"}}>
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <h5 className="card-title fw-bold">{feature.title}</h5>
              <p className="card-text text-muted">{feature.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <section className="container-fluid p-0">
        <div className="row g-0 m-0">

          <div className="col-md-6 p-0">
            <Link to="/women" className="text-decoration-none d-block">
              <div className="position-relative overflow-hidden category-card">
                <img
                  src="https://media.everlane.com/image/upload/c_scale,dpr_1.5,f_auto,q_auto,w_auto/v1/i/287f132e_2c66.jpg"
                  className="img-fluid w-100 d-block transition-scale"
                  alt="Women"
                />
                <div className="position-absolute bottom-0 start-0 p-4 text-white bg-gradient p-4">
                  <h3 className="fw-bold mb-0">Women</h3>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 p-0">
            <Link to="/men" className="text-decoration-none d-block">
              <div className="position-relative overflow-hidden category-card">
                <img
                  src="https://media.everlane.com/image/upload/c_scale,dpr_1.5,f_auto,q_auto,w_auto/v1/i/397553c9_0b0b.jpg"
                  className="img-fluid w-100 d-block transition-scale"
                  alt="Men"
                />
                <div className="position-absolute bottom-0 start-0 p-4 text-white bg-gradient p-4">
                  <h3 className="fw-bold mb-0">Men</h3>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
