const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const sass = require('node-sass');

const buildMethods = {
  regenProjectWithFilepath: (filePath) => {
    const changedProject = path.dirname(filePath);
    console.log('changed project', changedProject);
    buildMethods.regenProjectWithDirPath(changedProject);
  },

  regenScss: (filePath) => {
    const outDir = path.join('./', 'css');
    console.log(filePath , ' changed')
    sass.render({
      file: filePath,
      includePaths: [
        'node_modules/bootstrap/scss'
      ],
      outFile: outDir
    }, (err, result) => {
      if(!err) {
        const outFile = path.basename(filePath).replace('scss', 'css');
        const outPath = path.join(outDir, outFile);
        fs.writeFileSync(outPath, result.css.toString());
      }
    });
  },
  regenAllScss: () => {
    const sassFiles = fs.readdirSync('./scss/');
    const sassFilePaths = sassFiles.map((filename) => {
      return path.join('./', 'scss', filename);
    });
    sassFilePaths.forEach(buildMethods.regenScss);
  },
  regenProjectWithDirPath: (dirPath) => {
    ejs.renderFile(path.join(dirPath, 'index.ejs'), {}, {}, (err, str) => {
      if(!err) {
        fs.writeFileSync(path.join(dirPath, 'index.html'), str);
      }
    });
  }
};

module.exports = buildMethods;
