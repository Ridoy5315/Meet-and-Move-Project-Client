export function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border p-5 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}
