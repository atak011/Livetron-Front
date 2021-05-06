import React, { Component } from "react";
import { Spring, config } from "react-spring/renderprops";

import ProjectCount from "../../assets/images/counter/1.png";
import AwardWins from "../../assets/images/counter/2.png";
import HappyClients from "../../assets/images/counter/3.png";
import Country from "../../assets/images/counter/4.png";
import CounterBg from "../../assets/images/cta-bg.png";
import { Container, Row } from "reactstrap";

class Achievement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startCount: false
    };
  }

  handleScroll = async () => {
    if (window.scrollY > 1500) {
      await this.setState({ startCount: true });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <React.Fragment>
        {/* COUNTER START  */}
        <section
          className="section position-relative"
          style={{ background: `url(${CounterBg}) center center` }}
        >
          <div className="bg-overlay" />
          <Container className="container">
            <Row id="counter">
              <div className="col-lg-3 col-md-6">
                <div className="counter-box p-4 rounded mt-2 mb-2">
                  <div className="float-left mr-4">
                    <img
                      src={ProjectCount}
                      alt="ProjectCount"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-white pl-4">
                    <h2 className="mb-2">
                      <span className="counter-value mt-4" data-count="1530">
                        {this.state.startCount ? (
                          <Spring
                            from={{ number: 0 }}
                            to={{ number: 1530 }}
                            delay="1000"
                            config={config.molasses}
                          >
                            {props => <div>{props.number.toFixed()}</div>}
                          </Spring>
                        ) : (
                          0
                        )}
                      </span>
                    </h2>
                    <h6 className="mb-0">Projects Done</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box p-4 rounded mt-2 mb-2">
                  <div className="float-left mr-4">
                    <img
                      src={AwardWins}
                      alt="AwardWins"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="mb-2">
                      <span className="counter-value mt-4" data-count="950">
                        {this.state.startCount ? (
                          <Spring
                            from={{ number: 0 }}
                            to={{ number: 950 }}
                            delay="1000"
                            config={config.molasses}
                          >
                            {props => <div>{props.number.toFixed()}</div>}
                          </Spring>
                        ) : (
                          0
                        )}
                      </span>
                    </h2>
                    <h6 className="mb-0">Awards Wins</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box p-4 rounded mt-2 mb-2">
                  <div className="float-left mr-4">
                    <img
                      src={HappyClients}
                      alt="HappyClients"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="mb-2">
                      <span className="counter-value mt-4" data-count="2000">
                        {this.state.startCount ? (
                          <Spring
                            from={{ number: 0 }}
                            to={{ number: 2000 }}
                            delay="1000"
                            config={config.molasses}
                          >
                            {props => <div>{props.number.toFixed()}+</div>}
                          </Spring>
                        ) : (
                          0
                        )}
                      </span>
                    </h2>
                    <h6 className="mb-0">Happy Clients</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box p-4 rounded mt-2 mb-2">
                  <div className="float-left mr-4">
                    <img src={Country} alt="Country" className="img-fluid" />
                  </div>
                  <div className="text-white">
                    <h2 className="mb-2">
                      <span className="counter-value mt-4" data-count="350">
                        {this.state.startCount ? (
                          <Spring
                            from={{ number: 0 }}
                            to={{ number: 350 }}
                            delay="1000"
                            config={config.molasses}
                          >
                            {props => <div>{props.number.toFixed()}</div>}
                          </Spring>
                        ) : (
                          0
                        )}
                      </span>
                    </h2>
                    <h6 className="mb-0">Country</h6>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>

        {/* COUNTER END  */}
      </React.Fragment>
    );
  }
}

export default Achievement;
