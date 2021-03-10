import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createServiceSearch(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}) {
    // Create an Azure Service Search
    const serviceSearch = new azure.search.Service("service-search", {
        location: resourceGroup.location,
        partitionCount: 1,
        replicaCount: 3,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp${stack}search`,
        sku: "standard",
        tags: defaultTags
    });
}