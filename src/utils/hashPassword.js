import bcrypt from "bcryptjs";


export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (enteredPassword, storedPassword)=>{
    return await bcrypt.compare(enteredPassword,storedPassword);
};
