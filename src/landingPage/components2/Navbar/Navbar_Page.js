import React, { Component, useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Stickey Header
import StickyHeader from "react-sticky-header";

import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import livetronLogo from "../../assets/images/livetronLogo.png";
import clsx from "clsx";

const NavbarPage = props => {
  // prevScrollpos = 0;

  const [navItems, setNavItems] = useState([
    { id: 0, idnm: "home", navheading: "Tanıtım" },
    { id: 1, idnm: "service", navheading: "Ürünler" },
    { id: 2, idnm: "features", navheading: "Yaklaşan Etkinlikler" },
    {
      id: 3,
      idnm: "basket",
      navheading: "SEPET(" + props.basketCount + ")"
    }
  ]);

  useEffect(() => {
    setNavItems([
      { id: 0, idnm: "home", navheading: "Tanıtım" },
      { id: 1, idnm: "service", navheading: "Ürünler" },
      { id: 2, idnm: "features", navheading: "Yaklaşan Etkinlikler" },
      {
        id: 3,
        idnm: "basket",
        navheading: "SEPET(" + props.basketCount + ")"
      }
    ]);
  }, [props.basketCount]);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     navItems: [
  //       { id: 0, idnm: "home", navheading: "Tanıtım" },
  //       { id: 1, idnm: "service", navheading: "Ürünler" },
  //       { id: 2, idnm: "features", navheading: "Yaklaşan Etkinlikler" },
  //       {
  //         id: 3,
  //         idnm: "basket",
  //         navheading: "SEPET(" + this.props.basketCount + ")"
  //       }
  //     ],
  //     isOpen: false,
  //     topPos: "0",
  //     isOpenMenu: false,
  //     navCenterClass: ""
  //   };
  //   this.toggleLine = this.toggleLine.bind(this);
  //   this.handleScrollMenu = this.handleScrollMenu.bind(this);
  // }

  // useEffect(() =>{
  // this.prevScrollpos = window.pageYOffset;
  // window.addEventListener("scroll", this.handleScrollMenu);
  // if (window.innerWidth <= 768) {
  //   this.setState({ navCenterClass: "" });
  // } else {
  //   this.setState({ navCenterClass: "navbar-nav mx-auto navbar-center" });
  // }
  // },[])

  // toggleLine() {
  //   this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  // }

  // toggle = async () => {
  //   await this.setState({ isOpenMenu: !this.state.isOpenMenu });
  // };

  //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
  let targetId = navItems.map(item => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <StickyHeader
        header={
          <Navbar
            className={`navbar navbar-expand-lg fixed-top navbar-custom ${`sticky sticky-light`}`}
            id="navbar"
            style={{ top: 0 }}
          >
            <Container>
              <NavbarBrand href="/">
                <img src={livetronLogo} width="150" height="150" />
              </NavbarBrand>

              <NavbarToggler
                className="navbar-toggler"
                type="button"
                aria-label="Toggle navigation"
              >
                <i className="remixicon-menu-fill" />
              </NavbarToggler>
              <Collapse
                id="navbarCollapse"
                // isOpen={this.state.isOpenMenu}
                navbar
              >
                <ScrollspyNav
                  scrollTargetIds={targetId}
                  scrollDuration="150"
                  headerBackground="false"
                  activeNavClass="active"
                  // navCenterClass={this.state.navCenterClass}
                >
                  <Nav
                    navbar
                    className="navbar-nav mx-auto navbar-center"
                    id="mySidenav"
                  >
                    {navItems.map((item, key) => (
                      <NavItem
                        key={key}
                        className={
                          item.navheading === "Home"
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <NavLink href={"#" + item.idnm} className="nav-link">
                          {" "}
                          {item.navheading}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                </ScrollspyNav>
              </Collapse>
            </Container>
          </Navbar>
        }
        stickyOffset={-100}
      ></StickyHeader>
    </React.Fragment>
  );
};

export default NavbarPage;
