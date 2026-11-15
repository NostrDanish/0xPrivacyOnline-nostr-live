import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
import Feed from "./pages/Feed";
import ToolsHub from "./pages/ToolsHub";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import MirrorVault from "./pages/MirrorVault";
import Community from "./pages/Community";
import Manifesto from "./pages/Manifesto";
import { NIP19Page } from "./pages/NIP19Page";
import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/tools" element={<ToolsHub />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:guideId" element={<GuideDetail />} />
        <Route path="/vault" element={<MirrorVault />} />
        <Route path="/community" element={<Community />} />
        <Route path="/manifesto" element={<Manifesto />} />
        {/* NIP-19 route for npub1, note1, naddr1, nevent1, nprofile1 */}
        <Route path="/:nip19" element={<NIP19Page />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
