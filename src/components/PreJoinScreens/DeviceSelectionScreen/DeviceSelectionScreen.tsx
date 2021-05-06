import React, { useState } from 'react';
import { makeStyles, Typography, Grid, Button, Theme, Hidden } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { Steps } from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import clsx from "clsx";
import { eventStartByUpdateRequest } from '../../../pages/LiveCommerce/Services/LiveCommerceService';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop: {
    marginTop: "1em"
  },
  deviceButton: {
    width: "100%",
    border: "2px solid #aaa",
    margin: "1em 0"
  },
  localPreviewContainer: {
    paddingRight: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2.5em"
    }
  },
  joinButtons: {
    display: "flex",
    width: "100%"
  },
  mobileButtonBar: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      margin: "1.5em 0 1em"
    }
  },
  mobileButton: {
    padding: "0.8em 0",
    margin: 0
  },
  startLiveText: {
    marginBottom: 15
  },
  joinButtonForNotAdmins: {
    width: 250,
  }
}));

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setStep: (step: Steps) => void;
  isAdmin: boolean;
  setStarted: (val: boolean) => void;
  eventName: string;
  livecommerceId: string | undefined;
}

export default function DeviceSelectionScreen({ setStep, isAdmin, setStarted, eventName, livecommerceId }: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const { getToken, isFetching } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const {
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting
  } = useVideoContext();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

  const triggerStartEvent = async (id: string | undefined) => {
    const response = await eventStartByUpdateRequest(id);
    console.log("PUT", response);
  };

  const handleJoin = async () => {
    await triggerStartEvent(livecommerceId);
    console.log({ eventName });

    setStarted(true);
    getToken(isAdmin ? "TEST SUNUCU" : "TEST KATILIMCI", eventName).then(token => {
      videoConnect(token);
      process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
    });
  };

  if (isFetching || isConnecting) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ height: "100%" }}
      >
        <div>
          <CircularProgress variant="indeterminate" />
        </div>
        <div>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Yayına Bağlanılıyor...
          </Typography>
        </div>
      </Grid>
    );
  }

  return (
    <>
      {isAdmin && (
        <Typography className={clsx(classes.startLiveText)} variant="h5">
          Start Live Commerce
        </Typography>
      )}

      <Grid container justify="center">
        <Grid item md={7} sm={12} xs={12}>
          {isAdmin && (
            <div className={classes.localPreviewContainer}>
              <LocalVideoPreview identity="SUNUCU" />
            </div>
          )}
          {isAdmin && (
            <div className={classes.mobileButtonBar}>
              <Hidden mdUp>
                <ToggleAudioButton
                  className={classes.mobileButton}
                  disabled={disableButtons}
                />
                <ToggleVideoButton
                  className={classes.mobileButton}
                  disabled={disableButtons}
                />
              </Hidden>
              <SettingsMenu mobileButtonClass={classes.mobileButton} />
            </div>
          )}
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Grid container direction="column" justify="center">
            {isAdmin && (
              <Hidden smDown>
                <ToggleAudioButton
                  className={classes.deviceButton}
                  disabled={disableButtons}
                />
                <ToggleVideoButton
                  className={classes.deviceButton}
                  disabled={disableButtons}
                />
              </Hidden>
            )}

            <Button
              variant="contained"
              color="primary"
              data-cy-join-now
              onClick={handleJoin}
              disabled={disableButtons}
              className={classes.joinButtonForNotAdmins}
              style={{ visibility: isAdmin ? 'visible' : 'hidden' }}
            >
              JOIN NOW
            </Button>

          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
