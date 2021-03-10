import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createEventHubs(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}) {

    // Create an Azure Event Hub Namespace - Integration
    const integrationEventHubNamespace = new azure.eventhub.EventHubNamespace("integrationEventHubNamespace", {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp-integration-${stack}-eh`,
        sku: "Standard",
        capacity: 1,
        tags: defaultTags
    });

    // Create an Azure Event Hub - Integration Price
    const priceIntegrationEventHub = new azure.eventhub.EventHub("priceIntegrationEventHub", {
        namespaceName: integrationEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "price.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Integration Product
    const productIntegrationEventHub = new azure.eventhub.EventHub("productIntegrationEventHub", {
        namespaceName: integrationEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "product.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Integration Stock
    const stockIntegrationEventHub = new azure.eventhub.EventHub("stockIntegrationEventHub", {
        namespaceName: integrationEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "stock.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub Namespace - Inbox
    const inboxEventHubNamespace = new azure.eventhub.EventHubNamespace("inboxEventHubNamespace", {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp-inbox-${stack}-eh`,
        sku: "Standard",
        capacity: 1,
        tags: defaultTags
    });

    // Create an Azure Event Hub - Inbox Price
    const priceInboxEventHub = new azure.eventhub.EventHub("priceInboxEventHub", {
        namespaceName: inboxEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "price.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Inbox Product
    const productInboxEventHub = new azure.eventhub.EventHub("productInboxEventHub", {
        namespaceName: inboxEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "product.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Inbox Stock
    const stockInboxEventHub = new azure.eventhub.EventHub("stockInboxEventHub", {
        namespaceName: inboxEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "stock.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Inbox File
    const fileInboxEventHub = new azure.eventhub.EventHub("fileInboxEventHub", {
        namespaceName: inboxEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "file.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub Namespace - Update
    const updateEventHubNamespace = new azure.eventhub.EventHubNamespace("updateEventHubNamespace", {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp-update-${stack}-eh`,
        sku: "Standard",
        capacity: 1,
        tags: defaultTags
    });

    // Create an Azure Event Hub - Update Price
    const priceUpdateEventHub = new azure.eventhub.EventHub("priceUpdateEventHub", {
        namespaceName: updateEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "price.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Update Product
    const productUpdateEventHub = new azure.eventhub.EventHub("productUpdateEventHub", {
        namespaceName: updateEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "product.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Update Stock
    const stockUpdateEventHub = new azure.eventhub.EventHub("stockUpdateEventHub", {
        namespaceName: updateEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "stock.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub Namespace - Tasks
    const tasksEventHubNamespace = new azure.eventhub.EventHubNamespace("tasksEventHubNamespace", {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp-tasks-${stack}-eh`,
        sku: "Standard",
        capacity: 1,
        tags: defaultTags
    });

    // Create an Azure Event Hub - Force Updator Tasks
    const forceUpdatorTasksEventHub = new azure.eventhub.EventHub("forceUpdatorTasksEventHub", {
        namespaceName: updateEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "force.updator.v1",
        partitionCount: 32,
        messageRetention: 7,
    });

    // Create an Azure Event Hub - Export Tasks
    const exportTasksEventHub = new azure.eventhub.EventHub("exportTasksEventHub", {
        namespaceName: updateEventHubNamespace.name,
        resourceGroupName: resourceGroup.name,
        name: "export.v1",
        partitionCount: 32,
        messageRetention: 7,
    });
}