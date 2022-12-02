import React from 'react';
import { Navigate } from 'react-router-dom';
import { t } from 'i18next';

import ErrorView from 'components/ErrorView';

import { props, state } from './types';
import { PATH } from 'types';

class ErrorBoundary extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  handler() {
    this.setState({ hasError: false });
    return <Navigate to={PATH.ROOT} />;
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorView
          errorHandler={() => this.handler()}
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
