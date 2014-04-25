/**
 * Created by onlyit on 14-4-25.
 */
// 配置任务的地方
module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            yasuojs: {
                src: 'src/KpSliderClone/KpSliderClone.js',
                dest: 'src/KpSliderClone/KpSliderClone.min.<%=pkg.version%>.js'
            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认任务
    grunt.registerTask('default', ['uglify']);
}
