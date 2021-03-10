import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'
import * as azuread from '@pulumi/azuread'

export function createAKS(
    stack: string, 
    resourceGroup: azure.core.ResourceGroup, 
    defaultTags: {[key: string]: string},
    spName: string,
    spPasswordName: string,
    spPassword: string,
    containerRegistry: azure.containerservice.Registry) {

    // Create the AD APP service principal for the AKS
    const adApp = new azuread.Application("dcpApplication", {
        displayName: pulumi.interpolate`dcp${stack}Application`
    });

    //Create the AD service principal
    const adSp = new azuread.ServicePrincipal(spName, {applicationId: adApp.applicationId});
    const adSpPassword = new azuread.ServicePrincipalPassword(spPasswordName, {
        servicePrincipalId: adSp.id,
        value: spPassword,
        endDate: "2099-01-01T00:00:00Z",
    });

    const acrRoleAssignment = new azure.authorization.Assignment('acrRoleAssignment', {
        principalId: adSp.id,
        roleDefinitionName: 'AcrPull',
        scope: containerRegistry.id
    });

    // Create an Azure AKS
    const cluster = new azure.containerservice.KubernetesCluster(`aks-cluster`, {
        name: pulumi.interpolate`dcp${stack}aks`,
        resourceGroupName: resourceGroup.name,
        servicePrincipal: {
            clientId: adApp.applicationId,
            clientSecret: adSpPassword.value,
        },
        location: resourceGroup.location,
        defaultNodePool: {
            name: "aksagentpool",
            nodeCount: 2,
            vmSize: "Standard_D2_v2",
        },
        networkProfile: 
        {
            networkPlugin: "azure",
            serviceCidr: "10.10.0.0/16",
            dnsServiceIp: "10.10.0.100",
            dockerBridgeCidr: "172.17.0.1/16"
        },
        dnsPrefix: `${pulumi.getStack()}-kube`,
        tags: defaultTags
    });
}