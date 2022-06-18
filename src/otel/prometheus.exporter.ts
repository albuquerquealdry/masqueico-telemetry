const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { MeterProvider }  = require('@opentelemetry/sdk-metrics-base');

// Add your port and startServer to the Prometheus options
const optionss = {port: 9464, startServer: true};
const exporter = new PrometheusExporter(optionss);

// Register the exporter
const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter('example-prometheus');

// Now, start recording data
const counter = meter.createCounter('metric_name', {
  description: 'Example of a counter'
});
counter.add(10, { pid: process.pid });