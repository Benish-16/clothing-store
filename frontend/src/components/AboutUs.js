import React from "react";
import "../AboutUs.css";

export default function AboutUs() {
  return (
    <>
     
      <div className="page-offset">


        <section className="about-hero">
          <div className="overlay">
            <h1>
              We believe <br />
              we can all make <br />
              a difference.
            </h1>
            <p>
              Exceptional quality. Ethical factories. Radical transparency.
            </p>
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

     
        <section className="container-fluid py-4 py-md-5">
          <div className="row align-items-center">

            <div className="col-md-6 px-4 mb-4 mb-md-0">
              <h2 className="fw-bold mb-4">Our ethical approach.</h2>

              <p>
                We spend months finding the best factories around the world—the same
                ones that produce your favorite designer labels.
              </p>

              <p>
                Each factory is audited for fair wages, reasonable hours,
                and environmental responsibility. Our goal is a score of
                <strong> 90+</strong>.
              </p>
            </div>

            <div className="col-md-6 p-0">
              <div className="about-image-full"></div>
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

        {/* TRANSPARENCY */}
        <section className="container about-transparency">
          <h6 className="section-label">OUR PRICES</h6>
          <h2>Radical Transparency.</h2>

          <p>
            We believe customers deserve to know how much their clothes cost
            to make. We reveal the true costs behind every product.
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

      </div>
    </>
  );
}
