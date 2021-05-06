import React, { Component, useEffect, useState } from "react";
import NavbarPage from "../../components2/Navbar/Navbar_Page";
import Section from "./section";
import Services from "../../components2/Services/services";
import Features from "../../components2/Features/features";
import Achievement from "../../components2/Achievement/achievements";
import Clients from "../../components2/Clients/clients";
import Posts from "../../components2/Posts/posts";
import Footer from "../../components2/Footer/footer";

import Confetti from "react-confetti";
import pusher from "../../../utils/pusher";

import useChatContext from "../../../hooks/useChatContext/useChatContext";
import useVideoContext from "../../../hooks/useVideoContext/useVideoContext";
import { useAppState } from "../../../state";
import { useLocation } from "react-router-dom";
import {
  getShowBySlug,
  getUpcomingEvents
} from "../../../pages/LiveCommerce/Services/LiveCommerceService";

const Index = props => {
  const query = new URLSearchParams(props.location?.search);
  const refValue = query.get("ref");
  const [pos, setPos] = useState(document.documentElement.scrollTop);
  const [imglight, setImglight] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [isDisconnected, setDisconnected] = useState(false);
  const [isStarted, setStarted] = useState(false);
  const [isDiscount, setDiscount] = useState(false);
  const [slugInfo, setSlugInfo] = useState([]);
  const [upcomingInfo, setUpcomingInfo] = useState([]);
  const [highlightedProduct, setHighlightedProduct] = useState();
  const [basketCount, setBasketCount] = useState(0);
  const [soldProductCount, setSoldProductCount] = useState(0);
  const [leftStockCount, setLeftStockCount] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);
  const [isStickyNav, setIsStickyNav] = useState(
    document.documentElement.scrollTop
  );
  const { getToken } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const { connect: videoConnect } = useVideoContext();
  const location = useLocation();

  var res1 = location.pathname.substring(12, location.pathname.length);
  var res2 = location.search;
  var result = res1 + res2;

  useEffect(() => {
    const channel = pusher.subscribe("event");
    channel.bind("event_start", data => {
      handleJoin();
    });

    channel.bind("stock_count", data => {
      setLeftStockCount(data.stockCount);
      setSoldProductCount(data.sold);
    });

    channel.bind("visitor_added", data => {
      setVisitorCount(data.visitorCount);
    });

    channel.bind("event_close", data => {
      setDisconnected(true);
    });

    channel.bind("product_highlight", data => {
      setHighlightedProduct(data.product);
      setLeftStockCount(null);
      setSoldProductCount(null);
    });

    channel.bind("product_discount", data => {
      setDiscount(true);
    });

    const getShowBySlugFromServer = async () => {
      const response = await getShowBySlug(result);
      console.log({ slugInfo: response });
      setSlugInfo(response);
    };

    const getUpcomingFromServer = async () => {
      const response = await getUpcomingEvents();
      setUpcomingInfo(response.data);
    };

    getShowBySlugFromServer();
    getUpcomingFromServer();

    window.addEventListener("scroll", scrollNavigation, true);

    scrollNavigation();

    return () => {
      window.removeEventListener("scroll", scrollNavigation, true);
    };
  }, []);

  useEffect(() => {
    if (isDiscount) {
      setTimeout(() => {
        setDiscount(false);
      }, [4500]);
    }
  }, [isDiscount]);

  const handleJoin = () => {
    setStarted(true);
    console.log({ slugInfo: slugInfo.name });
    getToken("KATILIMCI", "eventName").then(token => {
      videoConnect(token);
      process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== "true" &&
        chatConnect(token);
    });
  };

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;

    if (scrollup > pos) {
      setNavClass("darkheader");
      setImglight(false);
      setIsStickyNav(false);
    } else if (window.innerWidth <= 768) {
      setNavClass("darkheader");
      setImglight(false);
      setIsStickyNav(false);
    } else {
      setNavClass("");
      setImglight(true);
      setIsStickyNav(true);
    }
  };

  return (
    <React.Fragment>
      {isDiscount && <Confetti width={1920} height={1080} />}
      {/* Importing Navbar */}

      <NavbarPage
        navclass={navClass}
        imglight={imglight}
        isStickyNav={isStickyNav}
        basketCount={basketCount}
      />

      {/* import section */}
      <Section
        visitorCount={visitorCount}
        soldProductCount={soldProductCount}
        leftStockCount={leftStockCount}
        setBasketCount={setBasketCount}
        basketCount={basketCount}
        highlightedProduct={highlightedProduct}
        eventInfo={slugInfo}
        isDisconnected={isDisconnected}
        isStarted={isStarted}
        setStarted={setStarted}
      />

      <Posts
        setBasketCount={setBasketCount}
        basketCount={basketCount}
        products={slugInfo.products}
      />

      {/* import services */}
      <Services upcomingInfo={upcomingInfo} />
    </React.Fragment>
  );
};

export default Index;
