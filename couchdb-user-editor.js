(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            'ractive',
            'couchr',
            'events',
            'text!./form.html'
        ],factory);
    } else {
        // browser global
        $.get('./form.html', function(form_t){
            root.couchapp_settings = factory(
                root.jQuery,
                root.ractive,
                root.couchr,
                root.events,
                form_t
            );
        });

    }
}(this, function ($, Ractive, couchr, events, form_t) {

    return editUser;

    function editUser(couch_url, username, elem, options) {

        var me = this;

        load_user(couch_url, username, function(err, user){

            var groups = removeUsedGroups(options.groups, user.groups);

            me.view = new Ractive({
                el: elem,
                template: form_t,
                data: {
                    user: user,
                    options: options,
                    groups: groups
                }
            });

            me.view.on('remove-role', function(event, el){
                var index = el.getAttribute('data-index');
                user.roles.splice(index, 1);
                me.view.update( 'user' );
                return false;
            });

            me.view.on('add-role', function(){
                var role = $('input.addRole').val();
                user.roles.push(role);
                me.view.update( 'user' );
                $('input.addRole').val('').focus();
            });

            me.view.on('remove-group', function(event, el){
                var index = el.getAttribute('data-index');
                user.groups.splice(index, 1);
                me.view.update( 'user' );

                me.view.set('groups', removeUsedGroups(options.groups, user.groups));

                return false;
            });

            me.view.on('add-group', function(){
                var group = $('select.addGroup').val();
                user.groups.push(group);
                me.view.update( 'user' );

                me.view.set('groups', removeUsedGroups(options.groups, user.groups));

                $('input.addGroup').val('').focus();
            });



            me.view.on('save', function() {
                console.log(user);
            });

        });
    }

    function removeUsedGroups(groups, used) {
        // slow method
        if (!used || used.length ===0) return groups;

        var results = [];
        groups.forEach(function(group){
            for (var i = used.length - 1; i >= 0; i--) {
                if (used[i] === group) return
            };
            results.push(group);
        });
        return results;
    }


    function load_user(couch_url, username, callback) {
        couchr.get(couch_url + '/_users/' + username, function(err, user){
            if (err) return callback(err);
            // split the groups and roles out
            var roles = [];
            user.groups = [];
            user.roles.forEach(function(role){
                if (role.indexOf('group.') === 0) user.groups.push(role.substring(6));
                else roles.push(role);
            });
            user.roles = roles;
            callback(null, user);
        });
    }


    function submit($elem, editor, emitter, cb) {

    }

    function render_err($elem, msg) {
    }

    function clear_err($elem) {
    }


}));