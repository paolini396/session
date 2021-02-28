export default interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  updated_at: Date;
}
