export default function JobPosting({ title, company, date, id }) {
  // 1. Calculate the difference in milliseconds
  const now = Date.now();
  const diffInMs = now - date;

  // 2. Convert to hours and round up
  // ms / 1000 (sec) / 60 (min) / 60 (hour)
  var hoursAgo = Math.ceil(diffInMs / (1000 * 60 * 60));
  hoursAgo -= 9;

  // 3. Simple plural logic
  const timeLabel = hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;

  return (
    <div className="bg-[#3f4f43] p-2">
      <p><strong>{company}</strong></p>
      <h3>{title}</h3>
      <p>{timeLabel}</p>
      <a href={`https://jobright.ai/jobs/info/${id}`}>Apply</a>
    </div>
  );
}
