import { useTheme2 } from '@grafana/ui';
import React from 'react';

/**
 * High order component HOC for wrapping useTheme2 hook to enable use with React class components.
 * @param {Component} Component
 * @returns {Component} The same component, wrapped with the useTheme2 hook from Grafana.
 */
export function withTheme(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme2();
        return <Component {...props} theme={theme} />;
    }
}
