"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ng_add_common_1 = require("./ng-add-common");
const versions_json_1 = require("./versions.json");
const path_1 = require("path");
exports.isUniversalApp = (project) => project.architect && project.architect.server;
function emptyFirebaseJson(source) {
    return {
        hosting: [],
        functions: {
            source
        }
    };
}
function generateHostingConfig(project, dist) {
    return {
        target: project,
        public: path_1.join(path_1.dirname(dist), dist),
        ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
        rewrites: [
            {
                source: '**',
                function: 'ssr'
            }
        ]
    };
}
function generateFunctionsConfig(dist) {
    return {
        source: path_1.dirname(dist)
    };
}
function generateFirebaseJson(tree, path, project, dist, serverOutput) {
    const firebaseJson = tree.exists(path)
        ? ng_add_common_1.safeReadJSON(path, tree)
        : emptyFirebaseJson(path_1.dirname(serverOutput));
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
    firebaseJson.functions = generateFunctionsConfig(dist);
    ng_add_common_1.overwriteIfExists(tree, path, ng_add_common_1.stringifyFormatted(firebaseJson));
}
exports.generateFirebaseJson = generateFirebaseJson;
exports.addFirebaseFunctionsDependencies = (tree) => {
    ng_add_common_1.addDependencies(tree, Object.assign(Object.assign({}, versions_json_1.default), versions_json_1.firebaseFunctions));
};
exports.setupUniversalDeployment = (config) => {
    const { tree, workspacePath, workspace, options } = config;
    const project = workspace.projects[options.project];
    if (!project.architect ||
        !project.architect.build ||
        !project.architect.build.options ||
        !project.architect.build.options.outputPath) {
        throw new schematics_1.SchematicsException(`Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`);
    }
    if (!project.architect ||
        !project.architect.server ||
        !project.architect.server.options ||
        !project.architect.server.options.outputPath) {
        throw new schematics_1.SchematicsException(`Cannot read the output path (architect.server.options.outputPath) of the Angular project "${options.project}" in angular.json`);
    }
    const staticOutput = project.architect.build.options.outputPath;
    const serverOutput = project.architect.server.options.outputPath;
    const externalDependencies = project.architect.server.options.externalDependencies || [];
    externalDependencies.push('@firebase/firestore');
    project.architect.server.options.externalDependencies = externalDependencies;
    project.architect.deploy = {
        builder: '@angular/fire:deploy',
        options: {
            ssr: true
        }
    };
    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    generateFirebaseJson(tree, 'firebase.json', options.project, staticOutput, serverOutput);
    ng_add_common_1.generateFirebaseRc(tree, '.firebaserc', options.firebaseProject, options.project);
    return tree;
};
