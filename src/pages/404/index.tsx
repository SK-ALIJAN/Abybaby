
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { ROUTES } from '../../routes/routePaths';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl shadow-slate-200/50 max-w-md w-full border border-slate-100">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-2">404</h1>
        <p className="text-xl font-semibold text-slate-800 mb-4">Page Not Found</p>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Home className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
