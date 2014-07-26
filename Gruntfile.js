module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            page: ['Resources/**/*.js', 'Grunfile.js'],
            options: {
                jquery: true,
                globals: {
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task
    grunt.registerTask('default', ['jshint']);

    // Travis task
    grunt.registerTask('travis', ['jshint']);
};