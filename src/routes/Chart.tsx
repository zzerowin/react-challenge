import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
      fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => {
                  return [
                    Date.parse(price.time_close),
                    price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2),
                  ]
                }) as any,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: '#00a8ff'
                }
              }
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#e84118',
                  downward: '#0097e6'
                }
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;