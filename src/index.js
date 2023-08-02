import { CoreConfiguration } from './core/config/CoreConfiguration.js'
import { InboundConfiguration } from './inbound/config/InboundConfiguration.js'

const { server, eventManager } = new CoreConfiguration()
new InboundConfiguration(eventManager);


server.listen(3000, () => {
    console.log('Server started')
})
