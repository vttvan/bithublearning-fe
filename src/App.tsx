import { Toaster } from "sonner";
import AppRouter from "./routes/appRouter";
function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
