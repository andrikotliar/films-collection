const gulp = require('gulp');
const merge = require('./modules/merge.js');

const mergeJSON = () => {
	return gulp.src('json/*.json')
	.pipe(merge('database.json', (data) => {
		let buffer = Buffer.from(JSON.stringify(data));
		return buffer;
	}))
	.pipe(gulp.dest('database'));	
}

exports.mergeJSON = mergeJSON;