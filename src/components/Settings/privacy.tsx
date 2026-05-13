import { useState } from "react";

interface ToggleProps {
  defaultOn?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

function Toggle({ defaultOn = false, checked, onChange, disabled = false }: ToggleProps) {
  const [internalOn, setInternalOn] = useState(defaultOn);
  const on = checked !== undefined ? checked : internalOn;

  const handleClick = () => {
    if (disabled) return;
    const next = !on;
    if (checked === undefined) setInternalOn(next);
    onChange?.(next);
  };

  return (
    <button
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative w-12 h-6 rounded-full border-none p-0 transition-colors duration-200 flex-shrink-0 cursor-pointer
        ${on ? "bg-[#00a9f9]" : "bg-gray-600"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
          transition-transform duration-200
          ${on ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </button>
  );
}

function Privacy() {
  return (
    <div>
      <p className="pb-2 text-md text-white/50 ml-5">Privacy & Security</p>
      <div className="flex flex-col gap-2">
        <div className="bg-[#23282e] flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 8V5C3 3.895 3.895 3 5 3H8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 3H19C20.105 3 21 3.895 21 5V8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 16V19C3 20.105 3.895 21 5 21H8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 21H19C20.105 21 21 20.105 21 19V16" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 9.5V10" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 9.5V10" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 9.5V13" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 15C9 15 10 16.5 12 16.5C14 16.5 15 15 15 15" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-lg text-white/80">Fingerprint & Face ID</p>
          </div>
          <Toggle defaultOn={false} onChange={(val) => console.log("Fingerprint & Face ID:", val)}/>
        </div>
        <div className="bg-[#23282e] flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9">
                <path d="M6 2C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2H6Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 2V8H20" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 13H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M8 17H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M8 9H11"  stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <p className="text-lg text-white/80">Documents</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#8b8c93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="bg-[#23282e] flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,22A17.5,17.5,0,0,0,21,6.7V6L12,2,3,6v.7A17.5,17.5,0,0,0,12,22Z M11,6h2V8H11Z M11,10h2v8H11Z" fill="#00a9f9"/>
            </svg>
            <div>
                <p className="text-lg text-white/80">Privacy Policy</p>
                <p className="text-xs text-white/40">Choose what data you share with us</p>
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#8b8c93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="bg-[#23282e] flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#00a9f9" d="M471.609,98.286h-96.816V81.511c0-38.42-31.256-69.676-69.676-69.676h-98.263
                    c-38.42,0-69.676,31.256-69.676,69.676v16.775H40.393C18.12,98.286,0,116.405,0,138.678v122.329
                    c0,15.815,5.54,30.353,14.767,41.803v152.755c0,24.594,20.008,44.601,44.603,44.601h393.263
                    c24.594,0,44.603-20.007,44.603-44.601V302.81c9.226-11.45,14.766-25.988,14.766-41.802v-122.33
                    C512,116.405,493.881,98.286,471.609,98.286z"/>
            </svg>
            <div>
                <p className="text-lg text-white/80">Privacy Policy</p>
                <p className="text-xs text-white/40">Choose what data you share with us</p>
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#8b8c93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#23282e] mt-5 text-red-400 text-center py-4">Sign Out</div>
      <p className="mt-8 text-center text-white/50">App version: 1.0</p>
    </div>
  );
}

export default Privacy;