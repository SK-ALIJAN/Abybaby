import './App.css'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/feedback/error/ErrorBoundary'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { GlobalErrorProvider } from './context/GlobalErrorContext'
import GlobalErrorView from './components/feedback/error/GlobalErrorView'
import ToastProvider from './components/feedback/toast/ToastProvider'
import AppRoutes from './routes/AppRoutes'

function App() {


  return <BrowserRouter>
    <ErrorBoundary> {/* Catches JavaScript runtime/rendering errors */}
      {/* <ToastProvider> Provides global toast/notification system */}
      <ThemeProvider> {/* Provides global theme (dark/light, design tokens) */}
        <LanguageProvider> {/* Provides application-wide i18n / localization */}
          <GlobalErrorProvider> {/* Manages global HTTP/API error state */}
            <GlobalErrorView /> {/* Renders custom UI for critical API errors */}
            <ToastProvider />
            <AppRoutes />
          </GlobalErrorProvider>
        </LanguageProvider>
      </ThemeProvider>
      {/* </ToastProvider> */}
    </ErrorBoundary>
  </BrowserRouter>

}

export default App
