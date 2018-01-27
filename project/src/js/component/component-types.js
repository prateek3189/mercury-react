module.exports = {
    getComponentFromName: function(componentName){
        var result = 'div';
        switch(componentName){
            case 'Login':
                result = require('../login/login-setup.jsx');
                break;
            case 'SignUp':
                result = require('../login/signup.jsx');
                break;
            case 'ForgotPassword':
                result = require('../login/forgot-password.jsx');
                break;
            case 'dashboard':
                result = require('../dashboard/dashboard.jsx');
                break;
            case 'MyFriends':
                result = require('../friends/my-friends.jsx');
                break;
            case 'MyTravel':
                result = require('../travel/my-travel.jsx');
                break;
            case 'MyProfile':
                result = require('../profile/my-profile.jsx');
                break;
            case 'MyFriendsList':
                result = require('../friends/my-friends-list.jsx');
                break;
            default:
                //nop
                break;
        }

        return result;
    }
};
