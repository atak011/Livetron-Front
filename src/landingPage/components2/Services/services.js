import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";

//Import Section Title
import SectionTitle from "../Common/SectionTitle";
import ServiceBox from "./service-box";
import { getLivecommerces } from "../../../pages/LiveCommerce/Services/LiveCommerceService";

const Services = props => {
  const { upcomingInfo } = props;

  return (
    <React.Fragment>
      {/* SERVICE START  */}
      <section id="service" className="section position-relative">
        <Container>
          <SectionTitle title="Yaklaşan Diğer Etkinlikler" />

          <Row className="align-items-center">
            <div className="col-lg-12">
              <div className="row">
                <ServiceBox upcomingInfo={upcomingInfo} />
              </div>
            </div>
          </Row>
        </Container>
      </section>

      {/* SERVICE END  */}
    </React.Fragment>
  );
};

export default Services;
