import { Tree, updateJson } from '@nrwl/devkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getMockFileResolutionPath } from '../../../../shared/utils';

export const removeMockFileResolutionPath = (
  tree: Tree,
  libraryFolder: string
): void => {
  const tsConfigPath = 'tsconfig.base.json';
  if (tree.exists(tsConfigPath)) {
    updateJson(tree, tsConfigPath, (json) => {
      if (!!json.compilerOptions && !!json.compilerOptions.paths) {
        delete json.compilerOptions.paths[
          getMockFileResolutionPath(tree, libraryFolder)
        ];
      }
      return json;
    });
  }
};
