import React, { useState, useEffect, FormEvent } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export enum Steps {
  roomNameStep,
  deviceSelectionStep,
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
  })
);

interface RoomNameScreenProps {
  isAdmin: boolean;
}

export default function PreJoinScreens({ isAdmin }: RoomNameScreenProps) {

}
