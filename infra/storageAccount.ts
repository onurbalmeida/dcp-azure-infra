import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'

export function createStorageAccount(stack: string, resourceGroup: azure.core.ResourceGroup, defaultTags: {[key: string]: string}) {
    // Create an Azure Storage Account
    const storageAccount = new azure.storage.Account('storage-account', {
        tags: defaultTags,
        name: pulumi.interpolate`dcp${stack}sa`,
        resourceGroupName: resourceGroup.name,
        location: resourceGroup.location,
        accountKind: 'StorageV2',
        accountTier: 'Standard',
        accountReplicationType: 'LRS',
        allowBlobPublicAccess: true
    });

    // Assets frontend
    const assetContainer = new azure.storage.Container('assets-container', {
        name: 'hip-dcp-assets',
        storageAccountName: storageAccount.name,
        containerAccessType: 'blob',
    });

    // Assets Dropbox
    const dropboxContainer = new azure.storage.Container('dropbox-container', {
        name: 'hip-int-dropbox',
        storageAccountName: storageAccount.name,
        containerAccessType: 'blob',
    });
}