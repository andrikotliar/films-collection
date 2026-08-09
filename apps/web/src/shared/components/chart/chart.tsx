import { defineCssProperties } from '~/shared/helpers';
import styles from './chart.module.css';
import { colors, type Colors } from '~/shared/configs/css-colors';

type ChartData = {
  title: string;
  value: number;
};

type ChartProps = {
  xAxisMaxValue: number;
  xAxisStep: number;
  data: ChartData[];
  bgColor?: Colors;
  textColor?: Colors;
  label?: string;
};

const getValuePercentage = (total: number, value: number) => {
  return (100 * value) / total;
};

export const Chart = ({
  data,
  xAxisMaxValue,
  xAxisStep,
  bgColor = 'colorBlueLight',
  textColor = 'colorBlack',
  label,
}: ChartProps) => {
  const axisValuesCount = Math.round(xAxisMaxValue / xAxisStep);

  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div
        className={styles.container}
        style={defineCssProperties({
          '--chart-line-color': colors[bgColor],
          '--chart-text-color': colors[textColor],
        })}
      >
        <div className={styles.cells}>
          {Array.from({ length: axisValuesCount }, (_, index) => (
            <div className={styles.cell} key={index}>
              {index > 0 && <div className={styles.axis_value}>{index * xAxisStep}</div>}
            </div>
          ))}
        </div>
        {data.map((row) => (
          <div className={styles.row} key={row.title}>
            <div className={styles.data_line}>
              <div
                className={styles.data_line_main}
                style={defineCssProperties({
                  '--chart-data-value': `${getValuePercentage(xAxisMaxValue, row.value)}%`,
                })}
              >
                {row.title}
              </div>
              <div className={styles.data_line_value}>{row.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
