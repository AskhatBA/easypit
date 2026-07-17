import React from 'react';

/** В тестах .svg не проходит через metro-трансформер — рендерим заглушку. */
const SvgMock = (props: Record<string, unknown>) =>
  React.createElement('SvgMock', props);

export default SvgMock;
