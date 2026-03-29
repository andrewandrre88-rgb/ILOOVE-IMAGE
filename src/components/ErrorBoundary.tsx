import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try again later.";
      
      try {
        if (this.state.error?.message) {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error && parsedError.error.includes('Missing or insufficient permissions')) {
            errorMessage = "You don't have permission to perform this action. Please make sure you're signed in with the correct account.";
          }
        }
      } catch (e) {
        // Not a JSON error message, use default or the error message itself
        if (this.state.error?.message) {
          errorMessage = this.state.error.message;
        }
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-6">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Application Error</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <RefreshCcw className="h-4 w-4" />
                <span>Refresh Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-gray-200 transition-all"
              >
                <Home className="h-4 w-4" />
                <span>Go to Homepage</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
