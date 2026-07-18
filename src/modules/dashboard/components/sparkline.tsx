import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type SparklineProps = {
  data: number[];
  width: number;
  height: number;
  color: string;
  fill?: boolean;
  strokeWidth?: number;
};

const buildPath = (data: number[], width: number, height: number) => {
  if (data.length < 2) {
    return { line: '', area: '' };
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = 2;
  const usableH = height - pad * 2;

  const points = data.map((value, index) => {
    const x = index * stepX;
    const y = pad + usableH - ((value - min) / span) * usableH;
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');

  const area = `${line} L${width} ${height} L0 ${height} Z`;

  return { line, area };
};

export const Sparkline = ({
  data,
  width,
  height,
  color,
  fill = false,
  strokeWidth = 2,
}: SparklineProps) => {
  const { line, area } = buildPath(data, width, height);

  return (
    <Svg width={width} height={height}>
      {fill ? (
        <>
          <Defs>
            <LinearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity={0.35} />
              <Stop offset="1" stopColor={color} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={area} fill="url(#sparkFill)" />
        </>
      ) : null}

      <Path
        d={line}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};
