import React from 'react';
import { t } from 'i18next';

import ErrorView from 'components/ErrorView';

import { props, state } from './types';

class ErrorBoundary extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorView
          errorHandler={() => this.setState({ hasError: false })}
          title={t('boundary.title')}
          description={t('boundary.description')}
          firstTextPart={t('boundary.firstText')}
          secondTextPart={t('boundary.secondText')}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
