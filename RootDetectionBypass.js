Java.perform(() => {
    let RootDetectionActivity = Java.use("com.example.tryhookme.RootDetectionActivity");
    RootDetectionActivity.isRooted.implementation = function() {
        return false;

    }
})
