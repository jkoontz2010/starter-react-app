import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { AppBar, CssBaseline, Link, Toolbar } from "@mui/material";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { JobPositions } from "./job-positions";
import { JobDetail } from "./job-detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <AppBar position="relative">
        <Toolbar>
          <Link component={RouterLink} to="/jobs" color="inherit">
            View Jobs
          </Link>
        </Toolbar>
      </AppBar>
        <CssBaseline />
        <Routes>
          <Route path="/jobs" element={<JobPositions />} />

          <Route path="jobs/:id" element={<JobDetail />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
