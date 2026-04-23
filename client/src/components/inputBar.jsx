export default function InputBar({ placeholder, type, name, onChange, value }) {
  return (
    <input
      type={type}
      name={name}
      required={true}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="bg-white/5 border border-white/10 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-400/70 focus:outline-none focus:bg-white/8 px-4 rounded-md w-full transition-all duration-300 focus:scale-[1.01] focus:shadow-sm focus:shadow-amber-400/10"
    />
  );
}