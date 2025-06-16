export interface UserDTO {
  id?: number;
  dni: string;
  email: string;
  name: string;
  lastName?: string;
  isAdmin?: boolean;
}
