import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Section Title
import SectionTitle from "../Common/SectionTitle";

class Pricing extends Component {
  pricingPlan1 = {
    pricings: [
      {
        id: 1,
        title: "Free",
        price: "8.20",
        duration: "month",
        currency: "$",
        features: {
          bandwith: "1GB",
          onlinespace: "500MB",
          support: "No"
        }
      }
    ]
  };

  pricingPlan2 = {
    pricings: [
      {
        id: 1,
        title: "-20%",
        price: "49.70",
        currency: "$",
        duration: "month",
        features: {
          bandwith: "1.5GB",
          onlinespace: "1GB",
          support: "Yes"
        }
      }
    ]
  };

  pricingPlan3 = {
    pricings: [
      {
        id: 1,
        title: "-50%",
        price: "99.9",
        currency: "$",
        duration: "month",
        features: {
          bandwith: "2GB",
          onlinespace: "2GB",
          support: "No"
        }
      }
    ]
  };

  render() {
    return (
      <React.Fragment>
        {/* PRICING START */}
        <section className="section bg-light" id="pricing">
          <Container>
            <SectionTitle
              title=" Pricing Plans"
              description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
              odit aut fugit sed consequuntur as sequi nesciunt."
            />

            <Row>
              {this.pricingPlan1.pricings.map((pricingPlan1, key) => (
                <Col lg={4} key={pricingPlan1.currency}>
                  <div
                    className="pricing-box text-center bg-white p-5 mt-4 position-relative"
                    key={pricingPlan1.id}
                  >
                    <div className="mt-4 mb-5">
                      <i className="remixicon-star-line h3 text-purple pricing-icon p-4 rounded-circle" />
                    </div>
                    <h2 className="text-dark font-weight-medium mb-5">
                      <sup className="h5">{pricingPlan1.currency} </sup>
                      {pricingPlan1.price}
                      <sub className="h5">/{pricingPlan1.duration}*</sub>
                    </h2>
                    <p className="text-muted">
                      Onlinespace : {pricingPlan1.features.onlinespace}
                    </p>
                    <p className="text-muted">
                      Bandwidth : {pricingPlan1.features.bandwith}
                    </p>
                    <p className="text-muted">
                      Support : {pricingPlan1.features.support}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-purple mt-4"
                    >
                      Choose this plan
                    </button>
                  </div>
                </Col>
              ))}

              {this.pricingPlan2.pricings.map((pricingPlan2, key) => (
                <Col lg={4} key={pricingPlan2.id}>
                  <div className="pricing-box active text-center bg-white p-5 mt-4 position-relative">
                    <div className="ribbon">
                      <p className="mb-0 f-12 font-weight-medium text-white">
                        {pricingPlan2.title}
                      </p>
                    </div>
                    <div className="mt-4 mb-5">
                      <i className="remixicon-star-half-line h3 text-purple pricing-icon p-4 rounded-circle" />
                    </div>
                    <h2 className="text-dark font-weight-medium mb-5">
                      <sup className="h5">{pricingPlan2.currency} </sup>
                      {pricingPlan2.price}
                      <sub className="h5">/{pricingPlan2.duration}*</sub>
                    </h2>
                    <p className="text-muted">
                      Onlinespace : {pricingPlan2.features.onlinespace}
                    </p>
                    <p className="text-muted">
                      Bandwidth : {pricingPlan2.features.bandwith}
                    </p>
                    <p className="text-muted">
                      Support : {pricingPlan2.features.support}
                    </p>
                    <button type="button" className="btn btn-purple mt-4">
                      Choose this plan
                    </button>
                  </div>
                </Col>
              ))}

              {this.pricingPlan3.pricings.map((pricingPlan3, key) => (
                <Col lg={4} key={pricingPlan3.id}>
                  <div className="pricing-box text-center bg-white p-5 mt-4 position-relative">
                    <div className="ribbon">
                      <p className="mb-0 f-12 font-weight-medium text-white">
                        {pricingPlan3.title}
                      </p>
                    </div>
                    <div className="mt-4 mb-5">
                      <i className="remixicon-star-fill h3 text-purple pricing-icon p-4 rounded-circle" />
                    </div>
                    <h2 className="text-dark font-weight-medium mb-5">
                      <sup className="h5">{pricingPlan3.currency} </sup>
                      {pricingPlan3.price}
                      <sub className="h5">/{pricingPlan3.duration}*</sub>
                    </h2>
                    <p className="text-muted">
                      Onlinespace : {pricingPlan3.features.onlinespace}
                    </p>
                    <p className="text-muted">
                      Bandwidth : {pricingPlan3.features.bandwith}
                    </p>
                    <p className="text-muted">
                      Support : {pricingPlan3.features.support}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-purple mt-4"
                    >
                      Choose this plan
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* PRICING END  */}
      </React.Fragment>
    );
  }
}

export default Pricing;
