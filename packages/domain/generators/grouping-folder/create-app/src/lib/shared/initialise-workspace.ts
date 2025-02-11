import { Tree } from '@nrwl/devkit';
import { initialiseAngularWorkspace } from '../angular/initialise-angular-workspace';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationType } from '../../../../../shared/utils';
import { addEslintLayerConstraints } from './add-eslint-layer-constraints';

export const initialiseWorkspace = async (
  tree: Tree,
  applicationTye: ApplicationType
): Promise<void> => {
  addEslintLayerConstraints(tree);
  if (applicationTye === ApplicationType.Angular) {
    await initialiseAngularWorkspace(tree);
  }
};
