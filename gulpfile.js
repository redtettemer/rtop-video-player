const path = require('path');
const gulp = require('gulp');

const terser = require('gulp-terser');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const header = require('gulp-header');

const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');

const del = require('del');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const build = require('./build.json');

const notify = require('gulp-notify');

const pkg = require('./package.json');

const { version } = pkg;

const minSuffix = '.min';

const onError = (err) => {
     notify.onError({
         title   : 'Gulp',
         subtitle: 'Failure!',
         message : 'Error: <%= error.message %>',
         sound   : 'Beep'
     })(err);

     this.emit('end');
 };

const paths = {
    rtopPlayer: {
        src: {
            sass: path.join(__dirname, 'src/sass/**/*.scss'),
            js: path.join(__dirname, 'src/js/**/*.js')
        },
        output: [
            path.join(__dirname, `dist/*.${version}.${minSuffix}.*`),
            path.join(__dirname, `dist/*.${version}.${minSuffix}.css`)
        ]
    }
};

const tasks = {
    css: [],
    js: [],
    clean: 'clean',
};

const sizeOptions = { showFiles: true, gzip: true };

gulp.task(tasks.clean, done => {
    const dirs = [paths.rtopPlayer.output].map(dir => path.join(dir, '**/*'));

    del(dirs);

    done();
});

Object.entries(build.js).forEach(([filename, entry]) => {
    entry.formats.forEach(format => {
        const name = `js:${filename}:${format}`;
        tasks.js.push(name);
        const extension = 'js';

        gulp.task(name, () =>
            gulp
                .src(entry.src)
                .pipe(plumber({errorHandler: onError}))
                .pipe(
                    rollup(
                        {
                            plugins: [
                                resolve(),
                                commonjs(),
                                babel({
                                    presets: [
                                        [
                                            '@babel/env',
                                            {
                                                useBuiltIns: false,
                                                corejs: undefined
                                            },
                                        ],
                                    ],
                                    babelrc: false,
                                    exclude: [/\/core-js\//],
                                }),
                            ],
                        },
                        {
                            name: entry.namespace,
                            format,
                        }
                    )
                )
                .pipe(header('typeof navigator === "object" && '))
                .pipe(
                    rename({
                        extname: `.${version}.${extension}`,
                    }),
                )
                .pipe(gulp.dest(entry.dist))
                .pipe(filter(`**/*.${extension}`))
                .pipe(terser())
                // .pipe(rename({ suffix: minSuffix }))
                .pipe(size(sizeOptions))
                .pipe(gulp.dest(entry.dist)),
        );
    });
});

Object.entries(build.css).forEach(([filename, entry]) => {
    const name = `css:${filename}`;
    tasks.css.push(name);

    gulp.task(name, () =>
        gulp
            .src(entry.src)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sass())
            .pipe(clean())
            .pipe(size(sizeOptions))
            .pipe(
                rename({
                    extname: `.${version}.css`,
                })
            )
            .pipe(gulp.dest(entry.dist)),
    );
});

gulp.task('js', () => gulp.parallel(...tasks.js));

gulp.task('watch', () => {
    gulp.watch(paths.rtopPlayer.src.js, gulp.parallel(...tasks.js));
    gulp.watch(paths.rtopPlayer.src.sass, gulp.parallel(...tasks.css));
});

gulp.task('build', gulp.series(tasks.clean, gulp.parallel(...tasks.js, ...tasks.css)));

gulp.task('default', gulp.series('build', 'watch'));

gulp.task(
    'deploy',
    gulp.series(
        tasks.clean,
        gulp.parallel(...tasks.js, ...tasks.css)
    )
);
