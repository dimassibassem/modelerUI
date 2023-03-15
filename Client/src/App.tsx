import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '../src/pages/404'

const DnDFlow = lazy(() => import('../src/pages/index'))

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Router>
      <Routes>
        <Route index element={<DnDFlow />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </Suspense>
)
export default App
