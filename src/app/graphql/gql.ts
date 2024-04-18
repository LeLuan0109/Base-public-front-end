export interface GqlTag {
  operationName: string;
  query: string
}

declare function typedGQLTag(literals: ReadonlyArray<string> | Readonly<string>, ...placeholders: any[]) : GqlTag;

export const gql: typeof typedGQLTag = (literals, placeholders) => {
  if(!literals || literals.length < 1) {
    return {operationName: '', query: ''};
  }
  const query = literals[0].substring(literals[0].indexOf("{"));
  if(query.indexOf("(") > -1) {
    return {operationName: query.substring(1,query.indexOf("(")).replace(/[ \n\t]+/gm,''), query: literals[0]};
  }
  let index = 0;
  if(literals[0].includes('query')){
    index = literals[0].indexOf('query') + 6;
  } else {
    index = literals[0].indexOf('mutation') + 9;
  }
  const operationName = literals[0].substring(index, literals[0].indexOf('{')).replace(/[ \n\t]+/gm, '');
  const queryName = query.substring(1, query.substring(1).indexOf('{')).replace(/[ \n\t]+/gm, '');
  if (operationName && queryName && operationName.toLocaleLowerCase() === queryName.toLocaleLowerCase()) {
    return { operationName: queryName, query: literals[0] };
  }
  return { operationName, query: literals[0] };
};
