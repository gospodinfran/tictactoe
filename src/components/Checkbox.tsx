interface checkboxProps {
  name: string;
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Checkbox({ name, checked, onChange }: checkboxProps) {
  return (
    <label>
      <input
        type="checkbox"
        name={name.trim()}
        checked={checked}
        onChange={onChange}
      />
      {name}
    </label>
  );
}
