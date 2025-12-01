export default function TimeDropdown() {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0') + ''
  );

  return (
    <select className="text-[#667085]">
      {hours.map((hour) => (
        <option key={hour} value={hour}>
          {hour} hours
        </option>
      ))}
    </select>
  );
}