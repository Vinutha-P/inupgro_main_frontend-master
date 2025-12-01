interface FormInputProps {
    key: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error: string | undefined;
    options?: string[];
  }
  
  const FormInputs: React.FC<FormInputProps> = ({
    key,
    label,
    type,
    value,
    onChange,
    error,
    options,
  }) => {
    return (
      <div className="mb-4" key={key}>
        <label htmlFor={key}>{label}</label>
        
        {/* Handle select type */}
        {type === "select" ? (
          <select
            id={key}
            name={key}
            value={value}
            onChange={onChange}
            className={error ? "error" : ""}
          >
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) 
        /* Handle file type */
        : type === "file" ? (
          <input
            id={key}
            name={key}
            type="file"
            onChange={onChange}
            className={error ? "error" : ""}
          />
        ) 
        /* Handle text and other types */
        : (
          <input
            id={key}
            name={key}
            type={type}
            value={value}
            onChange={onChange}
            className={error ? "error" : ""}
          />
        )}
        
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default FormInputs;
  