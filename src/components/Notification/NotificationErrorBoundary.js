import React from "react";
// Error Boundary Component
export class NotificationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Notification Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-notification">
          <p>Something went wrong with notifications. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
  
  
