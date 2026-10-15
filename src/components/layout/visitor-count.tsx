import { roundVisitors, visitorCount } from "@/lib/visitors";

export async function VisitorCount() {
  const count = await visitorCount();
  const rounded = count === null ? null : roundVisitors(count);
  if (rounded === null) return null;
  return (
    <>
      <span className="text-line-strong" aria-hidden="true">
        /
      </span>
      <span>Visited by {rounded.toLocaleString("en")}+ people</span>
    </>
  );
}
