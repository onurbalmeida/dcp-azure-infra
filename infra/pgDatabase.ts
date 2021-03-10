import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createPgDatabase(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}, pgPassword: string) {
    // Create an Azure Database for PostgreSQL server
    const postgreSQL = new azure.postgresql.Server("postgresql", {
        location: resourceGroup.location,
        resourceGroupName: resourceGroup.name,
        name: pulumi.interpolate`dcp${stack}pgsql`,
        skuName: "GP_Gen5_8",
        storageMb: 5120,
        backupRetentionDays: 7,
        geoRedundantBackupEnabled: false,
        autoGrowEnabled: true,
        administratorLogin: "hip",
        administratorLoginPassword: pgPassword,
        version: "11",
        sslEnforcementEnabled: true,
        tags: defaultTags
    });
}