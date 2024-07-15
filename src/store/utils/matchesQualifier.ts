function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isPattern(name: string): boolean {
  return name.indexOf('*') !== -1;
}

function normalizeName(name: string, loader: string): string {
  if (loader === 'template:') {
    name = name.replace(/\\/, '/');
    if (name.endsWith('.twig')) {
      name = name.substring(0, name.length - 5);
    }
  }

  return name;
}

function parseQualifier(qualifier: string) {
  const divider = qualifier.indexOf(':');
  let name =
    divider === -1 ? qualifier.trim() : qualifier.substring(divider + 1).trim();

  // TODO: Add support for local schemas

  let loader: string;
  if (divider === -1) {
    loader = 'template:';
  } else {
    loader = qualifier.substring(0, divider + 1);
  }

  name = normalizeName(name, loader);
  return {
    loader: loader,
    name: name,
    uri: `${loader}${name}`,
  };
}

function toPattern(name: string): RegExp {
  const pattern = name.split('*').map(escapeRegExp).join('[A-Za-z0-9-_]+');

  return new RegExp(`/^${pattern}$/`);
}

export function matchesQualifier(
  qualifier: string,
  specs: string | Array<string>
): boolean {
  const qualifierInfo = parseQualifier(qualifier);

  for (const spec of Array.isArray(specs) ? specs : specs.split(',')) {
    const schemaInfo = parseQualifier(spec);

    if (qualifierInfo.uri == schemaInfo.uri) {
      return true;
    } else if (
      schemaInfo.loader == qualifierInfo.loader &&
      isPattern(schemaInfo.name) &&
      toPattern(schemaInfo.name).test(qualifierInfo.name)
    ) {
      return true;
    }
  }

  return false;
}
