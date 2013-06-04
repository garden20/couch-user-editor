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
            if (err) return alert('cant load user: ' + err);


            var rng = splitRolesAndGroups(user);
            var available_groups = removeUsedGroups(options.groups, rng.groups);

            me.view = new Ractive({
                el: elem,
                template: form_t,
                data: {
                    user: user,
                    options: options,
                    roles: rng.roles,
                    groups : rng.groups,
                    available_groups: available_groups
                }
            });

            me.view.on('remove-role', function(event, el){
                var index = el.getAttribute('data-index');
                rng.roles.splice(index, 1);
                me.view.update( 'roles' );
            });

            me.view.on('add-role', function(){
                var role = $('input.addRole').val();
                rng.roles.push(role);
                me.view.update( 'roles' );
                $('input.addRole').val('').focus();
            });

            me.view.on('remove-group', function(event, el){
                var index = el.getAttribute('data-index');
                rng.groups.splice(index, 1);
                me.view.update( 'groups' );

                me.view.set('available_groups', removeUsedGroups(options.groups, rng.groups));
            });

            me.view.on('add-group', function(){
                var group = $('select.addGroup').val();
                rng.groups.push(group);
                me.view.update( 'groups' );

                me.view.set('available_groups', removeUsedGroups(options.groups, rng.groups));

                $('input.addGroup').val('').focus();
            });



            me.view.on('save', function() {
                user.email = $('input.email').val();
                user.roles =[];
                rng.groups.forEach(function(group){
                    user.roles.push('group.' + group);
                });
                rng.roles.forEach(function(role){
                    user.roles.push(role);
                });

                save_user(couch_url, username, user, function(err, data){
                    if (err) return alert('Could not save user: ' + err);
                    user._rev = data.rev;
                    $('.success').show().hide(3000);
                });
            });

        });
    }

    function removeUsedGroups(groups, used) {
        // slow method
        if (!used || used.length ===0) return groups;

        var results = [];
        groups.forEach(function(group){
            for (var i = used.length - 1; i >= 0; i--) {
                if (used[i] === group) return;
            }
            results.push(group);
        });
        return results;
    }

    function splitRolesAndGroups(user) {
        // split the groups and roles out
        var result = {
            roles: [],
            groups: []
        }
        user.roles.forEach(function(role){
            if (role.indexOf('group.') === 0) result.groups.push(role.substring(6));
            else result.roles.push(role);
        });
        return result;
    }

    function load_user(couch_url, username, callback) {
        couchr.get(couch_url + '/_users/' + username, callback);
    }
    function save_user(couch_url, username, user, callback) {
        couchr.put(couch_url + '/_users/' + username, user, callback);
    }

}));