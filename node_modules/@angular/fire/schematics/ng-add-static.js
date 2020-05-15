"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ng_add_common_1 = require("./ng-add-common");
const versions_json_1 = require("./versions.json");
function emptyFirebaseJson() {
    return {
        hosting: []
    };
}
function generateHostingConfig(project, dist) {
    return {
        target: project,
        public: dist,
        ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
        rewrites: [
            {
                source: '**',
                destination: '/index.html'
            }
        ]
    };
}
function generateFirebaseJson(tree, path, project, dist) {
    const firebaseJson = tree.exists(path)
        ? ng_add_common_1.safeReadJSON(path, tree)
        : emptyFirebaseJson();
    const newConfig = generateHostingConfig(project, dist);
    if (firebaseJson.hosting === undefined) {
        firebaseJson.hosting = newConfig;
    }
    else if (Array.isArray(firebaseJson.hosting)) {
        firebaseJson.hosting.push(newConfig);
    }
    else {
        firebaseJson.hosting = [firebaseJson.hosting, newConfig];
    }
    ng_add_common_1.overwriteIfExists(tree, path, ng_add_common_1.stringifyFormatted(firebaseJson));
}
exports.generateFirebaseJson = generateFirebaseJson;
exports.addFirebaseHostingDependencies = (tree) => {
    ng_add_common_1.addDependencies(tree, versions_json_1.default);
};
exports.setupStaticDeployment = (config) => {
    const { tree, workspacePath, workspace, options } = config;
    const project = workspace.projects[options.project];
    if (!project.architect ||
        !project.architect.build ||
        !project.architect.build.options ||
        !project.architect.build.options.outputPath) {
        throw new schematics_1.SchematicsException(`Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`);
    }
    const outputPath = project.architect.build.options.outputPath;
    project.architect.deploy = {
        builder: '@angular/fire:deploy',
        options: {}
    };
    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    generateFirebaseJson(tree, 'firebase.json', options.project, outputPath);
    ng_add_common_1.generateFirebaseRc(tree, '.firebaserc', options.firebaseProject, options.project);
    return tree;
};
