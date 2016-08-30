var gulp = require('gulp'),
    cp   = require('child_process'),
    bundle = process.platform === "win32" ? "bundle.bat" : "bundle";

gulp.task('jekyll-build', function (done) {
    return cp.spawn(bundle, ['exec', 'jekyll', 'build', '--drafts', '--quiet', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit', shell: true}).on('close', done);
    // return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('close', done);
});
