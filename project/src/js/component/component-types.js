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
            case 'MyRelation':
                result = require('../relation/my-relation.jsx');
                break;
            case 'MyProfile':
                result = require('../profile/my-profile.jsx');
                break;
            case 'MyFriendsList':
                result = require('../friends/my-friends-list.jsx');
                break;
            case 'MyRelationsList':
                result = require('../relation/my-relation-list.jsx');
                break;
            case 'AddFriend':
                result = require('../friends/add-friend.jsx');
                break;
            case 'AddRelation':
                result = require('../relation/add-relation.jsx');
                break;
            default:
                //nop
                break;
        }

        return result;
    }
};
