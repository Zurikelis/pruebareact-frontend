function SearchBox({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Buscar servicio..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
export default SearchBox;