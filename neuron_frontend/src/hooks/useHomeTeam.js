import { usePage } from "./usePage";
import { strings } from "../components/cms/primitives";

/**
 * Home › Team Showcase is the single place people are edited. The Team page and the
 * service-page founder sections read the featured leader and members from it.
 */
export function useHomeTeam() {
  const { page } = usePage("home");
  return page?.sections?.find((entry) => entry.type === "team")?.content || {};
}

/** The featured leader (Principal Officer) from Home › Team Showcase. */
export function useHomeLeader() {
  const team = useHomeTeam();
  const fullBio = strings(team.leaderFullBio);
  return {
    name: team.leaderName || "",
    role: team.leaderRole || "",
    monogram: team.leaderInitials || "",
    credentials: strings(team.leaderCredentials),
    image: team.leaderImage || null,
    bio: fullBio.length ? fullBio : strings(team.leaderBio ? [team.leaderBio] : []),
  };
}
