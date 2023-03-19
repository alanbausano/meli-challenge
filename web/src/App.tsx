import 'antd/dist/reset.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { SearchedItemsContextProvider } from './context/SearchedItemsContext'
import { ItemDetail } from './features/ItemDetail'
import { ItemsDash } from './features/ItemsDash'
import { SearchBox } from './features/SearchBox'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SearchedItemsContextProvider>
        <Router>
          <Redirect to="/" />
          <Switch>
            <Route exact path="/">
              <SearchBox />
            </Route>
            <Route exact path="/items">
              <SearchBox />
              <ItemsDash />
            </Route>
            <Route path="/items/:id">
              <SearchBox />
              <ItemDetail />
            </Route>
          </Switch>
        </Router>
      </SearchedItemsContextProvider>
    </QueryClientProvider>
  )
}

export default App
