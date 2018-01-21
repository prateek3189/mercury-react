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
            default:
                //nop
                break;
        }

        return result;
    }
};
