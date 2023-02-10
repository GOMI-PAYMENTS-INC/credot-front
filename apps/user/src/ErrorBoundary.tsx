import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // TODO: 에러 발생 시 화면
      return (
        <h1>{`어머나 에러가 발생했네요 : ) 크롬 관리자 도구에서 로그를 확인해주세요.`}</h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
