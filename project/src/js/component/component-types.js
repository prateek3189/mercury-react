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
            default:
                //nop
                break;
        }

        return result;
    }
};
