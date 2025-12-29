export const dateToISO = (v: FormDataEntryValue | null) => {
  if (typeof v !== "string") return undefined;
  if (!v.trim()) return undefined;

  return new Date(v).toISOString(); 
};