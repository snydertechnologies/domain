import {
  names,
  Tree,
  generateFiles,
  readProjectConfiguration,
} from '@nrwl/devkit';
import {
  dasherize,
  classify,
  camelize,
} from '@nrwl/workspace/src/utils/strings';
import { join } from 'path';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  ElementType,
  getDomainPath,
  MountType,
} from '../../../../../shared/utils';
import { SetupComponentTestGeneratorSchema } from '../schema';

export const addTestFiles = (
  tree: Tree,
  options: SetupComponentTestGeneratorSchema
): void => {
  const {
    projectName,
    name,
    componentType,
    type,
    mountType,
    prefix,
    selector,
  } = options;
  const projectConfig = readProjectConfiguration(tree, projectName);
  const libraryPath = getDomainPath(tree, projectConfig.root);
  const libraryName = classify(getLibraryName(projectConfig.root));
  const directiveTag = camelize(selector);
  const directiveOptions = {
    directiveTag,
    selector: `[${directiveTag}]`,
    prefix,
    directiveName: classify(`${name}-${type}`),
    className: 'TestComponent',
  };
  let templateOptions = {
    ...names(name || componentType || type),
    selector,
    type,
    className: classify(`${libraryName}-${type}`),
    moduleName: classify(`${projectName}Module`),
    harnessName: classify(`${projectName}Harness`),
    storybookTitle: getStorybookTitle(libraryPath),
    isUsingComponentMountType: mountType === MountType.Component,
    isDirective: type === ElementType.Directive,
    tmpl: '',
    directiveName: '',
    directiveTag: '',
    prefix: '',
  };
  if (type === ElementType.Directive) {
    templateOptions = {
      ...templateOptions,
      ...directiveOptions,
    };
  }
  const target = `${projectConfig.sourceRoot}/lib`;
  generateFiles(tree, join(__dirname, './files'), target, templateOptions);
  if (mountType === MountType.Component) {
    tree.delete(join(target, `${dasherize(name)}.stories.ts`));
  }
  if (type === ElementType.Component) {
    tree.delete(join(target, `test.component.ts`));
  }
};

const getStorybookTitle = (libraryPath: string): string =>
  libraryPath
    .split('/')
    .map((folder) => classify(folder))
    .join('/');

const getLibraryName = (projectRoot: string): string => {
  const splitProjectRoot = projectRoot.split('/');
  return splitProjectRoot[splitProjectRoot.length - 1];
};
