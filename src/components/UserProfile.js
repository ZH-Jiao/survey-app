var UserProfile = (function() {
    var full_name = "";
    var state = "";
    var code = "";
    var token = "";

    var getName = function() {
        return full_name; // Or pull this from cookie/localStorage
    };

    var setName = function(name) {
        full_name = name;
        // Also set this in cookie/localStorage
    };

    var getState = function() {
        return state;
    };

    var setState = function(new_state) {
        state = new_state
    };

    var getCode = function() {
        return code;
    };

    var setCode = function(user_code) {
        code = user_code
    };

    var getToken = function() {
        return token;
    };

    var setToken = function(user_token) {
        token = user_token;
    };

    var isLoggedIn = function() {
        return token !== "";
    }


    return {
        getName: getName,
        setName: setName,
        getState: getState,
        setState: setState,
        getCode: getCode,
        setCode: setCode,
        getToken: getToken,
        setToken: setToken,
        isLoggedIn: isLoggedIn
    }

})();

export default UserProfile;