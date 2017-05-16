const browserSync = require('browser-sync');
const bsInstance = browserSync.create();

const sass = require('node-sass');
const fs = require('fs')
const path = require('path')

const buildMethods = require('./buildTools');

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
    const unwantedDirs = ['devScripts', 'node_modules', '.git', '.sass-cache', '.vscode']
    return unwantedDirs.indexOf(dirname) === -1;
  });
  const itemsToWatch = directoriesToWatch.concat(['index.html']);
  bsInstance.watch(itemsToWatch).on('change', bsInstance.reload);

  bsInstance.init({
    server: './'
  });
}

function watchDirectoriesForRegen() {
  bsInstance.watch('./projects/**/!(index.html)').on('change', buildMethods.regenProjectWithFilepath);
  bsInstance.watch('./scss/*.scss').on('change', buildMethods.regenScss);
}

watchDirectoriesForRegen();
watchDirectoriesForReload();
