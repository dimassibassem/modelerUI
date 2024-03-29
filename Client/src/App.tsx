import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/404'
import Loading from '@/components/Loading'
import '@/translation/i18'
import 'react-tooltip/dist/react-tooltip.css'
import 'reactflow/dist/style.css'
import 'react-contexify/ReactContexify.css'
import Process from '@/pages/Process'

const DnDFlow = lazy(() => import('@/pages/modeler'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Routes>
        <Route index element={<Process />} />
        <Route path="/modeler" element={<DnDFlow />} />
        <Route path="/modeler/:id" element={<DnDFlow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </Suspense>
)
export default App
