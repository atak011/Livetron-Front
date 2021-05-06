import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import MenuBar from "../../components/MenuBar/MenuBar";
import MobileTopMenuBar from "../../components/MobileTopMenuBar/MobileTopMenuBar";
import ReconnectingNotification from "../../components/ReconnectingNotification/ReconnectingNotification";
import Room from "../../components/Room/Room";
import { styled } from "@material-ui/core/styles";
import useRoomState from "../../hooks/useRoomState/useRoomState";
import Card from "../../components/Card/Card";
import DeviceSelectionScreen from "../../components/PreJoinScreens/DeviceSelectionScreen/DeviceSelectionScreen";
import IntroContainer from "../../components/IntroContainer/IntroContainer";
import MediaErrorSnackbar from "../../components/PreJoinScreens/MediaErrorSnackbar/MediaErrorSnackbar";
import { useAppState } from "../../state";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useLocation, useParams } from "react-router";
import Icon from "@material-ui/core/Icon";
import WbSunny from "@material-ui/icons/WbSunny";
import RoomNameScreen from "../../components/PreJoinScreens/RoomNameScreen/RoomNameScreen";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import {
  getEventProducts,
  highlightProductById,
  postProductNewPrice,
  eventStartByUpdateRequest
} from "./Services/LiveCommerceService";
import EventReferenceList from "./EventReference/EventReferenceList";

export enum Steps {
  roomNameStep,
  deviceSelectionStep
}

const useStyles = makeStyles((theme: any) =>
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
      width: 200,
      height: 400
    },
    cardInnerContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column"
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
      marginLeft: 15
    },
    highlightButton: {
      marginTop: 5
    },
    highlightedButton: {
      border: "4px solid #eee",
      borderColor: "#00ff00"
    },
    discountButton: {
      marginTop: theme.spacing(1)
    }
  })
);

const Main = styled("main")(({ theme }: { theme: Theme }) => ({
  overflow: "hidden",
  paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
  [theme.breakpoints.down("sm")]: {
    paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px` // Leave some space for the mobile header and footer
  }
}));

export default function LiveCommerce(props: { className?: string }) {
  const location = useLocation();
  const livecommerceId = location.pathname.split("/").pop();

  const roomState = useRoomState();

  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { URLRoomName } = useParams();
  const [step, setStep] = useState(Steps.deviceSelectionStep);
  const classes = useStyles();

  const [name, setName] = useState<string>(user?.displayName || "");
  const [highlightedId, setHighlightedId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  const [mediaError, setMediaError] = useState<Error>();

  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName);
      if (user?.displayName) {
        setStep(Steps.deviceSelectionStep);
      }
    }
  }, [user, URLRoomName]);

  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log("Error acquiring local media:");
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);

  const [eventProducts, setEventProducts] = useState<any[]>([]);
  useEffect(() => {
    if (livecommerceId) {
      const getLiveCommerceList = async () => {
        const eventProductsFromServer = await getEventProducts(
          parseInt(livecommerceId)
        );
        console.log("from server", eventProductsFromServer);
        if (eventProductsFromServer.status === "success") {
          setEventProducts(eventProductsFromServer.data);
        }
      };
      getLiveCommerceList();
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
    if (!window.location.origin.includes("twil.io")) {
      window.history.replaceState(
        null,
        "",
        window.encodeURI(`/room/${roomName}${window.location.search || ""}`)
      );
    }
    setStep(Steps.deviceSelectionStep);
  };

  const highlightProduct = async (id: number) => {
    const response = await highlightProductById(id);
    console.log("post highlight", response);
    if (response.status === "success") {
      setHighlightedId(id.toString());
    }
  };
  const [open, setOpen] = React.useState(false);
  const [discountedPrice, setDiscountedPrice] = React.useState({ price: 100 });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDiscount = async (prodId: number) => {
    const response = await postProductNewPrice(prodId, discountedPrice);

    const response2 = await highlightProductById(prodId);
    console.log("post highlight", response);
    if (response.status === "success") {
      setHighlightedId(prodId.toString());
    }
    setOpen(false);
  };

  return (
    <Grid className={clsx(classes.container)}>
      <div className={clsx(classes.startCardContainer)}>
        {roomState === "disconnected" ? (
          <div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <IntroContainer>
                <MediaErrorSnackbar error={mediaError} />
                {step === Steps.roomNameStep && (
                  <RoomNameScreen
                    name={name}
                    roomName={roomName}
                    setName={setName}
                    setRoomName={setRoomName}
                    handleSubmit={handleSubmit}
                  />
                )}

                {step === Steps.deviceSelectionStep && (
                  <DeviceSelectionScreen
                    livecommerceId={livecommerceId}
                    eventName="eventName"
                    setStarted={() => { }}
                    isAdmin={true}
                    name={name}
                    roomName={roomName}
                    setStep={setStep}
                  />
                )}
              </IntroContainer>
              <EventReferenceList />
            </Grid>
          </div>
        ) : (
          <Main>
            <ReconnectingNotification />
            <MobileTopMenuBar />
            <Room isAdmin={true} />
            <MenuBar isAdmin={true} />
          </Main>
        )}
      </div>

      <div className={clsx(classes.highlightCardsContainer)}>
        {eventProducts.map((eventProduct, index) => (
          <Card
            key={index + 1}
            cardTitle={index + 1}
            additionalStyle={clsx(
              eventProducts[index].id.toString() === highlightedId
                ? classes.highlightedButton
                : null,
              classes.highlightedCard
            )}
          >
            <div className={clsx(classes.cardInnerContainer)}>
              <img className={clsx(classes.cardImg)} src={eventProduct.image} />
              <Typography className={clsx(classes.cardText)}>
                Kalan Stok: {eventProduct.stock}
                <br />
                Satılan Adet: {eventProduct.sold}
                <br />
                <br />
                Ürün Adı: {eventProduct.name}
                <br />
                <div className={clsx(classes.prices)}>
                  <div>Fiyat: {eventProduct.price}</div>
                  <div className={clsx(classes.salePrice)}>
                    Satış Fiyat: {eventProduct.salePrice}
                  </div>
                </div>
              </Typography>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Button
                  className={clsx(classes.highlightButton)}
                  variant="contained"
                  fullWidth
                  color="primary"
                  endIcon={<WbSunny />}
                  onClick={() => highlightProduct(eventProduct.id)}
                >
                  Highlight Et
                </Button>

                <Button
                  fullWidth
                  className={clsx(classes.discountButton)}
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  İndirim Yap!
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">İndirim</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      İndirimli Yeni Fiyatı Giriniz.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="new-price"
                      label="Yeni Fiyat"
                      type="number"
                      fullWidth
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDiscountedPrice({
                          price: parseFloat(e.target.value)
                        })
                      }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      İptal
                    </Button>
                    <Button
                      onClick={() => handleDiscount(eventProduct.id)}
                      color="primary"
                    >
                      Kaydet
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </div>
          </Card>
        ))}
      </div>
    </Grid>
  );
}
