if (ObjC.available) {
    var paths = [
        "/Applications/Cydia.app",
        "/etc/ssh/sshd_config",
        "/user/lib/substrate"
    ];

    var f = Module.findExportByName("libSystem.B.dylib", "stat64");
    Interceptor.attach(f, {
        onEnter: function(args) {
            this.is_common_path = false;
            var arg = Memory.readUtf8String(args[0]);
            for (var path in paths) {
                if (arg.indexOf(paths[path]) > -1) {
                    console.log("Hooking native function stat64: " + arg);
                    this.is_common_path = true;
                }
            }
        },
        onLeave: function(retval) {
            if (this.is_common_path) {
                retval.replace(-1);
            }
        }
    });
    var f = Module.findExportByName("libSystem.B.dylib", "stat");
    Interceptor.attach(f, {
        onEnter: function(args) {
            this.is_common_path = false;
            var arg = Memory.readUtf8String(args[0]);
            for (var path in paths) {
                if (arg.indexOf(paths[path]) > -1) {
                    this.is_common_path = true;
                }
            }
        },
        onLeave: function(retval) {
            if (this.is_common_path) {
                retval.replace(-1);
            }
        }
    });
}
