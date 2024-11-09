const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

class User {
    static async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const { data, error } = await supabase
            .from('users')
            .insert([{
                email: userData.email,
                password: hashedPassword,
                name: userData.name
            }]);

        if (error) throw error;
        return data;
    }

    static async findByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw error;
        return data;
    }
}

module.exports = User;
