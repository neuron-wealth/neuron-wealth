import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchDashboard } from "../../services/recordService";
import { RECORD_PAGE_BY_KEY } from "../../config/records";
import { useToast } from "../../context/ToastContext";
import { DashboardSkeleton } from "../../components/ui/Skeleton";
import Alert from "../../components/ui/Alert";
import WelcomeBanner from "./WelcomeBanner";
import StatCard from "./StatCard";
import ActivityChart from "./ActivityChart";
import StatusBreakdown from "./StatusBreakdown";
import RecentList from "./RecentList";

const TONES = { enquiries: "accent", callbacks: "green", assessments: "amber", subscribers: "sky", careers: "violet" };

export default function Dashboard() {
  const { admin } = useOutletContext();
  const { push } = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchDashboard()
      .then((result) => active && setData(result))
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        push(err.message, "error");
      });
    return () => {
      active = false;
    };
  }, [push]);

  if (error && !data) {
    return (
      <Alert tone="error" title="The dashboard could not be loaded">
        {error}
      </Alert>
    );
  }
  if (!data) return <DashboardSkeleton />;

  const records = (data.records || []).filter((record) => RECORD_PAGE_BY_KEY[record.key]);

  return (
    <div className="space-y-6">
      <WelcomeBanner admin={admin} data={data} records={records} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {records.map((record) => {
          const page = RECORD_PAGE_BY_KEY[record.key];
          const first = record.statuses[0];
          return (
            <StatCard
              key={record.key}
              icon={page.icon}
              label={page.label}
              value={record.total}
              detail={`${record.byStatus[first] || 0} ${first.toLowerCase()} · ${record.lastWeek} in the last 7 days`}
              to={page.to}
              tone={TONES[record.key]}
            />
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActivityChart trend={data.trend || []} records={records} />
        </div>
        <StatusBreakdown records={records} />
      </div>

      <RecentList items={data.recent || []} records={records} />
    </div>
  );
}
