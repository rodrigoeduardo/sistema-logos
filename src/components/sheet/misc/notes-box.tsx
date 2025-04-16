export default function NotesBox() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Anotações</h2>
      <textarea
        id="notes"
        rows={10}
        placeholder="Escreva aqui..."
        className="rounded-xl p-2 shadow-sm border"
      />
    </div>
  );
}
