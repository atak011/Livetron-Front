import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Components
import SectionTitle from "../../components/Common/SectionTitle";

//Slider
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Import Client images
import client1 from "../../assets/images/client/img-1.jpg";
import clientlogo1 from "../../assets/images/clients-logo/1.png";
import clientlogo2 from "../../assets/images/clients-logo/2.png";
import clientlogo3 from "../../assets/images/clients-logo/3.png";
import clientlogo4 from "../../assets/images/clients-logo/4.png";

class Clients extends Component {
  state = {
    clients: [
      {
        id: 1,
        img: client1,
        name: "Joyce Pace",
        technology: "Web Development, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 2,
        img: client1,
        name: "Mark Long",
        technology: "Graphic Designer, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 3,
        img: client1,
        name: "Mary Roberge",
        technology: "Web Designer, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 4,
        img: client1,
        name: "Thomas Varela",
        technology: "Web Developer, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 5,
        img: client1,
        name: "Venita Monroe",
        technology: "Graphic Designer, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 6,
        img: client1,
        name: "Venita Monroe",
        technology: "Web Developer, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      },
      {
        id: 7,
        img: client1,
        name: "Leslie Cullison",
        technology: "PHP Development, USA",
        description:
          "At vero eos site a accusamus that is iusto odio dignissimos ducimus a excepturi site as this cupiditate non blanditiis finish."
      }
    ],
    clientsLogo: [
      { id: 1, img: clientlogo1, name: "coraline" },
      { id: 2, img: clientlogo2, name: "google" },
      { id: 3, img: clientlogo3, name: "canone" },
      { id: 4, img: clientlogo4, name: "disney" }
    ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      960: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        {/* <!-- TESTIMONIAL START --> */}

        <section className="section position-relative" id="client">
          <Container>
            <SectionTitle
              title="What Our Customers Say"
              description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed consequuntur as sequi nesciunt."
            />

            <Row className="mt-4">
              {/* <OwlCarousel
                className="owl-theme client-images text-center"
                items={2}
                loop={true}
                margin={10}
                nav={false}
                dots={true}
                autoplay={true}
                responsive={this.state.responsive}
                autoplayHoverPause={true}
                autoplayTimeout={2500}
              >
                {this.state.clients.map((clients, key) => (
                  <div className="item" key={key}>
                    <div className="testi-content-2 m-3">
                      <div className="texti-2-box rounded p-4">
                        <div className="float-left mr-3">
                          <i className="remixicon-double-quotes-l testi-2-icon h3" />
                        </div>
                        <div className="position-relative overflow-hidden">
                          <p className="text-muted f-15 mb-0">
                            {clients.description}
                          </p>
                        </div>
                      </div>
                      <div className="testi-img-content text-center">
                        <img
                          src={clients.img}
                          alt="client1"
                          className="img-fluid mx-auto d-block rounded-circle"
                        />
                        <h6 className="text-dark mt-3 mb-0">{clients.name}</h6>
                        <p className="text-muted f-14">{clients.technology}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel> */}
            </Row>
            <Row className="mt-5 justify-content-center">
              <Col lg={10}>
                <div className="row justify-content-center">
                  {this.state.clientsLogo.map((clientsLogo, key) => (
                    <div className="col-md-3" key={key}>
                      <div className="p-3">
                        <img
                          src={clientsLogo.img}
                          alt={clientsLogo.name}
                          className="img-fluid mx-auto d-block clients-logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* TESTIMONIAL END */}
      </React.Fragment>
    );
  }
}

export default Clients;
