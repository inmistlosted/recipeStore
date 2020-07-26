const userRepository = require('./user.repository');

class UserService {
    getUser(data){
        return userRepository.findUser(data);
    }

    updateLiked(login, data) {
        return userRepository.updateUser({ login: login }, data);
    }

    getUserByLogin(login) {
        return userRepository.findUserByLogin(login);
    }

    addUser(data){
        return userRepository.addUser(data);
    }
}

module.exports = new UserService();
