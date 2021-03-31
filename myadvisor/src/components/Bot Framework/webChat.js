
import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

export default () => {
  const directLine = useMemo(() => createDirectLine({ token: 'XFSQFxuEYr0.wmewXCmoOG1b5yq7vvu_LBc2EycCMqnrjdb7yxGytvg' }), []);

  return <ReactWebChat directLine={directLine} userID="myAdvisor" />;
};