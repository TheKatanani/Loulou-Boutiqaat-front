import { Component } from "react";
import FallbackUI from "./FallbackUI";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log('Error occurred within the ErrorBoundary', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // return <p>Something went wrong.</p>
      return <FallbackUI/>
    }
    return this.props.children;
  }
}
export default ErrorBoundary