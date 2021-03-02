import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { getExternalSchematic } from '../../../utils/testing';
import { AddLibrariesNormalizedSchema } from '../../add-libraries/model/normalized-schema.model';
import { CreateNormalizedSchema } from '../../create/model/normalized-schema.model';
import { Linter } from '@nrwl/workspace';
import { NxLibraryParamters } from '../model/nx-library-parameters.model';
import { getNpmScope } from '../../../utils/nx-json';

export const addLibrariesRules = (
  tree: Tree,
  schema: AddLibrariesNormalizedSchema | CreateNormalizedSchema
): Rule[] =>
  schema.libraryDefinitions.map((definition) => {
    const parameters: NxLibraryParamters = {
      name: definition.projectName,
      directory: definition.directory,
      tags: definition.tags.join(','),
      linter: Linter.EsLint,
      style: schema.style,
      prefix: schema.prefix,
      buildable: schema.buildable,
      strict: schema.strict,
      enableIvy: schema.enableIvy,
      publishable: schema.publishable,
    };
    if (schema.routing !== undefined) {
      parameters.routing = schema.routing;
      parameters.lazy = schema.routing;
    }
    if (parameters.publishable) {
      parameters.importPath = `@${getNpmScope(tree)}/${schema.application}/${
        schema.domain
      }/${definition.type}`;
    }

    return getExternalSchematic('@nrwl/angular', 'lib', parameters);
  });
