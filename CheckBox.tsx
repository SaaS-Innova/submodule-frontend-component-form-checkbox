import { Checkbox } from "primereact/checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { classNames } from "primereact/utils";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { IFormProps } from "../formInterface/forms.model";
import { FormFieldError } from "../formFieldError/FormFieldError";

export const CheckBox = (props: IFormProps) => {
  const { attribute, form, fieldType, handleChange } = props;
  const { label } = form[attribute];
  const { required, disabled } = form[attribute].rules;
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "md:col-4 grid";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "md:col-4 grid";
        break;
      default:
        labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field grid";
        divClassName = "col-12 md:col-9 relative";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      <span className="capitalize-first">
        {label} {required && "*"}
      </span>
    </label>
  );
  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <Controller
          name={attribute}
          control={control}
          rules={inputValidator(form[attribute].rules, label)}
          render={({ field, fieldState }) => (
            <Checkbox
              inputId={field.name}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.checked);
                handleChange && handleChange(e);
              }}
              checked={field.value}
              className={classNames({ "p-invalid": fieldState.invalid })}
              disabled={disabled}
            />
          )}
        />
        <div>
          <FormFieldError
            data={{
              errors: errors,
              name: attribute,
            }}
          />
        </div>
      </div>
    </div>
  );
};
