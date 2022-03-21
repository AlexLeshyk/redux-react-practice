import { Component, ErrorInfo } from "react";
import ErrorMessage from "../errorMessage/error";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
