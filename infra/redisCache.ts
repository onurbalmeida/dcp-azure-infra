import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createRedisCache(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}) {
    // Create an Azure Cache for Redis
    const redisCache = new azure.redis.Cache('redis-cache', {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp${stack}rediscache`,
        capacity: 2,
        family: "C",
        skuName: "Standard",
        enableNonSslPort: true,
        minimumTlsVersion: "1.2",
        redisConfiguration: {},
        tags: defaultTags
    });
}