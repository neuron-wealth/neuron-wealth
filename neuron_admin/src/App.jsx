import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./services/api";
import { GuestOnly, RequireAuth } from "./routes/guards";
import { ThemeProvider } from "./context/ThemeContext";
import { FlashToasts, ToastProvider } from "./context/ToastContext";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotUsername from "./pages/ForgotUsername/ForgotUsername";
import ResetCredentials from "./pages/ResetCredentials/ResetCredentials";
import Dashboard from "./pages/Dashboard/Dashboard";
import RecordList from "./components/records/RecordList";
import { RECORD_PAGES } from "./config/records";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import HeaderSettings from "./pages/HeaderSettings/HeaderSettings";
import FooterSettings from "./pages/FooterSettings/FooterSettings";
import AccessibilitySettings from "./pages/AccessibilitySettings/AccessibilitySettings";
import WebsiteCms from "./pages/WebsiteCms/WebsiteCms";
import PageEditor from "./pages/PageEditor/PageEditor";
import Blogs from "./pages/Blogs/Blogs";
import BlogEditor from "./pages/Blogs/BlogEditor";
import BlogComments from "./pages/Blogs/BlogComments";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FlashToasts />
        <Routes>
          <Route element={<GuestOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-username" element={<ForgotUsername />} />
          </Route>
          <Route path="/reset" element={<ResetCredentials />} />
          <Route element={<RequireAuth />}>
            <Route index element={<Dashboard />} />
            {RECORD_PAGES.map((page) => (
              <Route key={page.key} path={page.to.slice(1)} element={<RecordList key={page.key} page={page} />} />
            ))}
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="website/cms" element={<WebsiteCms />} />
            <Route path="website/cms/:slug" element={<PageEditor />} />
            <Route path="website/overview" element={<Navigate to="/website/cms/about" replace />} />
            <Route path="website/header" element={<HeaderSettings />} />
            <Route path="website/footer" element={<FooterSettings />} />
            <Route path="website/branding" element={<Navigate to="/website/header" replace />} />
            <Route path="website/social" element={<Navigate to="/website/footer" replace />} />
            <Route path="website/accessibility" element={<AccessibilitySettings />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/comments" element={<BlogComments />} />
            <Route path="blogs/:id" element={<BlogEditor />} />
          </Route>
          <Route path="*" element={<Navigate to={getToken() ? "/" : "/login"} replace />} />
        </Routes>
      </ToastProvider>
    </ThemeProvider>
  );
}
