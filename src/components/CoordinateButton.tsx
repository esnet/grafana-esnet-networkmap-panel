import React, { useCallback } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { PubSub } from './lib/pubsub.js';

export const CoordinateButton: React.FC<StandardEditorProps> = ({ value, onChange, item }) => {
  const getAndSetMapDefaults = useCallback((e: React.SyntheticEvent) => {
    PubSub.publish('getMapCenterAndZoom');
  }, []);

  return <button onClick={getAndSetMapDefaults}>{item.settings?.label || 'Set Options'}</button>;
};
