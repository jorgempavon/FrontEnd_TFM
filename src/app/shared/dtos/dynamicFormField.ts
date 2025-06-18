export interface DynamicFormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validators?: any[];
}
