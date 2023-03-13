import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Flow from '../src/pages/dev/flow'
import EasyConnectExample from '../src/pages/dev/index'
import NotFound from '../src/pages/404'

const DnDFlow = lazy(() => import('../src/pages/index'))

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Router>
      <Routes>
        <Route index element={<DnDFlow />} />
        <Route path='dev/flow' element={<Flow />} />
        <Route path='dev' element={<EasyConnectExample />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </Suspense>
)
export default App
