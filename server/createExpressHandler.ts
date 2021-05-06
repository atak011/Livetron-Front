import 'dotenv/config';
import { Request, Response } from 'express';
import { ServerlessContext, ServerlessFunction } from './types';
import Twilio from 'twilio';

  const  TWILIO_ACCOUNT_SID = "ACe67bc3bc3dea1b0a074183ca295d87e3";
  const  TWILIO_API_KEY_SID = "SKf743ce082d6ae815b9c56d169c4db87e";
  const  TWILIO_API_KEY_SECRET = "fxaNpEB7SO2B8iA7eYyvLJT3xYbHwsSD";
  const  TWILIO_CONVERSATIONS_SERVICE_SID = "IS3c5de1aa61df44c4a8898bb0dbeee031";
  const  REACT_APP_TWILIO_ENVIRONMENT = "";


const twilioClient = Twilio(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
  accountSid: TWILIO_ACCOUNT_SID,
  region: REACT_APP_TWILIO_ENVIRONMENT === 'prod' ? undefined : REACT_APP_TWILIO_ENVIRONMENT,
});

const context: ServerlessContext = {
  ACCOUNT_SID: TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
  ROOM_TYPE: 'group',
  CONVERSATIONS_SERVICE_SID: TWILIO_CONVERSATIONS_SERVICE_SID,
  getTwilioClient: () => twilioClient,
};

export function createExpressHandler(serverlessFunction: ServerlessFunction) {
  return (req: Request, res: Response) => {
    serverlessFunction(context, req.body, (_, serverlessResponse) => {
      const { statusCode, headers, body } = serverlessResponse;

      res
        .status(statusCode)
        .set(headers)
        .json(body);
    });
  };
}
