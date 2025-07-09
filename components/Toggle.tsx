
export type SwitchProps = {
  label?: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
};

export const Switch = ({ label, enabled, onChange }: SwitchProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full transform transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};