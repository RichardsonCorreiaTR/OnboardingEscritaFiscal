import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SistemaProvider } from "@/context/SistemaContext";
import LandingSistema from "./pages/LandingSistema.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import NotFound from "./pages/NotFound.tsx";
import UnderConstruction from "./pages/UnderConstruction.tsx";

/**
 * Altere para `false` quando quiser liberar o site completo para todos.
 */
const UNDER_CONSTRUCTION = false;

const queryClient = new QueryClient();

const App = () => {
  if (UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SistemaProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/OnboardingEscritaFiscal">
            <Routes>
              <Route path="/" element={<LandingSistema />} />
              <Route path="/portal" element={<Onboarding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SistemaProvider>
    </QueryClientProvider>
  );
};

export default App;
