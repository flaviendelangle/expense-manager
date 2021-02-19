import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt()

  return bcrypt.hash(password, salt)
}

export const checkPassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash)
