import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createContainerRegistry(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}) {
    // Create Azure Container Registry
    const registry = new azure.containerservice.Registry('acr', {
        tags: defaultTags,
        name: pulumi.interpolate`dcp${stack}acr`,
        resourceGroupName: resourceGroup.name,
        location: resourceGroup.location,
        sku: 'Basic',
        adminEnabled: true
    });

    return registry;
}