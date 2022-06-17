const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const { BatchSpanProcessor } = require("@opentelemetry/tracing");
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)
provider.register()

const init2 = (serviceName) => {  
    const options = {
        headers: {
          'my-header': 'header-value',
        },
        name: "issac do vine",
        url: 'https://onecatalogapp.com:30002/api/v2/spans',
        // optional interceptor
        getExportRequestHeaders: () => {
          return {
            'my-header': 'header-value',
          }
        }
      }
      console.log(`⭐ START ZIPKIN TRACING ⭐ || MASQUEICO 🐵 TELEMETRY`)
      const exporter = new ZipkinExporter(options);
      provider.addSpanProcessor(new BatchSpanProcessor(exporter));
} 
module.exports = {
    init2: init2,
  }