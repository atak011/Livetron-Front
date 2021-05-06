import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import SettingsSystemDaydreamIcon from "@material-ui/icons/SettingsSystemDaydream";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import ListIcon from "@material-ui/icons/List";
import Dashboard from "../../pages/Dashboard/Dashboard";
import LiveCommerce from "../../pages/LiveCommerce/LiveCommerce";
import LivecommerceForm from "../../pages/LiveCommerce/LivecommerceForm/LivecommerceForm";
import JoinLiveCommerce from "../../pages/JoinLiveCommerce/JoinLiveCommerce";
import EventRefLink from "../../pages/LiveCommerce/EventReference/EventReference";
import LivecommerceList from "../../pages/LivecommerceList/LivecommerceList";
import LivecommerceEditForm from "../../pages/LiveCommerce/LivecommerceForm/LivecommerceEditForm";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  livetronText: {
    padding: 16
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    fontSize: 20,
    padding: 20,
    color: "white",
    fontWeight: "bold"
  },
  liveCommerceText: {
    paddingTop: 5
  },
  sampleText: {
    color: "white"
  }
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography variant="h6" className={clsx(classes.livetronText)}>
        LIVETRON
      </Typography>

      <Divider />
      <List>
        <ListItem button component={Link} to={"/dashboard"}>
          <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to={"/live-commerces"}>
          <ListItemIcon>{<ListIcon />}</ListItemIcon>
          <ListItemText primary="Etkinlik Listesi" />
        </ListItem>

        {/* <ListItem button component={Link} to={"/products-and-catalogs"}>
          <ListItemIcon>{<LocalOfferIcon />}</ListItemIcon>
          <ListItemText primary="Ürünler & Kataloglar" />
        </ListItem>

        <ListItem button component={Link} to={"/sales-channels"}>
          <ListItemIcon>{<StorefrontIcon />}</ListItemIcon>
          <ListItemText primary="Satış Kanalları" />
        </ListItem>

        <ListItem button component={Link} to={"/orders"}>
          <ListItemIcon>{<ShoppingCartIcon />}</ListItemIcon>
          <ListItemText primary="Siparişler" />
        </ListItem>

        <ListItem button component={Link} to={"/customers"}>
          <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
          <ListItemText primary="Müşteriler" />
        </ListItem>

        <ListItem button component={Link} to={"/integration"}>
          <ListItemIcon>{<SettingsSystemDaydreamIcon />}</ListItemIcon>
          <ListItemText primary="Entegrasyon" />
        </ListItem> */}

        <Divider />
        <ListItem button component={Link} to={"/live-commerce-form"}>
          <ListItemText
            className={clsx(classes.liveCommerceText)}
            primary="New Live Commerce"
          />
        </ListItem>
        <ListItem button component={Link} to={"/event-reference-link"}>
          <ListItemText
            className={clsx(classes.liveCommerceText)}
            primary="Event Reference Link"
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/dashboard" render={() => <Dashboard />} />
            <Route
              exact
              path="/live-commerces"
              render={() => <LivecommerceList />}
            />
            <Route
              exact
              path="/live-commerces/:id"
              render={() => <LiveCommerce />}
            />
            {/* <Route
              path="/products-and-catalogs"
              render={() => (
                <div className={clsx(classes.sampleText)}>
                  Ürünler & Kataloglar
                </div>
              )}
            />
            <Route
              path="/sales-channels"
              render={() => (
                <div className={clsx(classes.sampleText)}>Satış Kanalları</div>
              )}
            />
            <Route
              path="/orders"
              render={() => (
                <div className={clsx(classes.sampleText)}>Siparişler</div>
              )}
            />
            <Route
              path="/customers"
              render={() => (
                <div className={clsx(classes.sampleText)}>Müşteriler</div>
              )}
            />
            <Route
              path="/integration"
              render={() => (
                <div className={clsx(classes.sampleText)}>Entegrasyon</div>
              )}
            /> */}
            <Route
              path="/settings"
              render={() => (
                <div className={clsx(classes.sampleText)}>Ayarlar</div>
              )}
            />
            <Route
              path="/join-live-commerce"
              render={() => <JoinLiveCommerce />}
            />
            <Route
              path="/live-commerce-form"
              render={() => <LivecommerceForm />}
            />
            <Route
              path="/live-commerce-edit-form/:id"
              component={LivecommerceEditForm}
            />
            <Route
              path="/event-reference-link"
              render={() => <EventRefLink />}
            />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default ResponsiveDrawer;
