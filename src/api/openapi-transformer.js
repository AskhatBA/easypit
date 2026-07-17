/**
 * Препроцессор OpenAPI-схемы для orval.
 *
 * drf-spectacular описывает nullable-enum как
 *   oneOf: [SomeEnum, BlankEnum, NullEnum]
 * из-за чего orval плодит дубликаты имён схем и падает. Схлопываем такие
 * oneOf к одному $ref на основной enum + nullable — генерация становится
 * чистой, а тип остаётся `SomeEnum | null`.
 */
const isEnumRef = ref => /Enum'?$/.test(ref);
const isBlankOrNull = ref => /(Blank|Null)Enum'?$/.test(ref);

const collapseNullableEnum = node => {
  if (!Array.isArray(node.oneOf)) {
    return;
  }

  const refs = node.oneOf.filter(s => s && s.$ref);
  const allRefs = refs.length === node.oneOf.length && node.oneOf.length > 1;
  const mainRef = refs.find(s => isEnumRef(s.$ref) && !isBlankOrNull(s.$ref));
  const hasNull = refs.some(s => isBlankOrNull(s.$ref));

  if (allRefs && mainRef && hasNull) {
    delete node.oneOf;
    node.allOf = [{ $ref: mainRef.$ref }];
    node.nullable = true;
  }
};

const walk = node => {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }

  collapseNullableEnum(node);
  Object.values(node).forEach(walk);
};

module.exports = schema => {
  walk(schema.components && schema.components.schemas);
  walk(schema.paths);
  return schema;
};
