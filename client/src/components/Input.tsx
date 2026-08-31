import {
  Field,
  Label,
  Input as HeadlessInput,
  Description,
} from "@headlessui/react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fieldClassName?: string;
}

function Input({
  label = "Input Label",
  type = "text",
  errorMessage = "",
  id,
  name,
  className,
  fieldClassName = "w-full max-w-lg",
  ...props
}: InputProps) {
  return (
    <Field className={clsx("mb-5", fieldClassName)}>
      <div className="relative">
        <HeadlessInput
          {...props}
          type={type}
          id={id}
          name={name}
          placeholder=" "
          invalid={!!errorMessage}
          className={clsx(
            "block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            "data-invalid:border-red-500",
            className,
          )}
        />

        <Label
          htmlFor={id}
          className={clsx(
            "absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto inset-s-1 not-placeholder-shown:top-6",
            "peer-data-invalid:text-red-500",
          )}
        >
          {label}
        </Label>
      </div>

      {errorMessage && (
        <Description className="block mt-3 text-left text-red-500 text-sm">
          {errorMessage}
        </Description>
      )}
    </Field>
  );
}

export default Input;
