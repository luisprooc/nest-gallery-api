import * as bcrypt from 'bcrypt';

export const encryptPassword = async () => {
  const saltOrRounds = 10;
  const password = 'random_password';
  const hash = await bcrypt.hash(password, saltOrRounds);
}
