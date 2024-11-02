// 引入 Gulp 模块，用于构建任务
const gulp = require('gulp');
// 引入 Gulp 的系列和任务函数，用于定义任务
const { series, task } = require('gulp');

// 定义一个异步函数，用于动态导入 gulp-useref 模块
async function importUseref() {
    // 使用 import() 动态导入 gulp-useref 模块
    // 返回模块的 default 导出
    return (await import('gulp-useref')).default;
}

// 定义一个异步函数，用于动态导入 gulp-filter 模块
async function importFilter() {
    // 使用 import() 动态导入 gulp-filter 模块
    // 返回模块的 default 导出
    return (await import('gulp-filter')).default;
}

// 定义一个异步函数，用于动态导入 gulp-uglify 模块
async function importUglify() {
    // 使用 import() 动态导入 gulp-uglify 模块
    // 返回模块的 default 导出
    return (await import('gulp-uglify')).default;
}

// 定义一个异步函数，用于动态导入 gulp-csso 模块
async function importCsso() {
    // 使用 import() 动态导入 gulp-csso 模块
    // 返回模块的 default 导出
    return (await import('gulp-csso')).default;
}

// 定义一个异步函数，用于动态导入 gulp-rev 模块
async function importRev() {
    // 使用 import() 动态导入 gulp-rev 模块
    // 返回模块的 default 导出
    return (await import('gulp-rev')).default;
}

// 定义一个异步函数，用于动态导入 gulp-rev-replace 模块
async function importRevReplace() {
    // 使用 import() 动态导入 gulp-rev-replace 模块
    // 返回模块的 default 导出
    return (await import('gulp-rev-replace')).default;
}

// 定义默认任务
gulp.task('default', async function () {
    // 动态导入所有需要的模块
    const useref = await importUseref(); // 动态导入 gulp-useref 模块
    const filter = await importFilter(); // 动态导入 gulp-filter 模块
    const uglify = await importUglify(); // 动态导入 gulp-uglify 模块
    const csso = await importCsso(); // 动态导入 gulp-csso 模块
    const rev = await importRev(); // 动态导入 gulp-rev 模块
    const revReplace = await importRevReplace(); // 动态导入 gulp-rev-replace 模块

    // 创建过滤器，用于处理特定类型的文件
    var jsFilter = filter('**/*.js', { restore: true }); // 过滤所有 .js 文件
    var cssFilter = filter('**/*.css', { restore: true }); // 过滤所有 .css 文件
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true }); // 过滤所有文件，但排除 index.html

    // 从 src 目录读取 index.html 文件
    return gulp.src('src/index.html')
        .pipe(useref()) // 使用 useref 处理文件引用，合并文件
        .pipe(jsFilter) // 应用 jsFilter 过滤器，只处理 .js 文件
        .pipe(uglify()) // 压缩 .js 文件
        .pipe(jsFilter.restore) // 恢复过滤器，继续处理其他文件
        .pipe(cssFilter) // 应用 cssFilter 过滤器，只处理 .css 文件
        .pipe(csso()) // 压缩 .css 文件
        .pipe(cssFilter.restore) // 恢复过滤器，继续处理其他文件
        .pipe(indexHtmlFilter) // 应用 indexHtmlFilter 过滤器，处理除 index.html 以外的文件
        .pipe(rev()) // 生成文件的哈希值，确保文件唯一性
        .pipe(indexHtmlFilter.restore) // 恢复过滤器，继续处理其他文件
        .pipe(revReplace()) // 替换文件引用，使用生成的哈希值
        .pipe(gulp.dest('dist')); // 将处理后的文件输出到 dist 目录
});