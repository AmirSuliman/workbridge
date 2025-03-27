'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong.
          </h1>
          <div className="flex gap-4 flex-wrap items-center mt-4">
            <Button name="Refresh" onClick={this.handleRetry} />
            {/* <p>or</p>
            <Button name="Go back" onClick={this.handleBack} /> */}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
