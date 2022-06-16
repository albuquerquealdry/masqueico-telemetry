const {BatchSpanProcessor} = require('@opentelemetry/tracing')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node')
const { OTTracePropagator } = require('@opentelemetry/propagator-ot-trace')
  const hostName = process.env.OTEL_TRACE_HOST || 'localhost'
  
  const options = {
    tags: [],
    endpoint: `http://${hostName}:14268/api/traces`,
  }
  
  const init = (serviceName) => {  
    const exporter = new JaegerExporter(options)
  
    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName
      }),
    })
    provider.addSpanProcessor(new BatchSpanProcessor(exporter))
    provider.register({ propagator: new OTTracePropagator() })
  
    console.log(`⭐ START JEAGER TRACING ⭐ || MASQUEICO TELEMETRY FOR ALDRY ALBUQUERQUE`)
  
    registerInstrumentations({
      instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
    })
    const tracer = provider.getTracer(serviceName)
    return { tracer }
  }
  
  module.exports = {
    init: init,
  }
