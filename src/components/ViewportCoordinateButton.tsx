import React, { useCallback } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { PubSub } from 'components/lib/pubsub.js';
import { signals } from '../signals.js';

export const ViewportCoordinateButton: React.FC<StandardEditorProps> = ({ value, onChange, item }) => {
  const getAndSetMapDefaults = useCallback((e: React.SyntheticEvent) => {
    PubSub.publish(signals.REQUEST_VIEWPORT);
  }, []);

  return <button onClick={getAndSetMapDefaults}>{item.settings?.label || 'Set Viewport Coordinates'}</button>;
};
