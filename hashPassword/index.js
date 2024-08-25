import bcrypt from "bcrypt"

const hashPwd = async (pwd) => {
    try {
        const hash = await bcrypt.hash(pwd, 10);
        return hash;
    } catch (error) {
        throw error; // Tangkap dan lemparkan error jika terjadi
    }
};


export default hashPwd