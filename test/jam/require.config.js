var jam = {
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery.lego",
            "location": "jam/jquery.lego",
            "main": "jquery.lego.js"
        },
        {
            "name": "json.edit",
            "location": "jam/json.edit",
            "main": "json.edit.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        }
    ],
    "version": "0.2.17",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery.lego",
            "location": "jam/jquery.lego",
            "main": "jquery.lego.js"
        },
        {
            "name": "json.edit",
            "location": "jam/json.edit",
            "main": "json.edit.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery.lego",
            "location": "jam/jquery.lego",
            "main": "jquery.lego.js"
        },
        {
            "name": "json.edit",
            "location": "jam/json.edit",
            "main": "json.edit.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}