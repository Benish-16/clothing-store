import React from "react";
import "../AboutUs.css";

export default function AboutUs() {
  return (
    <>

      <section className="about-hero">
        <div className="overlay">
          <h1>We believe<br />we can all make<br />a difference.</h1>
          <p>Exceptional quality. Ethical factories. Radical transparency.</p>
        </div>
      </section>


      <section className="container about-intro">
        <p>
          At <strong>Minimal</strong>, we want the right choice to be as easy
          as putting on a great T-shirt. That’s why we partner with the best,
          ethical factories around the world, source only the finest materials,
          and share those stories with you — down to the true cost of every
          product we make.
        </p>
      </section>


  <section className="container-fluid py-5">
  <div className="row align-items-center min-vh-75">

   
    <div className="col-md-6 px-5">
    
      <h2 className="fw-bold mb-4">Our ethical approach.</h2>

      <p>
        We spend months finding the best factories around the world—the same
        ones that produce your favorite designer labels. We visit them often
        and build strong personal relationships with the owners.
      </p>

      <p>
        Each factory is given a compliance audit to evaluate factors like fair
        wages, reasonable hours, and environment. Our goal? A score of
        <strong> 90 or above</strong> for every factory.
      </p>
    </div>


    <div className="col-md-6 p-0">
      <section className="about-image-full"></section>
    </div>

  </div>
</section>
<section className="container-fluid py-3">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="about-video"
  >
    <source
      src="https://res.cloudinary.com/everlane/video/upload/c_scale,q_auto,w_1800/v1560384023/Factory_Wide_pmvovx.mp4"
      type="video/mp4"
    />
  </video>
</section>


    
      <section className="container about-transparency mt-5">
        <h6 className="section-label">OUR PRICES</h6>
        <h2>Radical Transparency.</h2>
        <p>
          We believe our customers have a right to know how much their clothes
          cost to make. We reveal the true costs behind all of our products —
          from materials to labor to transportation — and offer them to you,
          minus the traditional retail markup.
        </p>

        <div className="price-bars">
          <div>
            <span>₹899</span>
            <div className="bar light"></div>
            <small>YourStore</small>
          </div>
          <div>
            <span>₹2,500</span>
            <div className="bar dark"></div>
            <small>Traditional Retail</small>
          </div>
        </div>
      </section>

     
    </>
  );
}
