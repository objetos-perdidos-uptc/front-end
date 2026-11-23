import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ClaimsPage } from '@/features/claims/pages/ClaimsPage'
import { CreateClaimPage } from '@/features/claims/pages/CreateClaimPage'
import { CreateReportPage } from '@/features/reports/pages/CreateReportPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import { ReportsPage } from '@/features/reports/pages/ReportsPage'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RouteError } from './pages/RouteError'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage />, errorElement: <RouteError /> },
  { path: '/register', element: <RegisterPage />, errorElement: <RouteError /> },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/reports', element: <ReportsPage /> },
          { path: '/reports/new', element: <CreateReportPage /> },
          { path: '/reports/:id', element: <ReportDetailPage /> },
          { path: '/claims', element: <ClaimsPage /> },
          { path: '/claims/new', element: <CreateClaimPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
