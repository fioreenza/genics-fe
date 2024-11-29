import React from "react";

interface InputWithIconProps {
  icon: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  inputClassName?: string;
  iconClassName?: string;
  containerClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon: Icon,
  placeholder = "",
  type = "text",
  value = "",
  name = "",
  inputClassName = "",
  iconClassName = "",
  containerClassName = "",
  onChange,
}) => {
  return (
    <div className={`w-full relative inline-block ${containerClassName}`}>
      <Icon
        className={`absolute left-3 top-[50%] translate-y-[-50%] ${iconClassName}`}
      />
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`text-xs pl-10 w-full py-3 px-2 my-2 border-[1px] border-gray-400 rounded-lg ${inputClassName}`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithIcon;
