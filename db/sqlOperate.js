const sqls = {
    insert: 'INSERT INTO user_register(user_name, tel, email, `type`) VALUES (?, ?, ?, "smail_collaborate")',
    queryAll: 'SELECT * FROM user_register'
};

module.exports = sqls;