/* eslint-disable import/no-anonymous-default-export */

import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import './webChatStyle.css';

export default () => {

  //Azure Direct Line Token:
  const token = "62vtFFB3kyk.SDMvOliF963GN1Hm7MG-7XJ9qLGNKB-Unv1L_1-9dnc";

  const directLine = useMemo(() => createDirectLine({ token}),[]);
  
  
  return <ReactWebChat className="style" directLine={directLine} userID="myAdvisorBot" />;
  
};

