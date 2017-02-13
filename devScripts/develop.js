const ejs = require('ejs');
const sass = require('node-sass');
const browserSync = require('browser-sync');
const bsInstance = browserSync.create();

const fs = require('fs')
const path = require('path')

function getDirectories (srcpath, filter) {
  const dirs = fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());

  if (filter && typeof filter === 'function') {
    return dirs.filter(filter);
  }
  return dirs;
}

function watchDirectoriesForReload() {
  const directoriesToWatch = getDirectories('./', (dirname) => {
    const unwantedDirs = ['devScripts', 'node_modules', 'scss', '.git', '.sass-cache', '.vscode']
    return unwantedDirs.indexOf(dirname) === -1;
  });
  const itemsToWatch = directoriesToWatch.concat(['index.html']);
  bsInstance.watch(itemsToWatch).on('change', bsInstance.reload);

  bsInstance.init({
    server: './'
  });
}

function watchDirectoriesForRegen() {
  bsInstance.watch('./projects/**/!(index.html)').on('change', (filePath) => {
    const changedProject = path.dirname(filePath);
    console.log('changed project', changedProject);
    ejs.renderFile(path.join(changedProject, 'index.ejs'), {}, {}, (err, str) => {
      if(!err) {
        fs.writeFileSync(path.join(changedProject, 'index.html'), str);
      }
    });
  });
  bsInstance.watch('./scss/*.scss').on('change', (filePath) => {
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
    })
  });
}

watchDirectoriesForRegen();
watchDirectoriesForReload();
