export default interface SignupInterface {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  company: string,
  customFields?: Array<CustomFieldInterface>
  gctoken?: string
}

export interface CustomFieldInterface {
  fieldId: string,
  fieldValue: string | number
}
