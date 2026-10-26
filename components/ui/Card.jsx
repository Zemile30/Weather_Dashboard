export default function Card({ title, children, className = "" }) {
  return (
    <section className={`flex flex-col rounded-2xl bg-card p-4 ${className}`}>
      {title && <h3 className="text-sm">{title}</h3>}
      {children}
    </section>
  );
}