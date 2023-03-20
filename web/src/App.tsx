import 'antd/dist/reset.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { SearchedItemsContextProvider } from './context/SearchedItemsContext'
import { SelectedItemContextProvider } from './context/SelectedItemContext'
import { ItemDetail } from './features/ItemDetail'
import { ItemsDash } from './features/ItemsDash'
import { SearchBox } from './features/SearchBox'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SearchedItemsContextProvider>
        <SelectedItemContextProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <SearchBox />
              </Route>
              <Route exact path="/items">
                <SearchBox />
                <ItemsDash />
              </Route>
              <Route exact path="/items/:id">
                <SearchBox />
                <ItemDetail />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </SelectedItemContextProvider>
      </SearchedItemsContextProvider>
    </QueryClientProvider>
  )
}

export default App
