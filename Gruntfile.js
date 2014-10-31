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
        },
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: []
            },
            files: ['*.html']
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bootlint');

    // Default task
    grunt.registerTask('default', ['jshint', 'bootlint']);

    // Travis task
    grunt.registerTask('travis', ['jshint', 'bootlint']);
};