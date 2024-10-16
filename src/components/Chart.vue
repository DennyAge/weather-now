<template>
  <div class="chart_container">
    <canvas :id="locationId"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { formatDate } from '@/helpers';

Chart.register( ...registerables );

export default {
  name: 'CustomChart',
  props: {
    hourlyData: {
      type: [ Array, Object ],
      required: true,
    },
    locationId: {
      type: String,
      required: true,
    },
    week: {
      type: Boolean,
      required: false,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    formatData() {
      if ( !this.week ) {
        return this.hourlyData;
      } else {
        return Object.values( this.hourlyData );
      }
    },
    renderChart() {
      const formattedData = this.formatData();
      const ctx = document.getElementById( `${ this.locationId }` ).getContext( '2d' );

      new Chart( ctx, {
        type: 'line',
        data: {
          labels: formattedData.map( data => data.hour ),
          datasets: [
            {
              label: '',
              data: formattedData.map( data => data.temp ),
              borderColor: '#625DF5',
              backgroundColor: 'transparent',
              fill: true,
              tension: 0.5,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          scales: {
            x: {
              ticks: {
                callback: ( value, index ) => {
                  const data = formattedData[index];
                  return this.week ? `${ formatDate( data.date ) }` : `${  data.hour  }:00`;
                },
              },
              title: {
                display: true,
                text: '',
              },
            },
            y: {
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: '',
              },
              ticks: {
                callback: function( value ) {
                  return `${ parseInt( value ) }°C`;
                },
              },
              beginAtZero: false,
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              padding: 10,
              backgroundColor: '#82B1FF',
              displayColors: false,
              callbacks: {
                title: ( context ) => {
                  if ( context.length > 0 ) {
                    const dataPoint = context[0];
                    let title = `${ parseInt( dataPoint.parsed.y ) }°C`;
                    return title;
                  }
                  return '';
                },
                label: ( context ) => {
                  const dataIndex = context.dataIndex;
                  if ( dataIndex !== undefined ) {
                    const data = formattedData[dataIndex];
                    return `${ data.weather }`;
                  }
                  return '';
                },
              },
            },
            legend: {
              display: false,
            },
          },
        },
      } );
    },
  },
};
</script>

<style scoped>
.chart_container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
}
canvas {
  width: 100%;
  height: 100%;
  min-width: 330px!important;
  min-height: 230px!important;
}

</style>

