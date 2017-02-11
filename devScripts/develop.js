const ejs = require('ejs');
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
  const directoriesToWatch = getDirectories('..', (dirname) => {
    const unwantedDirs = ['devScripts', 'node_modules', 'scss']
    return unwantedDirs.indexOf(dirname) === -1;
  });
  const itemsToWatch = directoriesToWatch.concat(['index.html']);
  bsInstance.watch(itemsToWatch).on('change', bsInstance.reload);

  bsInstance.init({
    server: ''
  });
}

function watchDirectoriesForRegen() {
  console.log('watching for changes', __dirname);
  bsInstance.watch('./old-siam/**/*.*').on('change', () => {
    ejs.renderFile('./old-siam/index.ejs', {}, {}, (err, str) => {
      if(!err) {
        fs.writeFileSync('./old-siam/index.html', str);
      }
    });
  });
}

watchDirectoriesForRegen();


