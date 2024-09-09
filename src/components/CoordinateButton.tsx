import React, { useCallback } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { PubSub } from 'components/lib/pubsub.js';
import { signals } from '../signals.js';

export const CoordinateButton: React.FC<StandardEditorProps> = ({ value, onChange, item }) => {
  const getAndSetMapDefaults = useCallback((e: React.SyntheticEvent) => {
    PubSub.publish(signals.REQUEST_MAP_CENTER_AND_ZOOM);
  }, []);

  return <button onClick={getAndSetMapDefaults}>{item.settings?.label || 'Set Options'}</button>;
};
