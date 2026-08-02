import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional label shown only in dev/console, to identify which boundary caught the error. */
  name?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Prevents a single broken component (a browser extension conflicting with
 * the page, a corrupted localStorage value, an unexpected null somewhere,
 * etc.) from crashing and blanking the ENTIRE site. Without this, any
 * uncaught render error anywhere in the tree unmounts everything below —
 * or the whole app — with no visible error, which looks exactly like a
 * "white disaster" to a real visitor.
 *
 * Each critical section of the page (Navbar, Hero, Footer, floating
 * widgets, etc.) should get its own boundary so a failure in one section
 * can't take down the rest of the page with it.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.name ? `: ${this.props.name}` : ""}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render nothing rather than a broken subtree — the rest of the page
      // keeps working instead of the whole app going blank.
      return null;
    }
    return this.props.children;
  }
}