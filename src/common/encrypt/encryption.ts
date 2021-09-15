import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string) : string => {
  const salt = bcrypt.genSaltSync();
  const hash =  bcrypt.hashSync(password, 10);
  return hash;
}

export const comparePassword = (password: string ,hash: string ): boolean => bcrypt.compareSync(password, hash);