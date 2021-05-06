import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

//Import Image
import heroBgImg from "../../assets/images/hero-5-bg.jpg";

import bottomShap from "../../assets/images/home-5-bottom-shape.png";
import CountDownComponent from "../../../components/CountDownComponent/CountDownComponent";
import "@google/model-viewer";

import JoinLiveCommerce from "../../../pages/JoinLiveCommerce/JoinLiveCommerce";
import {
  Button,
  ButtonBase,
  Card,
  createStyles,
  makeStyles,
  Typography
} from "@material-ui/core";
import clsx from "clsx";

import koltuk from "../../../icons/koltuk.glb";
import laptop from "../../../icons/laptop.glb";
import phone from "../../../icons/phone.glb";
import sofa from "../../../icons/sofa.glb";
import { createOrder } from "../../../pages/LiveCommerce/Services/LiveCommerceService";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: "#293245",
      flexDirection: "column"
    },
    startCardContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center"
    },
    highlightCardsContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      marginTop: 50
    },
    highlightedCard: {
      display: "flex",
      flex: 1,
      width: 200,
      height: 465,
      alignItems: "center",
      padding: 10
    },
    selectedCard: {
      border: "2px solid rgba(255,0,0, 0.6)"
    },
    cardInnerContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center"
    },
    cardImg: {
      width: 175,
      height: 175
    },
    cardText: {
      fontSize: 12
    },
    prices: {
      marginTop: 5,
      display: "flex",
      flex: 1,
      flexDirection: "row"
    },
    salePrice: {
      fontSize: 21,
      marginTop: 10
    },
    highlightButton: {
      marginTop: 5
    },
    alignCenter: {
      alignItems: "center"
    },
    highlightedCardContainer: {
      display: "flex",
      flex: 1,
      marginTop: 35,
      flexDirection: "row"
    }
  })
);

const Section = props => {
  const {
    isDisconnected,
    isStarted,
    setStarted,
    eventInfo,
    highlightedProduct,
    basketCount,
    setBasketCount,
    soldProductCount,
    leftStockCount,
    visitorCount
  } = props;
  const classes = useStyles();
  const [isJoinClicked, setJoinClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const onJoinClicked = () => {
    setTimeout(() => {
      setJoinClicked(true);
    }, [4750]);
  };

  const onAddedToBasket = async productId => {
    setBasketCount(basketCount + 1);
    const response = await createOrder(eventInfo.id, productId);
  };

  let model = sofa;
  if (highlightedProduct && highlightedProduct["3d_and"]) {
      model = highlightedProduct["3d_and"];
      console.log(highlightedProduct["conf"].color);
  }

  return (
    <React.Fragment>
      <section
        className="hero-5-bg position-relative"
        id="home"
        style={{ background: `url(${heroBgImg}) center center` }}
      >
        <div
          style={{
            background: `linear-gradient(to right, #6d62fd, ${
              highlightedProduct ? highlightedProduct["conf"].color : "red"
            })`,
            opacity: 0.85,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%"
          }}
        />
        <Container className="align-items-center">
          <Row className="justify-content-center">
            <Col lg={12}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <div
                  className="text-center"
                  style={{
                    flex: 0.9,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <h1 className="text-white hero-4-title font-weight-medium">
                    {eventInfo?.name?.toUpperCase()}
                  </h1>
                  {/* <p className="text-white-50 w-75 mx-auto mb-5">
                      Eğer Promote True ise referans Adı 
                  </p> */}
                </div>
                {highlightedProduct && (
                  <img
                    src={highlightedProduct.brand}
                    opacity={2}
                    style={{
                      flex: 0.1,
                      width: 150,
                      height: 150
                    }}
                  />
                )}
              </div>
            </Col>
            {!isStarted && (
              <CountDownComponent endTime={eventInfo.start_date} />
            )}
          </Row>
          <Row>
            <Col
              lg={(isDisconnected || isStarted) && highlightedProduct ? 9 : 12}
            >
              {(isDisconnected || isStarted) && (
                <div
                  style={{
                    fontSize: 25,
                    color: "white",
                    display: "flex",
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <div>Anlık İzleyici: {visitorCount}</div>
                  {highlightedProduct && (
                    <>
                      <div
                        style={{ fontSize: 20, color: "white", marginLeft: 15 }}
                      >
                        Satılan Ürün Sayısı: {soldProductCount}
                      </div>

                      <div
                        style={{ fontSize: 20, color: "white", marginLeft: 15 }}
                      >
                        Kalan Stok Sayısı: {leftStockCount}
                      </div>
                    </>
                  )}
                </div>
              )}
              <JoinLiveCommerce
                onJoinClicked={onJoinClicked}
                setStarted={setStarted}
              />
            </Col>

            {(isDisconnected || isStarted) && highlightedProduct && (
              <Col lg={3} className={classes.highlightedCardContainer}>
                <Card
                  className={clsx([
                    classes.highlightedCard,
                    classes.selectedCard
                  ])}
                >
                  <div className={clsx(classes.cardInnerContainer)}>
                    <img
                      className={clsx(classes.cardImg)}
                      src={highlightedProduct.image}
                    />
                    <Typography className={clsx(classes.cardText)}>
                      <br />
                      {highlightedProduct.attributes.name}
                      <br />
                      <div className={clsx(classes.prices)}>
                        <div className={clsx(classes.salePrice)}>
                          {highlightedProduct.price + "TL"}
                        </div>
                      </div>
                    </Typography>
                    <div>
                      {highlightedProduct["3d_and"] && (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowModal(!showModal);
                          }}
                          style={{ marginTop: 15 }}
                        >
                          Ürünümüzü AR olarak deneyin
                        </Button>
                      )}
                    </div>

                    <div>
                      <Button
                        disabled={leftStockCount == 0}
                        variant="outlined"
                        onClick={() => onAddedToBasket(highlightedProduct.id)}
                        style={{ marginTop: 15 }}
                      >
                        {leftStockCount == 0 ? "Tükendi" : "Sepete Ekle"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            )}
          </Row>

          {showModal && (
            <model-viewer
              style={{ width: 500, height: 500 }}
              src={model}
              alt="A 3D model of an astronaut"
              auto-rotate
              camera-controls
              magic-leap
              ar
            ></model-viewer>
          )}
        </Container>
        <div className="container-fluid">
          <Row>
            <div className="home-bottom-shape">
              <img
                src={bottomShap}
                alt="bottomShap"
                className="img-fluid mx-auto d-block"
              />
            </div>
          </Row>
        </div>
      </section>

      {/* HERO END  */}
    </React.Fragment>
  );
};

export default Section;
