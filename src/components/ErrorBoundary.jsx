import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary capturó un error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100svh] w-full bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Algo no salió bien</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Ocurrió un inconveniente temporal en la interfaz. Haz clic abajo para reiniciar la aplicación limpiamente.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={18} /> Reiniciar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
