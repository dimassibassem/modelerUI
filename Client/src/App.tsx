import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/404'
import Loading from '@/components/Loading'

const DnDFlow = lazy(() => import('@/pages/index'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Routes>
        <Route index element={<DnDFlow />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </Suspense>
)
export default App
