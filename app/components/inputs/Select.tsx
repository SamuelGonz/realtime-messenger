import ReactSelect from "react-select";

interface Props {
   disabled?: boolean;
   label: string;
   options: Record<string, any>[];
   onChange: (value: Record<string, any>) => void;
   value?: Record<string, any>;
}

export const Select: React.FC<Props> = ({ label, onChange, options, disabled, value }) => {
   return (
      <div className="z-[100]">
         <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
         <div className="mt-2">
            <ReactSelect
               isDisabled={disabled}
               value={value}
               onChange={onChange}
               isMulti
               options={options}
               menuPortalTarget={document.body}
               styles={{
                  menuPortal: (base) => ({
                     ...base,
                     zIndex: 9999,
                  }),
               }}
               classNames={{
                  control: () => "text-sm",
               }}
            />
         </div>
      </div>
   );
};