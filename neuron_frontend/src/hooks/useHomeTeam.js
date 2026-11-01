import { usePage } from "./usePage";
import { pageDefaults } from "../config/pageDefaults";
import { strings, visibleItems } from "../components/cms/primitives";

/** Fixed mentor profiles (Dr. Hamsa Thota) shown in Team › Leadership & Mentorship; not editable in the admin. */
export const MENTORS = visibleItems(
  pageDefaults.team?.sections?.find((entry) => entry.type === "leadership")?.content?.mentors
);

const nameKey = (name) => String(name || "").trim().toLowerCase();
export const isSameName = (a, b) => Boolean(nameKey(a)) && nameKey(a) === nameKey(b);
const MENTOR_NAMES = new Set(MENTORS.map((mentor) => nameKey(mentor.name)));
export const isMentor = (name) => MENTOR_NAMES.has(nameKey(name));

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
