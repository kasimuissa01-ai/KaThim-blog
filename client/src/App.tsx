import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomDashboardLayout from "./components/CustomDashboardLayout";
import Home from "./pages/Home";
import TrendAnalyzer from "./pages/TrendAnalyzer";
import ContentGenerator from "./pages/ContentGenerator";
import ScriptEditor from "./pages/ScriptEditor";
import ContentCalendar from "./pages/ContentCalendar";
import ContentLibrary from "./pages/ContentLibrary";
import BrandVoiceSettings from "./pages/BrandVoiceSettings";
import DailyBriefing from "./pages/DailyBriefing";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/trends"} component={TrendAnalyzer} />
      <Route path={"/generator"} component={ContentGenerator} />
      <Route path={"/editor/:id?"} component={ScriptEditor} />
      <Route path={"/calendar"} component={ContentCalendar} />
      <Route path={"/library"} component={ContentLibrary} />
      <Route path={"/settings"} component={BrandVoiceSettings} />
      <Route path={"/briefing"} component={DailyBriefing} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <CustomDashboardLayout>
            <Router />
          </CustomDashboardLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
