import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    if (error) {
      console.log(error.toString())
    }

    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <h1>Something went wrong</h1>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
