import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import ChatWindow from '../ChatWindow/ChatWindow';
import ParticipantList from '../ParticipantList/ParticipantList';
import MainParticipant from '../MainParticipant/MainParticipant';
import useChatContext from '../../hooks/useChatContext/useChatContext';

const useStyles = makeStyles((theme: Theme) => {
  const totalMobileSidebarHeight = `${theme.sidebarMobileHeight +
    theme.sidebarMobilePadding * 2 +
    theme.participantBorderWidth}px`;
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatWindowOpen: {
      height: 400,
      width: '100%',
    },
  };
});

export default function Room(props: any) {
  const { isAdmin } = props;
  const classes = useStyles();
  const { isChatWindowOpen } = useChatContext();

  const conditionalStyle = {
    video: {
      height: 500,
      width: '100%',
    },
  }

  return (
    <div className={clsx(classes.container)}>
      <div className={clsx(conditionalStyle.video)} >
        <MainParticipant />
      </div>
      <ParticipantList isAdmin={isAdmin} />
      <div className={isChatWindowOpen ? classes.chatWindowOpen : ""}>
        <ChatWindow />
      </div>
    </div>
  );
}
