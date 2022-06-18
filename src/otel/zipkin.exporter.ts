const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { OTTracePropagator } = require('@opentelemetry/propagator-ot-trace')

const zipkinExporter = () => { 
  const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "MAQUEISCO-EXAMPLE"
    }),
  });
  console.log(`⭐ START ZIPKIN TRACING ⭐ || MASQUEICO 🐵 TELEMETRY`)
  const consoleExporter = new ConsoleSpanExporter();
  const spanProcessor = new SimpleSpanProcessor(consoleExporter);

  provider.register({ propagator: new OTTracePropagator() })


  /* ... */
  const zipkinExporter = new ZipkinExporter({
      url: 'http://onecatalogapp.com:30002/api/v2/spans',
      serviceName: 'your-application-name'
  });
  const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
  provider.addSpanProcessor(zipkinProcessor)
}

module.exports = {
  zipkinExporter: zipkinExporter,
}
