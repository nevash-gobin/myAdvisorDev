
import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

export default () => {
  const directLine = useMemo(() => createDirectLine({ token: '62vtFFB3kyk.SDMvOliF963GN1Hm7MG-7XJ9qLGNKB-Unv1L_1-9dnc' }), []);

  return <ReactWebChat directLine={directLine} userID="myAdvisorBot" />;
};

