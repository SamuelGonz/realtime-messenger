import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
   id: string;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
   required?: boolean;
   placeholder?: string;
   type?: string;
}

export const MessageInput: React.FC<Props> = ({ id, register, errors, required, placeholder, type }) => {
   return (
      <div className="relative w-full">
         <input
            id={id}
            type={type}
            autoComplete={id}
            {...register(id, { required })}
            placeholder={placeholder}
            className="text-black font-ligth py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
         />
      </div>
   );
};
