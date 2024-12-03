import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";

import "./styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configurations/reactQuery/client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
