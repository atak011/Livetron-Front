import React, { Component } from "react";
import { Container } from "reactstrap";

//Import Components
import SectionTitle from "../../components/Common/SectionTitle";

//Slider
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Import Client images
import client1 from "../../assets/images/client/img-1.jpg";

class Clients extends Component {
  state = {
    clients: [
      {
        id: 1,
        img: "",
        name: "Irene Devoe",
        technology: "Web Development, USA",
        description:
          "Aeque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur numquam tempora."
      },
      {
        id: 2,
        img: "",
        name: "Adrian Kidd",
        technology: "Web Designer, USA",
        description:
          "Et harum quidem a rerum that facilis est et expedita libero tempore soluta nobis cumque as impedit."
      },
      {
        id: 3,
        img: "",
        name: "Shari Turner",
        technology: "Graphic Designer, USA",
        description:
          "Sed ut perspiciatis a unde omnis iste natus error sit as voluptatem accusantium laudantium."
      },
      {
        id: 4,
        img: "",
        name: "Robert Story",
        technology: "Web Designer, USA",
        description:
          "Aeque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur numquam tempora."
      },
      {
        id: 5,
        img: "",
        name: "Lisa Traxler",
        technology: "Graphic Designer, USA",
        description:
          "Et harum quidem a rerum that facilis est et expedita libero tempore soluta nobis cumque as impedit."
      },
      {
        id: 6,
        img: "",
        name: "Michael Bang",
        technology: "Web Developer, USA",
        description:
          "Sed ut perspiciatis a unde omnis iste natus error sit as voluptatem accusantium laudantium."
      },
      {
        id: 7,
        img: "",
        name: "Joyce Yates",
        technology: "Web Designer, USA",
        description:
          "Aeque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur numquam tempora."
      }
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

            <div className="row mt-4">
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
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Irene Devoe</h5>
                    <p className="text-muted f-14">Web Development, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Aeque porro quisquam est qui dolorem ipsum quia dolor sit
                      amet consectetur numquam tempora.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Adrian Kidd</h5>
                    <p className="text-muted f-14">Web Designer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Et harum quidem a rerum that facilis est et expedita
                      libero tempore soluta nobis cumque as impedit.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Shari Turner</h5>
                    <p className="text-muted f-14">Graphic Designer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Sed ut perspiciatis a unde omnis iste natus error sit as
                      voluptatem accusantium laudantium.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Robert Story</h5>
                    <p className="text-muted f-14">Web Designer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Aeque porro quisquam est qui dolorem ipsum quia dolor sit
                      amet consectetur numquam tempora.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Lisa Traxler</h5>
                    <p className="text-muted f-14">Graphic Designer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Et harum quidem a rerum that facilis est et expedita
                      libero tempore soluta nobis cumque as impedit.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Michael Bang</h5>
                    <p className="text-muted f-14">Web Developer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Sed ut perspiciatis a unde omnis iste natus error sit as
                      voluptatem accusantium laudantium.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">Joyce Yates</h5>
                    <p className="text-muted f-14">Web Designer, USA</p>
                    <i className="remixicon-double-quotes-r h4 testi-icon" />
                    <p className="text-muted f-15 mt-3 mb-0">
                      Aeque porro quisquam est qui dolorem ipsum quia dolor sit
                      amet consectetur numquam tempora.
                    </p>
                  </div>
                </div>
              </OwlCarousel> */}
            </div>
          </Container>
        </section>
        {/* TESTIMONIAL END */}
      </React.Fragment>
    );
  }
}

export default Clients;
