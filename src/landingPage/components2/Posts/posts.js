import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Section Title
import SectionTitle from "../Common/SectionTitle";

import { Link } from "react-router-dom";

//Images
import Image1 from "../../assets/images/post/img-1.jpg";
import Image2 from "../../assets/images/post/img-2.jpg";
import Image3 from "../../assets/images/post/img-3.jpg";
import postBG from "../../assets/images/post-bg.png";
import {
  Button,
  Card,
  createStyles,
  makeStyles,
  Typography
} from "@material-ui/core";
import clsx from "clsx";

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
      height: 400,
      alignItems: "center",
      padding: 10
    },
    selectedCard: {
      border: "2px solid rgba(109,98,253, 0.5)"
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
      alignItems: "center",
      justifyContent: "center"
    }
  })
);

const Posts = props => {
  const { products, basketCount, setBasketCount } = props;
  const classes = useStyles();

  const onAddedToBasket = () => {
    setBasketCount(basketCount + 1);
  };

  return (
    <React.Fragment>
      {/* LETEST POST START */}
      <section
        className="section bg-light"
        id="news"
        style={{ background: `url(${postBG}) center center` }}
      >
        <Container>
          <SectionTitle
            title="Tanıtılan Ürünler"
            description="Burada şuan tanıtılan ve yayında tanıtılacak olan ürünlerimizi görebilirsiniz."
          />
          <Row className="row">
            {products?.map((product, index) => (
              <Col lg={3} className={clsx(classes.alignCenter)}>
                <Card
                  cardTitle={index + 1}
                  className={clsx([
                    classes.highlightedCard,
                    index == 0 ? classes.selectedCard : null
                  ])}
                >
                  <div className={clsx(classes.cardInnerContainer)}>
                    <img
                      className={clsx(classes.cardImg)}
                      src={
                        product.image
                          ? product.image
                          : "https://akinon.akinoncdn.com/products/2020/11/16/3/6f919113-708a-489b-ae69-86701633603c.jpg"
                      }
                    />
                    <Typography className={clsx(classes.cardText)}>
                      Kalan Stok: {product.stock}
                      <br />
                      <br />
                      {product.name}
                      <br />
                      <div className={clsx(classes.prices)}>
                        <div className={clsx(classes.salePrice)}>
                          {product.price + "TL"}
                        </div>
                      </div>
                    </Typography>

                    <div>
                      <Button
                        variant="outlined"
                        onClick={onAddedToBasket}
                        style={{ marginTop: 15 }}
                      >
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* LETEST POST END */}
    </React.Fragment>
  );
};

export default Posts;
