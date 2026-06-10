export default function TextArea({ label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <textarea {...props} />
    </div>
  );
}
