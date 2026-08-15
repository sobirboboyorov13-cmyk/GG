import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-50/50">
          <div className="w-full max-w-lg rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-sm text-center space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {this.props.fallbackTitle || 'Component Error Encountered'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A localized runtime error occurred in this view. The rest of the application remains functional.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto max-h-36">
                <span className="text-rose-400 font-bold">{this.state.error.name}: </span>
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="error-boundary-retry-btn"
                onClick={this.handleReset}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 active:scale-95 transition cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try Again</span>
              </button>

              <button
                id="error-boundary-home-btn"
                onClick={() => {
                  this.handleReset();
                  window.location.reload();
                }}
                className="flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition cursor-pointer min-h-[40px]"
              >
                <Home className="h-4 w-4" />
                <span>Reload App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
