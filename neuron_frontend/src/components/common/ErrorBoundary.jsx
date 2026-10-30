import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl text-brand-ink dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-4 text-lg text-brand-body">Refresh the page to try again.</p>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <pre className="mt-4 p-4 text-xs text-red-600 bg-red-50 dark:bg-red-950/40 rounded-xl text-left overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
