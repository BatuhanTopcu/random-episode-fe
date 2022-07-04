import { Show } from "@types";

export default function ShowCard({ show }: { show: Show }) {
  return <div className="show-card">{show.name}</div>;
}
