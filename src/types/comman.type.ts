export interface ValidationRule {
    required?: boolean
    regex?: RegExp
    requiredMessage?: string
    regexMessage?: string
  }