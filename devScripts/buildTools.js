const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const sass = require('node-sass');

const projectData = require('./projectData');

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
      } else {
        console.log(err);
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
    ejs.renderFile(path.join(dirPath, 'index.ejs'), {projectData}, {}, (err, str) => {
      if(!err) {
        console.log('regenerated ', dirPath)
        fs.writeFileSync(path.join(dirPath, 'index.html'), str);
      } else {
        console.log(err);
      }
    });
  },
  regenAllProjects: () => {
    const allProjects = fs.readdirSync('./projects');
    const allProjectDirPaths = allProjects
    .filter((projectName) =>  projectName !== '.DS_Store' && projectName !== 'index.ejs' && projectName !== 'index.html')
    .map((projectName) =>  path.join('./', 'projects', projectName));
    allProjectDirPaths.forEach(buildMethods.regenProjectWithDirPath);
  },
  regenHomePage: () => {
    const homePage = path.join('./');
    buildMethods.regenProjectWithDirPath(homePage);
  }
};

module.exports = buildMethods;
