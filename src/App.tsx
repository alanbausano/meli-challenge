import 'antd/dist/reset.css'

import { QueryClient, QueryClientProvider } from 'react-query'

import { SearchBox } from './features/SearchBox'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBox />
    </QueryClientProvider>
  )
}

export default App
