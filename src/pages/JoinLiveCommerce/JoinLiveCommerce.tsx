import React, { useEffect, useState, FormEvent } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ReconnectingNotification from '../../components/ReconnectingNotification/ReconnectingNotification';
import MenuBar from '../../components/MenuBar/MenuBar';
import MobileTopMenuBar from '../../components/MobileTopMenuBar/MobileTopMenuBar';
import Room from '../../components/Room/Room';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import { styled } from '@material-ui/core/styles';
import DeviceSelectionScreen from '../../components/PreJoinScreens/DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../../components/IntroContainer/IntroContainer';
import MediaErrorSnackbar from '../../components/PreJoinScreens/MediaErrorSnackbar/MediaErrorSnackbar';
import RoomNameScreen from '../../components/PreJoinScreens/RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import pusher from "../../utils/pusher";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import { useLocation, useParams } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flex: 1,
            width: '100%',
            height: '100%',
        },
        startCardContainer: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
        },
    })
);

const Main = styled("main")(({ theme }: { theme: Theme }) => ({
    overflow: "hidden",
    paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
    [theme.breakpoints.down("sm")]: {
        paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px` // Leave some space for the mobile header and footer
    }
}));

export enum Steps {
    roomNameStep,
    deviceSelectionStep
}

const JoinLiveCommerce = (props: any) => {
    const location = useLocation();
    const livecommerceId = location.pathname.split("/").pop();
    const { className, onJoinClicked, setStarted } = props;
    const roomState = useRoomState();
    const { isChatWindowOpen } = useChatContext();
    const { user } = useAppState();
    const { URLRoomName } = useParams();
    const [step, setStep] = useState(Steps.deviceSelectionStep);
    const classes = useStyles();
    const { getToken, isFetching } = useAppState();
    const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
    const { connect: chatConnect } = useChatContext();

    const [name, setName] = useState<string>(user?.displayName || "");
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

    return (
        <Grid className={clsx(classes.container)}>
            <div className={clsx(classes.startCardContainer)}>
                {roomState === "disconnected" ? (
                    <div>
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
                            <DeviceSelectionScreen livecommerceId={livecommerceId} eventName="eventName" setStarted={setStarted} isAdmin={false} name={name} roomName={roomName} setStep={setStep} />
                        )}
                    </div >
                ) : (
                    <Main>
                        <ReconnectingNotification />
                        <MobileTopMenuBar />
                        <Room isAdmin={false} />
                        <MenuBar isAdmin={false} />
                    </Main>
                )}
            </div>
        </Grid>
    );
}

export default JoinLiveCommerce;