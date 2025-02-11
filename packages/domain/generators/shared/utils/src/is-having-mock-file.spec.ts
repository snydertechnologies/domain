import * as devKitMock from '@nrwl/devkit';
import * as getMockFileResolutionPathMock from './get-mock-file-resolution-path';
import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { isHavingMockFile } from './is-having-mock-file';

describe('isHavingMockFile', () => {
  let tree: Tree;
  const mockFileResolutionPath = 'test';

  beforeEach(() => {
    jest.clearAllMocks();
    tree = createTreeWithEmptyWorkspace();
    jest.spyOn(devKitMock, 'readJson').mockReturnValue({
      compilerOptions: {
        paths: { [mockFileResolutionPath]: {} },
      },
    });
    jest
      .spyOn(getMockFileResolutionPathMock, 'getMockFileResolutionPath')
      .mockReturnValue(mockFileResolutionPath);
  });
  it('should return true when mock file resolution path is in the tsconfig', () => {
    expect(
      isHavingMockFile(tree, 'test-app/test-domain/feature-test-example')
    ).toBe(true);
  });
});
