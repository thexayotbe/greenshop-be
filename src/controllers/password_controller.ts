import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    // Compare the user's password with the stored hashed password
    const match: boolean = await bcrypt.compare(password, hashedPassword);

    if (match) {
      // Passwords match
      return true;
    } else {
      // Passwords don't match
      return false;
    }
  } catch (error) {
    // Handle error
    return false;
  }
};

export { hashPassword, comparePassword };
