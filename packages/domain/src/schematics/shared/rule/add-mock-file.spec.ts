import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { addMockFile } from './add-mock-file';
import * as treeUtils from '../../../utils/tree';

describe('create schematic', () => {
  let appTree: UnitTestTree;
  const application = 'test-application';
  const domain = 'test-domain';

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty()) as UnitTestTree;
    jest.spyOn(treeUtils, 'createInTree').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add index and mock file', async () => {
    addMockFile(application, domain)(appTree, undefined);
    expect(treeUtils.createInTree).toHaveBeenNthCalledWith(
      1,
      appTree,
      `libs/${application}/${domain}/util/src/testing.ts`,
      `export * from './lib/model/${domain}.mock';`
    );
    expect(treeUtils.createInTree).toHaveBeenNthCalledWith(
      2,
      appTree,
      `libs/${application}/${domain}/util/src/lib/model/${domain}.mock.ts`,
      'export const mock = {};'
    );
  });
});
